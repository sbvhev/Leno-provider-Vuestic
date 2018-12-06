<template>
  <div class="data-visualisation-tab dashboard-tab">
    <div class="row">
      <div class="col-md-6">
        <div class="chart-container" v-if="isLoaded">
          <vuestic-chart v-bind:data="donutChartData" type="donut"></vuestic-chart>
        </div>
      </div>
      <vuestic-pre-loader v-show="!isLoaded" class="pre-loader"></vuestic-pre-loader>
      <div class="col-md-6" v-if="isLoaded">
        <vuestic-data-table
          :apiMode="apiMode"
          :tableData="tableData"
          :tableFields="tableFields"
          :itemsPerPage="itemsPerPage"
          :onEachSide="onEachSide"
          :sortFunctions="sortFunctions"
          :dataModeFilterableFields="dataModeFilterableFields"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import BadgeColumn from 'components/users/BadgeColumn.vue'
import FieldsDef from './fields-definition'
import TableData from './TableData'
import Proxy from '@/proxies/Proxy'

Vue.component('badge-column', BadgeColumn)

export default {
  name: 'data-visualisation-tab',

  created () {
    this.initalization()
  },

  data () {
    return {
      isLoaded: false,
      donutChartData: {
        labels: [],
        datasets: [{
          label: 'Population (millions)',
          backgroundColor: [],
          data: []
        }]
      },
      // donutChartData: DonutChartData,
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
      tempData: [],
    }
  },
  methods: {
    async initalization () {
      const me = this.$store.getters['account/myself']
      try {
        const { userId, accessToken } = me
        const { error, usage } = await new Proxy('getUsage.php?', {
          userId,
          accessToken
        }).submit('get')
        if (error) {
          this.tableData = []
        } else {
          this.tableData = { data: usage }
          this.normaliztion(usage)
          this.tableFields = [...FieldsDef.tableFields, 'print_amount']
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
    normaliztion (data) {
      const palette = this.$store.getters['shared/palette']
      const colorType = [palette.info, palette.warning, palette.primary, palette.fontColor]
      for (const index in data) {
        const ele = data[index]
        this.donutChartData.labels = [...this.donutChartData.labels, ele.name]
        this.donutChartData.datasets[0].backgroundColor = [...this.donutChartData.datasets[0].backgroundColor, colorType[index % 4]]
        this.donutChartData.datasets[0].data = [...this.donutChartData.datasets[0].data, ele.value]
      }
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../../../sass/_variables.scss';
@import '~bootstrap/scss/functions';
@import '~bootstrap/scss/variables';
@import '~bootstrap/scss/mixins/breakpoints';

.chart-container {
  padding: 0 2rem;
  height: 24rem;
}
</style>
