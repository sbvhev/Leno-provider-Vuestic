<template>
  <vuestic-widget class="info-widget">
    <div
      class="table-header pt-3 d-flex flex-row flex-wrap justify-content-between align-content-center border-bottom-2"
    >
      <div class="location pr-3">
        <div class="location-title">
          <h5>Payment Options</h5>
        </div>
      </div>
      <div
        class="d-flex justify-content-center flex-row align-items-center flex-wrap"
      >
        <div class="font-weight-bold text-center mr-1">
          <h5>Price</h5>
        </div>
      </div>
    </div>
    <div class="table-body py-2">
      <div
        v-for="(option, index) in priceModels"
        :key="index"
        v-bind:class="[index%2 ? 'pt-3 pb-1' : 'pt-1 pb-3', 'row']"
      >
        <div class="col-8 text-left widget-element pl-1">
          <b>{{option.name}}</b>
        </div>
        <div class="col-4 text-right widget-element input">
          <span v-if="option.units === `price_cents`">$</span>
          <input
            type="number"
            align="right"
            class="h-100"
            :key="index+'input'"
            :value="priceModels[index].value | exchangeDoller"
            @input="handleInput($event, index)"
          >
        </div>
      </div>
    </div>
  </vuestic-widget>
</template>

<script>
export default {
  name: 'priceForm',
  data () {
    return {
      priceModels: {}
    }
  },
  props: ['options'],
  methods: {
    handleInput (e, index) {
      this.priceModels[index] = {
        ...this.priceModels[index], value: e.target.value * 100
      }
    }
  },
  mounted () {
    this.priceModels = JSON.parse(JSON.stringify(this.options))
  }
}
</script>

<style>
</style>
