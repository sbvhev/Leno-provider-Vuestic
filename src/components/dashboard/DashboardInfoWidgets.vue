<template>
  <div v-if="isLoaded" class="row dashboard-info-widgets">
    <status-card
      v-for="(stats, index) in statsDatas"
      :key="index"
      :data="stats"
    ></status-card>
  </div>
</template>

<script>
import Proxy from '@/proxies/Proxy'
import StatusCard from './elements/StatusCard'

export default {
  name: 'dashboard-info-widgets',
  components: {
    StatusCard
  },
  created () {
    this.initalization()
  },
  data () {
    return {
      statsDatas: [],
      isLoaded: false
    }
  },
  methods: {
    async initalization () {
      const {providerId, providerAccessToken} = this.$store.getters['auth/provider']
      try {
        const { success, stats } = await new Proxy('getStats.php?').submit('post', {
          providerId,
          providerAccessToken
        })
        if (success) {
          this.statsDatas = stats
          this.isLoaded = true
        } else {
          this.statsDatas = []
          this.showToast()
        }
      } catch (error) {
        this.showToast()
      }
    },
    showToast () {
      this.$store.dispatch('auth/notification', {
        type: 'ERROR',
        title: 'DashboardInfoWidgets',
        message: 'Oops, Please try again later.'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.dashboard-info-widgets {
  .stats-number,
  .stats-title {
    line-height: 1;
  }

  .info-widget-inner {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;

    &.has-chart {
      justify-content: space-between;
    }

    .stats {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
  }

  .stats-number {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: 3.625rem;
    margin-bottom: 0.5rem;

    .stats-icon {
      font-size: 2.5625rem;
      position: absolute;
      top: 0.625rem;
      left: -1.85rem;

      &.icon-wide {
        left: -1.875rem;
      }
    }
  }
}
</style>
