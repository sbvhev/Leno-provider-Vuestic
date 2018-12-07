<template>
  <form class="register-form step1">
    <h2 class="text-center">Activate MINDBODY</h2>
    <div class="row justify-center align-center mt-5">
      <div class="col-md-1 paragraph paragraph-head">
        <p class="h5 bold">1)</p>
      </div>
      <div class="col-md-11 paragraph paragraph-body">
        <p
          class="h5"
        >Click below to automatically activate MINDBODY account. You'll see a green checkmark(opens in new window).</p>
        <br>
        <p class="h5">
          <span>
            <b>Note:</b>
          </span>must be logged in as the
          <span
            style="background-color: #f9d867;"
          >Site Owner</span> to activate account.
        </p>
        <button
          class="btn btn-info my-5 btn-activate"
          @click.prevent="activateAccount()"
        >Activate Account</button>
      </div>
    </div>
    <div class="row justify-center align-center my-3">
      <div class="col-md-1 paragraph paragraph-head">
        <p class="h5 bold">2)</p>
      </div>
      <div class="col-md-11 paragraph paragraph-body">
        <p class="h5">
          Verify account activation. Email
          <b>bryan@myleon.co</b> if you have any issues.
        </p>
        <br>
      </div>
    </div>
  </form>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'step1',
  components: {
  },
  computed: {
    ...mapGetters({
      provider: 'auth/provider'
    })
  },
  methods: {
    activateAccount () {
      // const { mindbodyActivationLink } = this.$store.formData.provider
      const {mindbodyActivationLink} = this.provider
      const mywindow = window.open(mindbodyActivationLink, 'mywindow', 'location=1,status=1,scrollbars=1,  width=1340,height=1080')
      mywindow.moveTo(350, 600)
    },
  }
}
</script>

<style lang="scss">
.step1 {
  padding: 0 7rem;
  .paragraph {
    .p {
      line-height: 1.3;
    }
    &.paragraph-head {
      text-align: right;
    }
    &.paragraph-body {
      padding-left: 3rem;
    }
  }
  @include media-breakpoint-down(md) {
    padding: 0;
    .paragraph.paragraph-head {
      text-align: left;
    }
    .btn-activate {
      padding: 1.1rem 2.5rem;
    }
  }
}
</style>
