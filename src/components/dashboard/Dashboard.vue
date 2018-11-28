<template>
  <div class="dashboard">

    <dashboard-info-widgets></dashboard-info-widgets>

    <vuestic-widget class="no-padding no-v-padding">
      <vuestic-tabs :names="['Studio Usage', 'Users']" ref="tabs">
        <div :slot="$t('Studio Usage')">
          <studio-and-users></studio-and-users>
        </div>
        <div :slot="$t('Users')">
          <users-table-tab></users-table-tab>
        </div>
      </vuestic-tabs>
    </vuestic-widget>

    <dashboard-bottom-widgets></dashboard-bottom-widgets>

  </div>
</template>

<script>
import DashboardInfoWidgets from './DashboardInfoWidgets'
import StudioAndUsers from './dashboard-middle-content/DataVisualisation.vue'
import UsersTableTab from './dashboard-middle-content/UsersTableTab.vue'
import DashboardBottomWidgets from './DashboardBottomWidgets.vue'

export default {
  name: 'dashboard',
  components: {
    StudioAndUsers,
    DashboardInfoWidgets,
    DashboardBottomWidgets,
    UsersTableTab
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
  }
}
</script>
<style lang="scss" scoped>
</style>
