<template>
  <form class="register-form step4">
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
                v-validate="'required'"
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
            class="form-group with-icon-right"
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
                class="help text-danger"
              >{{ errors.first('zipcode') }}</small>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  </form>
</template>

<script>
import stripeAsPromised from 'stripe-as-promised'

export default {
  name: 'step4',
  components: {
  },
  data () {
    return {
      address1: '',
      address2: '',
      city: '',
      state: '',
      zipcode: '',
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
    }
  }
}
</script>
<style lang="scss" scoped>
.register-form.step4 {
  padding-left: 20%;
  padding-right: 20%;
  @include media-breakpoint-down(sm) {
    padding-left: 2%;
    padding-right: 2%;
  }
}
</style>
