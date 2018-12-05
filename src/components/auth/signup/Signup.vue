<template>
  <form class="register-form signup">
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
                v-validate="'required|phoneRules'"
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
            :class="{'has-error': errors.has('password1'), 'valid': isFormFieldValid('password1')}"
          >
            <div class="input-group">
              <input
                id="password1"
                name="password1"
                data-vv-as="password"
                v-model="password1"
                v-validate="'required|min:6|passwordRules'"
                type="password"
                required
              >
              <i class="fa fa-check valid-icon icon-right input-icon"></i>
              <label class="control-label" for="password1">Password</label>
              <i class="bar"></i>
              <small
                v-show="errors.has('password1')"
                class="help text-danger"
              >{{ errors.first('password1') }}</small>
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
            :class="{'has-error': errors.has('password2'), 'valid': isFormFieldValid('password2')}"
          >
            <div class="input-group">
              <input
                id="password2"
                name="password2"
                data-vv-as="password"
                v-model="password2"
                v-validate="'required|confirmed:password1'"
                type="password"
                required
              >
              <i class="fa fa-check valid-icon icon-right input-icon"></i>
              <label class="control-label" for="password2">Password, again</label>
              <i class="bar"></i>
              <small
                v-show="errors.has('password2')"
                class="help text-danger"
              >{{ errors.first('password2') }}</small>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
    <div
      class="px-4 mt-3 d-flex flex-column flex-lg-row align-items-center justify-content-between down-container"
    >
      <vue-ladda
        :loading="asyncBtn.loading"
        :key="asyncBtn.dataStyle"
        :data-style="asyncBtn.dataStyle"
        type="submit"
        class="btn btn-primary"
        @click.prevent="createAccount()"
      >{{'auth.signUp' | translate}}</vue-ladda>
      <router-link
        class="link"
        :to="{name: 'login'}"
      >{{'auth.alreadyJoined' | translate}}</router-link>
    </div>
  </form>
</template>

<script>
import Proxy from '@/proxies/Proxy'
import VueLadda from 'vue-ladda'

export default {
  name: 'signup',
  components: {
    VueLadda
  },
  data () {
    return {
      phoneNumber: '832-543-1974',
      firstName: 'test',
      lastName: 'test',
      emailAddress: 'devraj@gmail.com',
      password1: 'Password@63',
      password2: 'Password@63',
      asyncBtn: {
        loading: false,
        dataStyle: 'zoom-in',
        progress: 0
      },
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
    async createAccount () {
      let {asyncBtn, ...data} = this.$data
      const {siteId} = this.$route.params
      data = {...data, siteId}
      this.asyncBtn.loading = true
      // data = {...data, siteId: this.$router}
      if (this.$validator.validateAll()) {
        const res = await new Proxy('createAccount.php?', data).submit('post')
        const { provider: {
          mindbodyActivationLink,
          providerAccessToken,
          providerId,
        }} = res
        if (res.success) {
          this.$store.commit('auth/PROVIDER', {mindbodyActivationLink, providerAccessToken, providerId, siteId})
          this.$store.commit('auth/LOGIN', res.provider)
          this.$router.push({ name: 'dashboard' })
          this.asyncBtn.loading = false
          return true
        } else {
          const {displayError, error} = res
          this.asyncBtn.loading = false
          this.$store.dispatch('auth/notification', {
            type: 'ERROR',
            title: error,
            message: displayError
          })
          return false
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.signup {
  @include media-breakpoint-down(md) {
    width: 100%;
    padding-right: 2rem;
    padding-left: 2rem;
    .down-container {
      .link {
        margin-top: 2rem;
      }
    }
  }

  .btn.btn-primary.ladda-button {
    padding: 1.1rem 3.9rem;
    border-radius: 1.875rem;
    font-size: 1rem;
  }
}
</style>

