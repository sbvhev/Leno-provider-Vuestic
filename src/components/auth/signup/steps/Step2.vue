<template>
  <form class="register-step1-form">
    <h2 class="text-center">Activate MINDBODY</h2>
    <div class="row justify-center align-center mt-5">
      <div class="col-md-1">
        <p class="h4 bold">1)</p>
      </div>
      <div class="col-md-11">
        <p
          class="h4"
        >Click below to automatically activate MINDBODY account. You'll see a green checkmark(opens in new window).</p>
        <br>
        <p class="h4">
          <span>
            <b>Note:</b>
          </span>must be logged in as the
          <span
            style="background-color: #f9d867;"
          >Site Owner</span> to activate account.
        </p>
        <button
          class="btn btn-info my-5"
          @click="activateAccount()"
        >Activate Account</button>
      </div>
    </div>
    <div class="row justify-center align-center my-3">
      <div class="col-md-1">
        <p class="h4 bold">2)</p>
      </div>
      <div class="col-md-11">
        <p class="h4">
          Verify account activation. Email
          <b>bryan@myleon.co</b> if you have any issues.
        </p>
        <br>
      </div>
    </div>
  </form>
</template>

<script>
// import Proxy from '@/proxies/Proxy'

export default {
  name: 'step1',
  components: {
  },
  methods: {
    activateAccount () {
      // const { mindbodyActivationLink } = this.$store.formData.provider
      const { mindbodyActivationLink } = this.$store.getters['auth/getFormData'].provider
      const mywindow = window.open(mindbodyActivationLink, 'mywindow', 'location=1,status=1,scrollbars=1,  width=1340,height=1080')
      mywindow.moveTo(400, 600)
    },
  }
}
</script>

<style lang="scss">
</style>
