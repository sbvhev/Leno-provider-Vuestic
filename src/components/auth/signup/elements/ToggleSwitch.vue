<template>
  <div class="toggle">
    <input type="checkbox" class="check" v-model="isOn">
    <b class="b switch"></b>
    <b class="b track"></b>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isOn: this.locationIsOn
    }
  },
  props: ['locationIsOn'],
  watch: {
    isOn: function (val) {
      this.$emit('checkChange')
    }
  },
  mounted () {
    console.log(this.locationIsOn)
  },
}
</script>

<style lang="scss" scoped>
.b {
  display: block;
}

.toggle {
  position: relative;
  width: 70px;
  height: 30px;
  border-radius: 100px;
  background-color: #ddd;
  overflow: hidden;
  box-shadow: inset 0 0 2px 1px rgba(0, 0, 0, 0.05);
}

.check {
  position: absolute;
  display: block;
  cursor: pointer;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 6;
}

.check:checked ~ .track {
  box-shadow: inset 0 0 0 20px #4ae387;
}

.check:checked ~ .switch {
  right: 2px;
  left: 35px;
  transition: 0.35s cubic-bezier(0.785, 0.135, 0.15, 0.86);
  transition-property: left, right;
  transition-delay: 0.05s, 0s;
}

.switch {
  position: absolute;
  left: 2px;
  top: 2px;
  bottom: 2px;
  right: 35px;
  background-color: #fff;
  border-radius: 36px;
  z-index: 1;
  transition: 0.35s cubic-bezier(0.785, 0.135, 0.15, 0.86);
  transition-property: left, right;
  transition-delay: 0s, 0.05s;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.track {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  transition: 0.35s cubic-bezier(0.785, 0.135, 0.15, 0.86);
  box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.05);
  border-radius: 40px;
}
</style>
