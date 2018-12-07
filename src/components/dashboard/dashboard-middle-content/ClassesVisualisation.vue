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
      sortFunctions: [],
      tableData: TableData,
      onEachSide: 1,
      tableFields: [],
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
      const {providerId, providerAccessToken} = this.$store.getters['auth/provider']
      try {
        const {success, classes} = await new Proxy('getClasses.php?', {
          providerId,
          providerAccessToken
        }).submit('post')
        if (success) {
          this.createTable(classes)
          this.drawChart(classes)
          this.isLoaded = true
        } else {
          this.tableData = []
          this.isLoaded = true
          this.showToast()
        }
      } catch (error) {
        this.showToast()
      }
    },

    createTable (data) {
      this.tableData = { data }
      this.tableFields = Object.keys(data[0]).map((ele, index) => {
        return {
          name: ele,
          title: ele,
          dataClass: index === 0 ? 'text-center' : '',
          sortField: ele
        }
      })
      this.sortFunctions = {
        ...Object.keys(data[0]).map(ele => {
          return {
            [ele]: function (item1, item2) {
              return item1 >= item2 ? 1 : -1
            }
          }
        })
      }
    },
    drawChart (data) {
      const palette = this.$store.getters['shared/palette']
      const colorType = [palette.info, palette.warning, palette.primary, palette.fontColor]
      this.donutChartData.labels = data.map(ele => {
        return ele.className
      })
      this.donutChartData.datasets[0].data = data.map(ele => {
        return ele.bookings
      })
      this.donutChartData.datasets[0].backgroundColor = Object.keys(data).map((ele, index) => {
        return colorType[index % 4]
      })
    },
    showToast () {
      this.$store.dispatch('auth/notification', {
        type: 'ERROR',
        title: 'SERVER ERROR',
        message: 'Oops, Please try again later.'
      })
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
