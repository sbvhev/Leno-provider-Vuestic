<template>
  <div class="dashboard">
    <div v-if="!isSetupProfile">
      <vuestic-widget
        class="no-padding no-v-padding"
        :headerText="$t('Setup Profile')"
      >
        <setup-profile-tab></setup-profile-tab>
      </vuestic-widget>
    </div>
    <div v-else>
      <dashboard-info-widgets></dashboard-info-widgets>

      <vuestic-widget class="no-padding no-v-padding px-4">
        <vuestic-tabs :names="['Classes', 'Locations', 'Users']" ref="tabs">
          <div :slot="$t('Classes')">
            <classes-tab></classes-tab>
          </div>
          <div :slot="$t('Locations')">
            <inline-table endpoint="getLocationSpend.php"></inline-table>
          </div>
          <div :slot="$t('Users')">
            <inline-table endpoint="getUsers.php"></inline-table>
          </div>
        </vuestic-tabs>
      </vuestic-widget>

      <dashboard-bottom-widgets></dashboard-bottom-widgets>
      <table-widget
        headerText="Schedule"
        endpoint="getSchedule.php"
        perPageSelectorShown
      ></table-widget>
    </div>
  </div>
</template>

<script>
import DashboardInfoWidgets from './DashboardInfoWidgets'
import ClassesTab from './dashboard-middle-content/ClassesVisualisation.vue'
import DashboardBottomWidgets from './DashboardBottomWidgets.vue'
import SetupProfileTab from './setup-profile-tab/SetupProfile.vue'
import TableWidget from './elements/TableWidget.vue'
import InlineTable from './elements/InlineTable.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'dashboard',
  components: {
    ClassesTab,
    DashboardInfoWidgets,
    DashboardBottomWidgets,
    SetupProfileTab,
    TableWidget,
    InlineTable
  },
  computed: {
    ...mapGetters({
      isLoading: 'shared/isLoading',
      isSetupProfile: 'auth/setupProfile'
    })
  },
}
</script>
<style lang="scss" scoped>
/deep/.dashboard {
  .table-container {
    position: inherit;
  }
  .widget-body {
    padding: 0;
  }
}
</style>
