<template>
  <div class="form-wizard-page">
    <div class="row">
      <div class="col-md-12">
        <vuestic-wizard
          ref="wizard"
          wizard-layout="vertical"
          wizard-type="rich"
          :steps="hsSteps"
        >
          <div slot="page1" class="form-wizard-tab-content">
            <Step1 ref="registerStepOne"></Step1>
          </div>
          <div slot="page2" class="form-wizard-tab-content">
            <Step2 ref="registerStepTwo"></Step2>
          </div>
          <div slot="page3" class="form-wizard-tab-content">
            <Step3 ref="registerStepThree"></Step3>
          </div>
          <div slot="page4" class="form-wizard-tab-content">
            <Step4 ref="registerStepFour"></Step4>
          </div>
          <div slot="page5" class="form-wizard-tab-content">
            <Step5 ref="registerStepFive"></Step5>
          </div>
        </vuestic-wizard>
      </div>
    </div>
  </div>
</template>

<script>
import Step1 from './steps/Step1'
import Step2 from './steps/Step2'
import Step3 from './steps/Step3'
import Step4 from './steps/Step4'
import Step5 from './steps/Step5'
import { mapGetters } from 'vuex'
import Proxy from '@/proxies/Proxy'

export default {
  name: 'signup',
  components: {
    Step1,
    Step2,
    Step3,
    Step4,
    Step5
  },
  watch: {
    notification: function (newVal, oldVal) {
      if (newVal.title !== 'CARD ERROR') {
        this.$refs.wizard.resetWizard()
        let that = this.$refs.registerStepOne
        that.$data.companyName = ''
        that.$data.userEmailAddress = ''
        Object.keys(that.formFields).map(field => {
          that.validateFormField(field)
        })
      }
      this.$store.dispatch('auth/notificationClear')
    }
  },
  data () {
    return {
      nextBtn: null
    }
  },
  mounted () {
    this.nextBtn = this.$refs.wizard.nextBtn
  },
  computed: {
    hsSteps () {
      return [
        {
          label: 'Personal Details',
          slot: 'page1',
          onNext: () => {
            // manual validation occur
            const that = this.$refs.registerStepOne
            Object.keys(that.formFields).map(field => {
              that.validateFormField(field)
            })
          },
          isValid: async () => {
            // validation check
            const that = this.$refs.registerStepOne
            const validOk = Object.keys(that.formFields).every(field => {
              return that.isFormFieldValid(field)
            })

            // integration step's data
            if (validOk) {
              this.nextBtn.loading = true
              const { passwordConfirm, ...info } = that.$data
              const res = await new Proxy('createAccount.php?', info).submit('post')
              if (res.success) {
                this.$store.commit('auth/SET_FORMDATA', {'key': 'provider', 'value': res.provider})
                this.nextBtn.loading = false
                return true
              } else {
                this.nextBtn.loading = false
                return false
              }
            } else {
              return false
            }
          }
        },
        {
          label: 'Activate MINDBODY',
          slot: 'page2',
          isValid: async () => {
            this.nextBtn.loading = true
            // validation check
            const {success} = await new Proxy('checkSiteActivation.php?', this.$route.params).submit('post')
            if (success) {
              const {providerAccessToken, providerId} = this.formData.provider
              const locations = await new Proxy('getLocations.php?', {
                providerId,
                providerAccessToken
              }).submit('post')
              this.$store.commit('auth/SET_FORMDATA', {'key': 'locations', 'value': locations})
              this.nextBtn.loading = false
              return true
            } else {
              this.$store.dispatch('auth/notification', {
                type: 'ERROR',
                title: 'Not found Account',
                message: 'Please try Activate Account again.'
              })
              this.nextBtn.loading = false
              return false
            }
          }
        },
        {
          label: 'MINDBODY location',
          slot: 'page3',
          isValid: async () => {
            this.nextBtn.loading = true
            const {success} = await new Proxy('saveLocations.php').submit('post')
            if (success === 'false') {
              this.$store.dispatch('auth/notification', {
                type: 'ERROR',
                title: 'Setting location error',
                message: 'Please try to set location again.'
              })
              this.nextBtn.loading = false
              return false
            } else {
              this.nextBtn.loading = false
              return true
            }
            // // validation check
            // const that = this.$refs.registerStepOne
            // const validOk = Object.keys(that.formFields).every(field => {
            //   return that.isFormFieldValid(field)
            // })

            // // integration step's data
            // validOk && this.mergePartialModels(that.completedData())
            // // return validOk
          }
        },
        {
          label: 'Employee Stipend',
          slot: 'page4',
          isValid: () => {
            // integration step's data
            const that = this.$refs.registerStepTwo
            this.mergePartialModels(that.completedData())
            return true
          }
        },
        {
          label: 'Credit Card',
          slot: 'page5',
          onNext: () => {
            // manual validation occur
            const that = this.$refs.registerStepOne
            Object.keys(that.formFields).map(field => {
              that.validateFormField(field)
            })
          },
          isValid: async () => {
            let that = this.$refs.registerStepThree
            Object.keys(that.formFields).map(field => {
              that.validateFormField(field)
            })
            // validation check
            const validOk = Object.keys(that.formFields).every(field => {
              return that.isFormFieldValid(field)
            })
            let wizard = this.$refs.wizard
            if (validOk) {
              try {
                wizard.nextBtn.loading = true
                const stripeToken = await that.completedData()
                const { stripePaymentToken } = stripeToken
                if (stripePaymentToken) {
                  this.mergePartialModels(stripeToken)
                  await this.$store.dispatch('auth/register', this.finalModel)
                  this.finalModel = []
                }
                wizard.nextBtn.loading = false
              } catch (err) {
                this.$store.dispatch('auth/notification', {
                  type: 'ERROR',
                  title: 'SERVER ERROR',
                  message: 'Oops, Please try again later.'
                })
                wizard.nextBtn.loading = false
              }
            }
            return false
          }
        }
      ]
    },
    ...mapGetters({
      notification: 'auth/notificationInfo',
      formData: 'auth/getFormData'
    })
  },
  methods: {
    mergePartialModels (model) {
      this.finalModel = Object.assign({}, this.finalModel, model)
    },
  }
}
</script>

<style lang="scss" scoped>
.widget.simple-vertical-wizard-widget {
  .widget-body {
    padding: 0 $widget-padding;
    @include media-breakpoint-down(sm) {
      padding: $widget-padding 0;
    }
  }
}

/deep/.form-wizard-page {
  margin-top: -5.625rem;
  width: 80%;
  .form-group {
    min-width: 200px;
    width: 100%;
  }
  @media screen and (max-width: 992px) {
    margin-top: 0;
  }
  .wizard {
    @media screen and (max-width: 769px) {
      .wizard-steps {
        height: 100%;
      }
    }
    @media screen and (min-width: 769px) {
      .wizard-steps {
        height: 500px;
      }
      .wizard-body {
        padding: 0;
        min-height: 500px;
      }
    }
  }
}

.form-wizard-tab-content-text {
  width: 100%; // IE11 only
}

/deep/.register-form {
  min-height: 500px;
  width: 100%;
}
</style>
