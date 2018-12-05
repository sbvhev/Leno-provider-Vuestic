<template>
  <vuestic-widget
    :class="['info-widget', {'disable-info-widget': item.isOutsideCoverage === 'true'}]"
  >
    <div
      class="d-flex flex-row flex-wrap justify-content-between align-content-center"
    >
      <div class="location pr-3">
        <div class="location-title">
          <h4>{{item.name}}</h4>
        </div>
        <div class="location-address">{{item.address}}</div>
      </div>
      <div v-if="item.isOutsideCoverage === 'true'">
        <div class="font-weight-bold text-right mr-1">Location currently beyond</div>
        <div class="font-weight-bold text-right mr-1">LEON coverage</div>
      </div>
      <div
        v-else
        class="d-flex justify-content-center flex-row align-items-center flex-wrap"
      >
        <div class="font-weight-bold text-center mr-1">Show on LEON?</div>
        <div>
          <toggle-switch :locationIsOn="item.isOn" @checkChange="isOn = !isOn"></toggle-switch>
        </div>
      </div>
    </div>
  </vuestic-widget>
</template>

<script>
import ToggleSwitch from './ToggleSwitch'

export default {
  components: {
    ToggleSwitch
  },
  props: ['item'],
  data () {
    return {
      isOn: this.item.isOn
    }
  },
  watch: {
    isOn: function (val) {
      this.$store.commit('auth/CHANGEISON', {id: this.item.id, isOn: this.isOn})
    }
  }
}
</script>

<style lang="scss" scoped>
.info-widget {
  /deep/.widget-body {
    padding: 20px 40px;
  }
  &.disable-info-widget {
    border-top: 0.5rem solid #a0a0a0;
    color: #c5c5c5;
  }
  padding-top: 3%;
  padding-bottom: 3%;
  .location-address {
    font-size: 18px;
  }
}
</style>
