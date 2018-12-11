<template>
  <div class="table-container">
    <vuestic-widget class="table-widget" :headerText="headerText">
      <inline-table
        :endpoint="endpoint"
        :perPageSelectorShown="perPageSelectorShown"
        :parameters="parameters"
      ></inline-table>
    </vuestic-widget>
  </div>
</template>

<script>
import InlineTable from './InlineTable'

export default {
  name: 'schedule-table',
  components: {
    InlineTable
  },
  props: {
    headerText: {
      type: String,
      require: true
    },
    endpoint: {
      type: String,
      require: true
    },
    perPageSelectorShown: {
      type: Boolean,
      default: false
    },
    parameters: {
      type: Object,
      default: () => {}
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../../../sass/_variables.scss';
@import '~bootstrap/scss/functions';
@import '~bootstrap/scss/variables';
@import '~bootstrap/scss/mixins/breakpoints';

/deep/.table-container {
  min-height: 100px;
  position: relative;
  .inline-table-container {
    padding-left: 2%;
    padding-right: 2%;
    @include media-breakpoint-down(md) {
      padding-left: 0;
      padding-right: 0;
    }
  }
}
</style>
