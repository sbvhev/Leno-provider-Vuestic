<template>
  <form class="register-form step1">
    <h2 class="text-center">New Provider Account</h2>
    <div class="row mt-5">
      <div class="col-md-6">
        <fieldset>
          <div
            class="form-group with-icon-right"
            :class="{'has-error': errors.has('firstName'), 'valid': isFormFieldValid('firstName')}"
          >
            <div class="input-group">
              <input
                autofocus
                id="firstName"
                name="firstName"
                data-vv-as="First Name"
                v-model="firstName"
                v-validate="'required'"
                required
                title
              >
              <i class="fa fa-check valid-icon icon-right input-icon"></i>
              <label class="control-label" for="firstName">First Name</label>
              <i class="bar"></i>
              <small
                v-show="errors.has('firstName')"
                class="help text-danger"
              >{{ errors.first('firstName') }}</small>
            </div>
          </div>
        </fieldset>
      </div>

      <div class="col-md-6">
        <fieldset>
          <div
            class="form-group with-icon-right"
            :class="{'has-error': errors.has('lastName'), 'valid': isFormFieldValid('lastName')}"
          >
            <div class="input-group">
              <input
                id="lastName"
                name="lastName"
                data-vv-as="Last Name"
                v-model="lastName"
                v-validate="'required'"
                required
                title
              >
              <i class="fa fa-check valid-icon icon-right input-icon"></i>
              <label class="control-label" for="lastName">Last Name</label>
              <i class="bar"></i>
              <small
                v-show="errors.has('lastName')"
                class="help text-danger"
              >{{ errors.first('lastName') }}</small>
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
            :class="{'has-error': errors.has('emailAddress'), 'valid': isFormFieldValid('emailAddress')}"
          >
            <div class="input-group">
              <input
                id="emailAddress"
                name="emailAddress"
                data-vv-as="Email"
                v-model="emailAddress"
                v-validate="'required|email'"
                required
              >
              <i class="fa fa-check valid-icon icon-right input-icon"></i>
              <label class="control-label" for="emailAddress">Email</label>
              <i class="bar"></i>
              <small
                v-show="errors.has('emailAddress')"
                class="help text-danger"
              >{{ errors.first('emailAddress') }}</small>
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
            :class="{'has-error': errors.has('phoneNumber'), 'valid': isFormFieldValid('phoneNumber')}"
          >
            <div class="input-group">
              <input
                id="phoneNumber"
                name="phoneNumber"
                data-vv-as="Phone number"
                v-model="phoneNumber"
                v-validate="'required'"
                required
                title
              >
              <i class="fa fa-check valid-icon icon-right input-icon"></i>
              <label class="control-label" for="phoneNumber">Phone Number</label>
              <i class="bar"></i>
              <small
                v-show="errors.has('phoneNumber')"
                class="help text-danger"
              >{{ errors.first('phoneNumber') }}</small>
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
            :class="{'has-error': errors.has('password'), 'valid': isFormFieldValid('password')}"
          >
            <div class="input-group">
              <input
                id="password"
                name="password"
                data-vv-as="password"
                v-model="password"
                v-validate="'required|min:6'"
                type="password"
                required
              >
              <i class="fa fa-check valid-icon icon-right input-icon"></i>
              <label class="control-label" for="password">Password</label>
              <i class="bar"></i>
              <small
                v-show="errors.has('password')"
                class="help text-danger"
              >{{ errors.first('password') }}</small>
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
            :class="{'has-error': errors.has('passwordConfirm'), 'valid': isFormFieldValid('passwordConfirm')}"
          >
            <div class="input-group">
              <input
                id="passwordConfirm"
                name="passwordConfirm"
                data-vv-as="password"
                v-model="passwordConfirm"
                v-validate="'required|confirmed:password'"
                type="password"
                required
              >
              <i class="fa fa-check valid-icon icon-right input-icon"></i>
              <label class="control-label" for="passwordConfirm">Password, again</label>
              <i class="bar"></i>
              <small
                v-show="errors.has('passwordConfirm')"
                class="help text-danger"
              >{{ errors.first('passwordConfirm') }}</small>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  </form>
</template>

<script>

export default {
  name: 'step2',
  components: {
  },
  data () {
    return {
      phoneNumber: '1-832-543-1974',
      firstName: 'test',
      lastName: 'test',
      emailAddress: 'devraj@gmail.com',
      password: 'test123',
      passwordConfirm: 'test123'
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
    }
  }
}
</script>
<style lang="scss">
.step1 {
  padding: 2.25rem 7%;
}
</style>
