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
.step2 {
  h1 {
  font-size: 3.5rem;
  margin-top: 40px;
  }
  h5 {
    margin-bottom: 100px;
  }
}
</style>
