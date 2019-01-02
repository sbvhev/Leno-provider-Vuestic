<template>
  <form class="register-form step2">
    <h1 class="text-center">Bring your locations on board</h1>
    <h5 class="text-center">Let the journey begin! Choose which facilities you would like to offer on LEON.</h5>
    <div
      class="row justify-center align-center mt-5"
      v-for="(location, index) in locations"
      :key="index"
    >
      <div class="col-md-6">
        <location-card :item="location[0]"></location-card>
      </div>
      <div class="col-md-6">
        <location-card :item="location[1]"></location-card>
      </div>
    </div>
    <div class="wizard-body-actions">
      <div class="btn-container ladda-div">
        <vue-ladda
          :loading="nextBtn.loading"
          :key="nextBtn.dataStyle"
          :data-style="nextBtn.dataStyle"
          class="btn btn-primary wizard-next"
          v-if="!isDashboard"
          @click.prevent="save()"
        >Save</vue-ladda>
      </div>
    </div>
  </form>
</template>

<script>
import LocationCard from '../elements/LocationCard'
import { mapGetters } from 'vuex'
import VueLadda from 'vue-ladda'
import Proxy from '@/proxies/Proxy'

export default {
  name: 'step2',
  components: {
    LocationCard,
    VueLadda
  },
  data () {
    return {
      locations: [],
      nextBtn: {
        loading: false,
        dataStyle: 'zoom-in',
        progress: 0
      },
      isDashboard: false,
      formData: {},
      provider: ''
    }
  },
  computed: {
    ...mapGetters({
      storeLocations: 'auth/locations'
    }),
    getLocations () {
      if (Object.keys(this.$store.getters).includes('auth/locations')) {
        return this.$store.getters['auth/locations']
      } else {
        return null
      }
    },
    getFormData () {
      if (Object.keys(this.$store.getters).includes('auth/getFormData')) {
        return this.$store.getters['auth/getFormData']
      } else {
        return null
      }
    },
    getProvider () {
      if (Object.keys(this.$store.getters).includes('auth/provider')) {
        return this.$store.getters['auth/provider']
      } else {
        return null
      }
    }
  },
  watch: {
    storeLocations (val) {
      let originLocations = [...val]
      this.locations = []
      while (originLocations.length) {
        this.locations.push(originLocations.splice(0, 2))
      }
    }
  },
  created () {
    this.isDashboard = this.$route.path.includes('dashboard')
    this.formData = this.getFormData
    this.provider = this.getProvider
    if (this.getLocations) {
      let originLocations = [...this.getLocations]
      this.locations = []
      while (originLocations.length) {
        this.locations.push(originLocations.splice(0, 2))
      }
    }
  },
  methods: {
    async save () {
      this.nextBtn.loading = true
      const {locations} = this.formData
      const {mindbodyActivationLink, siteId, ...providerData} = this.provider
      const {success, error} = await new Proxy('saveLocations.php?').submit('post', {locations, providerData})
      if (success) {
        const {pricing, success, error} = await new Proxy('getPricing.php?').submit('post', providerData)
        console.log('pricings:', pricing)
        if (success) {
          this.$store.commit('auth/FORMDATA', {key: 'pricing', value: pricing})
          this.$store.dispatch('auth/notification', {
            type: 'SUCCESS',
            title: 'SUCCESS',
            message: 'SUCCESS'
          })
        } else {
          this.showToast(error)
        }
        this.nextBtn.loading = false
        return true
      } else {
        this.showToast(error)
        this.nextBtn.loading = false
        return false
      }
    },
    showToast (errMessage = 'Oops, Please try again later.') {
      this.$store.dispatch('auth/notification', {
        type: 'ERROR',
        title: 'SERVER ERROR',
        message: errMessage
      })
    }
  }
}
</script>

<style lang="scss">
.step2 {
  h1 {
  font-size: 3.5rem;
  margin-top: 40px;
  @media only screen and (max-width: 768px) {
    font-size: 2rem;
  }
  }
  h5 {
    margin-bottom: 100px;
  }
  .ladda-div {
  display: flex;
  justify-content: center;
  align-items: center;
  }
  .ladda-button {
    border-radius: 25px;
    width: 180px;
  }
}
</style>
