<template>
  <input :type="kind" v-model="inputModel" class="h-100 custom-input">
</template>

<script>
export default {
  name: 'customeInput',
  props: {
    kind: {
      type: String,
      default: 'text'
    },
  },
  computed: {
    inputModel: {
      get () {
        return this.inputValue
      },
      set (newValue) {
        this.$emit('inputChange', newValue)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-input {
  display: inline-block;
  color: #34495e;
  -webkit-transition: outline 0.3s; /* Safari */
  transition: outline 0.3s;
  &:focus {
    outline: rgba(74, 227, 135, 0.5) auto 5px;
  }
}
</style>
