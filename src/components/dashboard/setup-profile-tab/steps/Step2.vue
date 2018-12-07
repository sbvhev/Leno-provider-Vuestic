<template>
  <form class="register-form step3">
    <h2 class="text-center">Mindbody locations</h2>
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
  </form>
</template>

<script>
import LocationCard from '../elements/LocationCard'
import { mapGetters } from 'vuex'

export default {
  name: 'step2',
  components: {
    LocationCard
  },
  data () {
    return {
      locations: [],
    }
  },
  computed: {
    ...mapGetters({
      storeLocations: 'auth/locations'
    }),
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
}
</script>

<style lang="scss">
</style>
