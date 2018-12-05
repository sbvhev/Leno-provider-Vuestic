<template>
  <div class="form-wizard-page mt-4">
    <div class="row">
      <div class="col-md-12">
        <vuestic-wizard
          ref="wizard"
          wizard-layout="horizontal"
          wizard-type="simple"
          :steps="hsSteps"
          class="setup-profile"
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
import { mapGetters } from 'vuex'
import Proxy from '@/proxies/Proxy'

export default {
  name: 'setup-profile',
  components: {
    Step1,
    Step2,
    Step3,
    Step4,
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
      nextBtn: null,
    }
  },
  mounted () {
    this.nextBtn = this.$refs.wizard.nextBtn
  },
  computed: {
    hsSteps () {
      return [
        {
          label: 'Activate MINDBODY',
          slot: 'page1',
          isValid: async () => {
            this.nextBtn.loading = true
            // validation check
            const {success} = await new Proxy('checkSiteActivation.php?', {siteId: this.provider.siteId}).submit('post')
            console.log('setUpprofile--->', success)
            if (success) {
              const {providerAccessToken, providerId} = this.provider
              const locations = await new Proxy('getLocations.php?', {
                providerId,
                providerAccessToken
              }).submit('post')
              this.$store.commit('auth/FORMDATA', {key: 'locations', 'value': locations})
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
          slot: 'page2',
          isValid: async () => {
            this.nextBtn.loading = true
            const {locations} = this.formData
            const {success} = await new Proxy('saveLocations.php?', {locations}).submit('post')
            if (success) {
              const {providerId} = this.provider
              const {pricings, success} = await new Proxy('getPricings.php?', {providerId}).submit('post')
              if (success) {
                console.log('hahah', pricings)
                this.$store.commit('auth/FORMDATA', {key: 'pricings', value: pricings})
              } else {
                this.errorNotification()
              }
              this.nextBtn.loading = false
              return true
            } else {
              this.errorNotification()
              this.nextBtn.loading = false
              return false
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
          label: 'Pricing',
          slot: 'page3'
        },
        {
          label: 'Payment',
          slot: 'page4',
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
                  this.$store.dispatch('auth/register', this.finalModel)
                  this.finalModel = []
                }
                wizard.nextBtn.loading = false
              } catch (err) {
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
      formData: 'auth/getFormData',
      provider: 'auth/provider'
    })
  },
  methods: {
    mergePartialModels (model) {
      this.finalModel = Object.assign({}, this.finalModel, model)
    },
    errorNotification (errMessage = null) {
      this.$store.dispatch('auth/notification', {
        type: 'ERROR',
        title: 'SERVER ERROR',
        message: 'Oops, Please try again later.'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.wizard.horizontal.setup-profile {
  .wizard-body {
    padding: 2.25rem 5%;
    @include media-breakpoint-down(sm) {
      padding: $widget-padding 5%;
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