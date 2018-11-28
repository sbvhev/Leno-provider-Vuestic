<template>
  <form class="register-step3-form">
    <div class="row">
      <div class="col-md-12">
        <fieldset>
          <div class="form-group with-icon-right" :class="{'has-error': errors.has('name'), 'valid': isFormFieldValid('name')}">
            <div class="input-group">
              <input
                name="name"
                data-vv-as="Name"
                v-model="name"
                v-validate="'required'"
                required />
              <i class="fa fa-check valid-icon icon-right input-icon"></i>
              <label class="control-label">Name</label><i class="bar"></i>
              <small v-show="errors.has('name')" class="help text-danger">
                {{ errors.first('name') }}
              </small>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <fieldset>
          <vuestic-simple-select label="type" v-model="type" :options="['individual', 'company']" />
        </fieldset>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
          <div class="form-group with-icon-right" :class="{'has-error': errors.has('routing_number'), 'valid': isFormFieldValid('routing_number')}">
            <div class="input-group">
              <input
                name="routing_number"
                data-vv-as="Routing number"
                v-model="routing_number"
                v-validate="'required'"
                required />
              <i class="fa fa-check valid-icon icon-right input-icon"></i>
              <label class="control-label">Routing number</label><i class="bar"></i>
              <small v-show="errors.has('routing_number')" class="help text-danger">
                {{ errors.first('routing_number') }}
              </small>
            </div>
          </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
          <div class="form-group with-icon-right" :class="{'has-error': errors.has('account_number'), 'valid': isFormFieldValid('account_number')}">
            <div class="input-group">
              <input
                name="account_number"
                data-vv-as="Account number"
                v-model="account_number"
                v-validate="'required'"
                required />
              <i class="fa fa-check valid-icon icon-right input-icon"></i>
              <label class="control-label">Account number</label><i class="bar"></i>
              <small v-show="errors.has('account_number')" class="help text-danger">
                {{ errors.first('account_number') }}
              </small>
            </div>
          </div>
      </div>
    </div>
  </form>
</template>

<script>
import stripeAsPromised from 'stripe-as-promised'

export default {
  name: 'ach-payment',
  components: {
  },
  data () {
    return {
      name: '',
      type: 'individual',
      routing_number: '',
      account_number: '',
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
      const data = {
        country: 'us',
        currency: 'usd',
        account_holder_name: this.name,
        account_holder_type: this.type,
        routing_number: this.routing_number,
        account_number: this.account_number
      }
      try {
        const { id } = await stripe.bankAccount.createToken(data)
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
