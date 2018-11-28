<template>
  <div class="users-table-tab dashboard-tab">
    <div class="row">
      <vuestic-pre-loader v-show="!isLoaded" class="pre-loader"></vuestic-pre-loader>
      <div class="col-md-12" v-if="isLoaded">
        <vuestic-data-table :apiMode="apiMode" :tableData="tableData" :tableFields="tableFields" :itemsPerPage="itemsPerPage" :onEachSide="onEachSide" :sortFunctions="sortFunctions" :dataModeFilterableFields="dataModeFilterableFields" />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import BadgeColumn from 'components/users/BadgeColumn.vue'
import DonutChartData from './DonutChartData'
import FieldsDef from './fields-definition'
import TableData from './TableData'
import Proxy from '@/proxies/Proxy'

Vue.component('badge-column', BadgeColumn)

export default {
  name: 'users-table-tab',

  created () {
    this.initalization()
  },

  data () {
    return {
      isLoaded: false,
      donutChartData: DonutChartData,
      apiMode: false,
      sortFunctions: FieldsDef.sortFunctions,
      tableData: TableData,
      onEachSide: 1,
      tableFields: FieldsDef.tableFields,
      dataModeFilterableFields: ['name'],
      itemsPerPage: [
        {
          value: 5
        },
        {
          value: 6
        }
      ],
      tempData: []
    }
  },

  methods: {
    async initalization () {
      const me = this.$store.getters['account/myself']
      try {
        const { userId, accessToken } = me
        const { error, users } = await new Proxy('getUsers.php?', {
          userId,
          accessToken
        }).submit('get')
        if (error) {
          this.statsDatas = []
        } else {
          this.tableData = { data: users }
          const elements = Object.keys(users[0]).filter(
            ele => ele !== 'name'
          ).map((ele, index) => ({
            name: ele,
            title: ele
          }))
          this.tableFields = [...FieldsDef.tableFields, ...elements]
          this.isLoaded = true
        }
      } catch (error) {
        this.$store.dispatch('auth/notification', {
          type: 'ERROR',
          title: 'SERVER ERROR',
          message: 'Oops, Please try again later.'
        })
      }
    },

  },
}
</script>

<style lang="scss" scoped>
@import "../../../sass/_variables.scss";
@import "~bootstrap/scss/functions";
@import "~bootstrap/scss/variables";
@import "~bootstrap/scss/mixins/breakpoints";

.chart-container {
  padding: 0 2rem;
  height: 24rem;
}
</style>
