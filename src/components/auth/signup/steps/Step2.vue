<template>
  <form class="register-step1-form">
    <h2 class="text-center">Activate MINDBODY</h2>
    <div class="row justify-center align-center">
      <div class="col-md-1">
        <p class="h4 bold">1)</p>
      </div>
      <div class="col-md-11">
        <p class="h4">Click below to automatically activate MINDBODY account. You'll see a green checkmark(opens in new window).</p>
        <br>
        <p class="h4"><span><b>Note:</b></span>must be logged in as the <span style="background-color: #f9d867;">Site Owner</span> to activate account.</p>
        <button
          class="btn btn-info mt-4 mb-5"
          @click.capture="activateAccount()"
        >
          Activate Account
        </button>
      </div>
    </div>
    <div class="row justify-center align-center">
      <div class="col-md-1">
        <p class="h4 bold">2)</p>
      </div>
      <div class="col-md-11">
        <p class="h4">Verify account activation. Email <b>bryan@myleon.co</b> if you have any issues.</p>
        <br>
        <button
          class="btn btn-info mt-2 mb-4"
          @click="verifyActivation()"
        >
          Verify Activation
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'step1',
  components: {
  },
  data () {
    return {
      isActivate: false
    }
  },
  methods: {
    activateAccount () {
      window.open('https://www.google.com', '_blank', 'height=570,width=520,scrollbars=yes,status=yes')
    },
    verifyActivation () {
      alert('OK')
      this.isActivate = true
    },
    completedData () {
      return this.$data
    }
  }
}
</script>

<style lang="scss">
.register-step1-form {
  width: 100%;
  height: 500px;
}
</style>
