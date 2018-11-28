<template>
  <div class="form-wizard-page">
    <div class="row">
      <div class="col-md-12">
        <vuestic-wizard ref="wizard" :steps="hsSteps">
          <div slot="page1" class="form-wizard-tab-content">
            <Step1 ref="registerStepOne"></Step1>
          </div>
          <div slot="page2" class="form-wizard-tab-content">
            <Step2 ref="registerStepTwo"></Step2>
          </div>
          <div slot="page3" class="form-wizard-tab-content">
            <Step3 ref="registerStepThree"></Step3>
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
import { mapGetters } from 'vuex'

export default {
  name: 'signup',
  components: {
    Step1,
    Step2,
    Step3
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
          isValid: () => {
            // validation check
            const that = this.$refs.registerStepOne
            const validOk = Object.keys(that.formFields).every(field => {
              return that.isFormFieldValid(field)
            })

            // integration step's data
            validOk && this.mergePartialModels(that.completedData())
            return validOk
          }
        },
        {
          label: 'Employee Stipend',
          slot: 'page2',
          isValid: () => {
            // integration step's data
            const that = this.$refs.registerStepTwo
            this.mergePartialModels(that.completedData())
            return true
          }
        },
        {
          label: 'Credit Card',
          slot: 'page3',
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
                wizard.signupBtn.loading = true
                const stripeToken = await that.completedData()
                const { stripePaymentToken } = stripeToken
                if (stripePaymentToken) {
                  this.mergePartialModels(stripeToken)
                  await this.$store.dispatch('auth/register', this.finalModel)
                  this.finalModel = []
                }
                wizard.signupBtn.loading = false
              } catch (err) {
                this.$store.dispatch('auth/notification', {
                  type: 'ERROR',
                  title: 'SERVER ERROR',
                  message: 'Oops, Please try again later.'
                })
                wizard.signupBtn.loading = false
              }
            }
            return false
          }
        }
      ]
    },
    ...mapGetters({
      notification: 'auth/notificationInfo'
    })
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
      finalModel: []
    }
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

.form-wizard-page {
  width: 100%;
  .form-group {
    min-width: 200px;
    width: 100%;
  }
}

.form-wizard-tab-content-text {
  width: 100%; // IE11 only
}

.register-step3-form {
  width: 100%;
  padding-top: 10.7%;
  padding-bottom: 11%;
}

</style>
