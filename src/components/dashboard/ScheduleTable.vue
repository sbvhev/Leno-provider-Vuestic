<template>
  <vuestic-widget class="schedule-table" :headerText="`Schedule`">
    <div class="users-table-tab dashboard-tab pt-3">
      <div class="row">
        <vuestic-pre-loader v-show="!isLoaded" class="pre-loader"></vuestic-pre-loader>
        <div class="col-md-12" v-if="isLoaded">
          <vuestic-data-table
            :apiMode="apiMode"
            :tableData="table.datas"
            :tableFields="table.fields"
            :sortFunctions="table.sortFunctions"
            :itemsPerPage="itemsPerPage"
            :onEachSide="onEachSide"
            :dataModeFilterableFields="dataModeFilterableFields"
          />
        </div>
      </div>
    </div>
  </vuestic-widget>
</template>

<script>
import Vue from 'vue'
import BadgeColumn from 'components/users/BadgeColumn.vue'
import Proxy from '@/proxies/Proxy'
import TableDataInfo from '@/helpers/TableDataInfo'

Vue.component('badge-column', BadgeColumn)

export default {
  name: 'schedule-table',

  created () {
    this.initalization()
  },

  data () {
    return {
      isLoaded: false,
      apiMode: false,
      onEachSide: 1,
      dataModeFilterableFields: ['name'],
      itemsPerPage: [
        {
          value: 5
        },
        {
          value: 6
        }
      ],
      table: {
        datas: {},
        fields: [],
        sortFunctions: {}
      },
    }
  },

  methods: {
    async initalization () {
      const {providerId, providerAccessToken} = this.$store.getters['auth/provider']
      const {success, schedule} = await new Proxy('getSchedule.php').submit('post', {
        providerId,
        providerAccessToken
      })

      if (success && schedule) {
        if (schedule) {
          this.$nextTick(() => {
            this.table = new TableDataInfo(schedule)
          })
        }
      } else {
        this.showToast()
      }
      this.isLoaded = true
    },
    showToast () {
      this.$store.dispatch('auth/notification', {
        type: 'ERROR',
        title: 'UsersTableTab',
        message: 'Oops, Please try again later.'
      })
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../../sass/_variables.scss';
@import '~bootstrap/scss/functions';
@import '~bootstrap/scss/variables';
@import '~bootstrap/scss/mixins/breakpoints';

.schedule-table {
  /deep/.users-table-tab {
    padding-left: 2%;
    padding-right: 2%;
    @include media-breakpoint-down(md) {
      padding-left: 0;
      padding-right: 0;
    }
  }
}
</style>
