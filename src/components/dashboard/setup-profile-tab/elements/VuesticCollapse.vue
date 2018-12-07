<template>
  <div class="vuestic-collapse">
    <div
      class="vuestic-collapse__header"
      :class="{
        'vuestic-collapse__header--no-header': noHeader,
      }"
      @click.prevent="onHeaderClick()"
    >
      <template v-if="noHeader">
        <slot name="header"/>
      </template>
      <button v-else class="vuestic-collapse__header__button btn btn-primary">
        <slot name="header"/>
      </button>
    </div>

    <div class="vuestic-collapse__body" ref="collapseBody">
      <slot name="body"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vuestic-collapse',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    noHeader: Boolean,
    onClickHeader: Function,
    index: Number
  },
  inject: {
    accordion: {
      default: () => ({
        onChildChange: () => {},
      }),
    },
  },
  data () {
    return {
      show: this.value,
    }
  },
  methods: {
    expand () {
      const bodyContent = this.$refs.collapseBody
      setTimeout(() => {
        bodyContent.style.height = this.$slots.body[0].elm.clientHeight + 'px'
      }, 100)
      this.show = true
    },
    collapse () {
      const bodyContent = this.$refs.collapseBody
      bodyContent.style.height = 0
      this.show = false
    },
    onHeaderClick (e) {
      this.toggle()
      this.$emit('onClickHeader', this.index)
      this.accordion.onChildChange(this, this.show)
    },
    // Public
    toggle () {
      this.show ? this.collapse() : this.expand()
    },
  },
  updated () {
    if (this.value) this.expand()
    else this.collapse()
  },
  mounted () {
    if (this.value) this.expand()
    else this.collapse()
  },
}
</script>

<style lang="scss">
.vuestic-collapse {
  & + & {
    margin-top: 8px;
  }
  &__body {
    height: 0;
    transition: height 0.8s;
    margin-top: 20px;
    background: $light-gray;
    overflow: hidden;
  }
  &__header {
    &__button {
      width: 100%;
      padding-left: 1.5rem;
      border-radius: 0;
      text-align: left;
    }
    &--no-header {
      margin-bottom: 1rem;
    }
  }
  .vuestic-collapse__body {
    margin-top: 0;
  }
}
</style>