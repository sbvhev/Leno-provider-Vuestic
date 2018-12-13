<template>
  <div class="widget" :class="{'no-header': !headerText}">
    <div v-if="!isEdit && headerText" class="widget-header">{{headerText}}</div>
    <input v-if="isEdit" class="widget-header-input" v-model="editedHeaderText" />
    <div class="widget-body" v-if="hasSlotData">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'vuestic-widget',
    props: ['headerText', 'isEdit', 'onChangeHeader'],
    data () {
      return {
        editedHeaderText: this.headerText
      }
    },
    computed: {
      hasSlotData () {
        return this.$slots.default
      }
    }
  }
</script>

<style lang="scss">
.widget {
  background: $widget-bg;
  box-shadow: $widget-box-shadow;
  margin-bottom: $widget-mb;
  border: thin solid #afafaf;
  border-radius: 16px;
  padding: 0;

  &.no-header {
    .widget-body {
      height: $widget-body-no-header-height;
    }
  }

  &.larger-padding {
    .widget-body {
      padding: $widget-larger-padding;
    }
  }

  &.no-h-padding {
    .widget-body {
      padding-left: 0;
      padding-right: 0;
    }
  }

  &.no-v-padding {
    .widget-body {
      padding-top: 0;
      padding-bottom: 0;
    }
  }

  &.brand-info {
    background-color: $brand-info;
    color: $white;
    box-shadow: $widget-info-shadow;
  }

  &.brand-danger {
    background-color: $brand-danger;
    color: $white;
    box-shadow: $widget-danger-shadow;
  }

  &.info-widget {
    border-top: $info-widget-border;

    &.brand-info {
      border-top-color: $brand-info;
    }

    &.brand-danger {
      border-top-color: $brand-danger;
    }
  }

  .widget-body {
    height: $widget-body-with-header-height;
    padding: $widget-padding;
  }

  .widget-header {
    height: $widget-header-height;
    padding: 0 $widget-padding;
    border-bottom: $widget-header-border;
    font-size: $font-size-larger;
    font-weight: 600;
    display: flex;
    align-items: center;
  }

  input.widget-header-input {
    font-family: 'Nunito', sans-serif;
    font-weight: bold;
    line-height: 1.5;
    color: #34495e;
    font-size: 2em;
    margin-left: 26px;
    margin-top: 5px;
    text-align: left;
    &:focus {
      outline: rgba(74, 227, 135, 0.5) auto 5px;
    }
  }
}
</style>

