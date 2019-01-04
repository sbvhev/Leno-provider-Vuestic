<template>
  <div class="login">
    <div>
      <h2>{{'auth.welcome' | translate}}</h2>
      <form @submit.prevent="handleSubmit" name="login">
        <div
          class="form-group with-icon-right"
          :class="{'has-error': errors.has('email')}"
        >
          <div class="input-group">
            <input
              id="email"
              name="email"
              v-model="user.emailAddress"
              v-validate="'required|email'"
              required
            >
            <label class="control-label" for="email">Email</label>
            <i class="bar"></i>
            <small v-show="errors.has('email')" class="help text-danger">
              {{
              errors.first('email')
              }}
            </small>
          </div>
        </div>
        <div class="form-group with-icon-right">
          <div class="input-group">
            <input
              id="password"
              name="password"
              type="password"
              v-model="user.password"
              required
            >
            <label class="control-label" for="password">Password</label>
            <i class="bar"></i>
          </div>
        </div>
        <div
          class="d-flex flex-column flex-lg-row align-items-center justify-content-between down-container"
        >
          <vue-ladda
            :loading="loginBtn.loading"
            :key="loginBtn.dataStyle"
            :data-style="loginBtn.dataStyle"
            class="btn btn-primary wizard-next"
            type="submit"
          >{{'auth.login' | translate}}</vue-ladda>
          <router-link
            class="link"
            :to="{path: 'signup/-99'}"
          >{{'auth.createAccount' | translate}}</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import VueLadda from 'vue-ladda'

export default {
  name: 'login',
  components: {
    VueLadda
  },
  data () {
    return {
      user: {
        emailAddress: '',
        password: ''
      },
      loginBtn: {
        loading: false,
        dataStyle: 'zoom-in',
        progress: 0
      },
      isLoading: false,
    }
  },
  methods: {
    async handleSubmit (e) {
      this.loginBtn.loading = true
      await this.$store.dispatch('auth/login', this.user)
      this.loginBtn.loading = false
    },
  }
}
</script>

<style lang="scss">
.login {
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

  h2 {
    text-align: center;
  }
  width: 21.375rem;

  .down-container {
    margin-top: 3.125rem;
  }

  .form-group .bar.error::before {
    background: #e36049;
  }

  .wizard-next {
    border-radius: 25px;
    padding-right: 30px;
    padding-left: 30px;
  }
}
</style>
