<template>
  <form class="register-step3-form">
    <div class="row">
      <div class="col-md-8">
        <fieldset>
          <div class="form-group">
            <div class="input-group">
              <input id="addressCity" v-model="address_city" required/>
              <label class="control-label" for="addressCity">City</label><i class="bar"></i>
            </div>
          </div>
        </fieldset>
      </div>

      <div class="col-md-4">
        <fieldset>
          <div class="form-group">
            <div class="input-group">
              <input id="addressState" v-model="address_state" required/>
              <label class="control-label" for="addressState">State</label><i class="bar"></i>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <fieldset>
          <div class="form-group with-icon-right" :class="{'has-error': errors.has('number'), 'valid': isFormFieldValid('number')}">
            <div class="input-group">
              <input
              name="number"
              data-vv-as="Credit Card Number"
              v-model="number"
              v-validate="'required'"
              required />
              <i class="fa fa-check valid-icon icon-right input-icon"></i>
              <label class="control-label">Credit Card Number</label><i class="bar"></i>
              <small v-show="errors.has('number')" class="help text-danger">
                {{ errors.first('number') }}
              </small>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4">
        <fieldset>
          <vuestic-simple-select label="Expiration Year" v-model="expYear" :options="['2014','2015','2016','2017','2018','2019','2020','2021','2022','2023','2024','2025']" />
        </fieldset>
      </div>
      <div class="col-md-4">
        <fieldset>
          <vuestic-simple-select label="Expiration Month" v-model="expMonth" :options="['1','2','3','4','5','6','7','8','9','10','11','12']" />
        </fieldset>
      </div>
      <div class="col-md-4">
        <fieldset>
          <div class="form-group with-icon-right" :class="{'has-error': errors.has('cvc'), 'valid': isFormFieldValid('cvc')}">
            <div class="input-group">
              <input
                name="cvc"
                data-vv-as="CVV/CVC"
                v-model="cvc"
                v-validate="'required'"
                required />
              <i class="fa fa-check valid-icon icon-right input-icon"></i>
              <label class="control-label">CVV/CVC</label><i class="bar"></i>
              <small v-show="errors.has('cvc')" class="help text-danger">
                {{ errors.first('cvc') }}
              </small>
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
  name: 'step5',
  components: {
  },
  data () {
    return {
      number: '',
      expMonth: '12',
      expYear: '2018',
      cvc: '',
      address_city: '',
      address_state: '',
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
</style>
