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
            <locations-tab></locations-tab>
          </div>
          <div :slot="$t('Users')">
            <users-table-tab></users-table-tab>
          </div>
        </vuestic-tabs>
      </vuestic-widget>

      <dashboard-bottom-widgets></dashboard-bottom-widgets>
      <!-- <vuestic-widget
        class="chart-widget"
        :headerText="'Plan Update' | translate"
      >-->
      <schedule-table></schedule-table>
      <!-- </vuestic-widget> -->
    </div>
  </div>
</template>

<script>
import DashboardInfoWidgets from './DashboardInfoWidgets'
import ClassesTab from './dashboard-middle-content/ClassesVisualisation.vue'
import UsersTableTab from './dashboard-middle-content/UsersTableTab.vue'
import LocationsTab from './dashboard-middle-content/LocationsTab.vue'
import DashboardBottomWidgets from './DashboardBottomWidgets.vue'
import ScheduleTable from './ScheduleTable.vue'
import SetupProfileTab from './setup-profile-tab/SetupProfile.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'dashboard',
  components: {
    ClassesTab,
    DashboardInfoWidgets,
    DashboardBottomWidgets,
    UsersTableTab,
    SetupProfileTab,
    LocationsTab,
    ScheduleTable
  },
  computed: {
    ...mapGetters({
      isLoading: 'shared/isLoading',
      isSetupProfile: 'auth/setupProfile'
    })
  },
  methods: {
    launchEpicmaxToast () {
      this.showToast(`Let's work together!`, {
        icon: 'fa-star-o',
        position: 'top-right',
        duration: Infinity,
        action: {
          text: 'Hire us',
          href: 'http://epicmax.co/#/contact',
          class: 'vuestic-toasted-link'
        }
      })
    }
  },
}
</script>
<style lang="scss" scoped>
.dashboard {
  /deep/.widget-body {
    padding: 0;
  }
}
</style>
