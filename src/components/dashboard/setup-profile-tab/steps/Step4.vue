<template>
  <form class="register-form step4">
    <h1 class="text-center">Get paid by LEON</h1>
    <h5 class="text-center">This will allow LEON to pay you directly for any services or memberships purchased through the platform.</h5>
    <div class="row">
      <div class="col-md-12">
        <fieldset>
          <div
            class="form-group with-icon-right"
            :class="{'has-error': errors.has('address1'), 'valid': isFormFieldValid('address1')}"
          >
            <div class="input-group">
              <input
                name="address1"
                data-vv-as="Address1"
                v-model="address1"
                v-validate="'required'"
                required
              >
              <i class="fa fa-check valid-icon icon-right input-icon"></i>
              <label class="control-label">Address1</label>
              <i class="bar"></i>
              <small
                v-show="errors.has('address1')"
                class="help text-danger"
              >{{ errors.first('address1') }}</small>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <fieldset>
          <div
            class="form-group with-icon-right"
            :class="{'has-error': errors.has('address2'), 'valid': isFormFieldValid('address2')}"
          >
            <div class="input-group">
              <input
                name="address2"
                data-vv-as="Address2"
                v-model="address2"
                required
              >
              <i class="fa fa-check valid-icon icon-right input-icon"></i>
              <label class="control-label">Address2</label>
              <i class="bar"></i>
              <small
                v-show="errors.has('address2')"
                class="help text-danger"
              >{{ errors.first('address2') }}</small>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <fieldset>
          <div
            class="form-group with-icon-right"
            :class="{'has-error': errors.has('city'), 'valid': isFormFieldValid('city')}"
          >
            <div class="input-group">
              <input
                name="city"
                data-vv-as="City"
                v-model="city"
                v-validate="'required'"
                required
              >
              <i class="fa fa-check valid-icon icon-right input-icon"></i>
              <label class="control-label">City</label>
              <i class="bar"></i>
              <small
                v-show="errors.has('city')"
                class="help text-danger"
              >{{ errors.first('city') }}</small>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <fieldset>
          <div
            class="form-group with-icon-right"
            :class="{'has-error': errors.has('state'), 'valid': isFormFieldValid('state')}"
          >
            <div class="input-group">
              <input
                name="state"
                data-vv-as="State"
                v-model="state"
                v-validate="'required'"
                required
              >
              <i class="fa fa-check valid-icon icon-right input-icon"></i>
              <label class="control-label">State</label>
              <i class="bar"></i>
              <small
                v-show="errors.has('state')"
                class="help text-danger"
              >{{ errors.first('state') }}</small>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <fieldset>
          <div
            class="form-group with-icon-right pb-3"
            :class="{'has-error': errors.has('zipcode'), 'valid': isFormFieldValid('zipcode')}"
          >
            <div class="input-group">
              <input
                name="zipcode"
                data-vv-as="Zip Code"
                v-model="zipcode"
                v-validate="'required'"
                required
              >
              <i class="fa fa-check valid-icon icon-right input-icon"></i>
              <label class="control-label">Zip code</label>
              <i class="bar"></i>
              <small
                v-show="errors.has('zipcode')"
                class="help text-danger pb-2"
              >{{ errors.first('zipcode') }}</small>
            </div>
          </div>
          <div class="wizard-body-actions">
            <div class="btn-container ladda-div">
              <vue-ladda
                :loading="nextBtn.loading"
                :key="nextBtn.dataStyle"
                :data-style="nextBtn.dataStyle"
                class="btn btn-primary wizard-next pull-right"
                v-if="!isDashboard"
                @click.prevent="save()"
              >Save</vue-ladda>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  </form>
</template>

<script>
import stripeAsPromised from 'stripe-as-promised'
import VueLadda from 'vue-ladda'
import Proxy from '@/proxies/Proxy'

export default {
  name: 'step4',
  components: {
    VueLadda
  },
  data () {
    return {
      address1: '',
      address2: '',
      city: '',
      state: '',
      zipcode: '',
      nextBtn: {
        loading: false,
        dataStyle: 'zoom-in',
        progress: 0
      },
      isDashboard: false,
      formData: {},
      provider: ''
    }
  },
  created () {
    this.isDashboard = this.$route.path.includes('dashboard')
    this.formData = this.getFormData
    this.provider = this.getProvider
  },
  computed: {
    getFormData () {
      if (Object.keys(this.$store.getters).includes('auth/getFormData')) {
        return this.$store.getters['auth/getFormData']
      } else {
        return null
      }
    },
    getProvider () {
      if (Object.keys(this.$store.getters).includes('auth/provider')) {
        return this.$store.getters['auth/provider']
      } else {
        return null
      }
    }
  },
  methods: {
    isFormFieldValid (field) {
      let isValid = false
      if (this.formFields[field]) {
        isValid =
          this.formFields[field].validated && this.formFields[field].valid
      }
      return isValid
    },
    validateFormField (fieldName) {
      this.$validator.validate(fieldName, this[fieldName])
    },
    async completedData () {
      window.Stripe.setPublishableKey('pk_test_UOMszFwb1QUTEO7ZLY2t6GXZ')
      const stripe = stripeAsPromised(window.Stripe, Promise)
      try {
        const { id } = await stripe.card.createToken(this.$data)
        return {
          stripePaymentToken: id,
        }
      } catch ({ type, message }) {
        this.$store.dispatch('auth/notification', {
          type: 'ERROR',
          title: 'CARD ERROR',
          message
        })
        return {
          stripePaymentToken: null,
        }
      }
    },
    async save () {
      let that = this
      Object.keys(that.formFields).map(field => {
        that.validateFormField(field)
      })
      // validation check
      const validOk = Object.keys(that.formFields).every(field => {
        return that.isFormFieldValid(field)
      })

      if (validOk) {
        const data = that.$data
        const {mindbodyActivationLink, siteId, ...providerData} = this.provider
        const {success, error} = await new Proxy('savePayment.php?').submit('post', {data, providerData})

        if (success) {
          this.$store.dispatch('auth/notification', {
            type: 'SUCCESS',
            title: 'SUCCESS!',
            message: 'SUCCESS'})
          this.$store.commit('auth/COMPLETE_SETUP_PROFILE')
          return true
        } else {
          this.showToast()
          console.log(error)
          return false
        }
      }

      return false
    },
    showToast (errMessage = 'Oops, Please try again later.') {
      this.$store.dispatch('auth/notification', {
        type: 'ERROR',
        title: 'SERVER ERROR',
        message: errMessage
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.register-form.step4 {
  h1 {
  font-size: 3.5rem;
  margin-top: 40px;
  @media only screen and (max-width: 768px) {
    font-size: 2rem;
  }
  }
  h5 {
    margin-bottom: 100px;
  }
  padding-left: 20%;
  padding-right: 20%;
  @include media-breakpoint-down(sm) {
    padding-left: 2%;
    padding-right: 2%;
  }
  .ladda-div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .ladda-button {
    border-radius: 25px;
    width: 150px;
  }
}
</style>
