<template>
  <form class="register-step1-form">
    <h2 class="text-center">New Provider Account</h2>
    <div class="row">
      <div class="col-md-6">
        <fieldset>
          <div
            class="form-group with-icon-right"
            :class="{'has-error': errors.has('userFirstName'), 'valid': isFormFieldValid('userFirstName')}"
          >
            <div class="input-group">
              <input
                autofocus
                id="userFirstName"
                name="userFirstName"
                data-vv-as="First Name"
                v-model="userFirstName"
                v-validate="'required'"
                required
                title=""
              />
              <i class="fa fa-check valid-icon icon-right input-icon"></i>
              <label
                class="control-label"
                for="userFirstName"
              >First Name</label><i class="bar"></i>
              <small
                v-show="errors.has('userFirstName')"
                class="help text-danger"
              >
                {{ errors.first('userFirstName') }}
              </small>
            </div>
          </div>
        </fieldset>
      </div>

      <div class="col-md-6">
        <fieldset>
          <div
            class="form-group with-icon-right"
            :class="{'has-error': errors.has('userLastName'), 'valid': isFormFieldValid('userLastName')}"
          >
            <div class="input-group">
              <input
                id="userLastName"
                name="userLastName"
                data-vv-as="Last Name"
                v-model="userLastName"
                v-validate="'required'"
                required
                title=""
              />
              <i class="fa fa-check valid-icon icon-right input-icon"></i>
              <label
                class="control-label"
                for="userLastName"
              >Last Name</label><i class="bar"></i>
              <small
                v-show="errors.has('userLastName')"
                class="help text-danger"
              >
                {{ errors.first('userLastName') }}
              </small>
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
            :class="{'has-error': errors.has('userEmailAddress'), 'valid': isFormFieldValid('userEmailAddress')}"
          >
            <div class="input-group">
              <input
                id="userEmailAddress"
                name="userEmailAddress"
                data-vv-as="Email"
                v-model="userEmailAddress"
                v-validate="'required|email'"
                required
              />
              <i class="fa fa-check valid-icon icon-right input-icon"></i>
              <label
                class="control-label"
                for="userEmailAddress"
              >Email</label><i class="bar"></i>
              <small
                v-show="errors.has('userEmailAddress')"
                class="help text-danger"
              >
                {{ errors.first('userEmailAddress') }}
              </small>
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
                title=""
              />
              <i class="fa fa-check valid-icon icon-right input-icon"></i>
              <label
                class="control-label"
                for="phoneNumber"
              >Phone Number</label><i class="bar"></i>
              <small
                v-show="errors.has('phoneNumber')"
                class="help text-danger"
              >
                {{ errors.first('phoneNumber') }}
              </small>
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
            :class="{'has-error': errors.has('userPassword'), 'valid': isFormFieldValid('userPassword')}"
          >
            <div class="input-group">
              <input
                id="userPassword"
                name="userPassword"
                data-vv-as="password"
                v-model="userPassword"
                v-validate="'required|min:6'"
                type="password"
                required
              />
              <i class="fa fa-check valid-icon icon-right input-icon"></i>
              <label
                class="control-label"
                for="userPassword"
              >Password</label><i class="bar"></i>
              <small
                v-show="errors.has('userPassword')"
                class="help text-danger"
              >
                {{ errors.first('userPassword') }}
              </small>
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
                v-validate="'required|confirmed:userPassword'"
                type="password"
                required
              />
              <i class="fa fa-check valid-icon icon-right input-icon"></i>
              <label
                class="control-label"
                for="passwordConfirm"
              >Password, again</label><i class="bar"></i>
              <small
                v-show="errors.has('passwordConfirm')"
                class="help text-danger"
              >
                {{ errors.first('passwordConfirm') }}
              </small>
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
      userFirstName: 'fdsa',
      userLastName: 'fdsafds',
      userEmailAddress: 'devraj@gmail.com',
      userPassword: 'test123',
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
    },
    completedData () {
      return this.$data
    }
  }
}
</script>
<style lang="scss" scoped>
.register-step1-form {
  width: 100%;
}
</style>
