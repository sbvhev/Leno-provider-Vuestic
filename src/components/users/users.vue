<template>
  <div>
    <div class="row">
      <vuestic-pre-loader v-show="!isLoaded" class="pre-loader"></vuestic-pre-loader>
      <div class="col-md-12" v-if="isLoaded">
        <vuestic-widget :headerText="'Users'">
          <vuestic-data-table
            :apiMode="apiMode"
            :tableData="tableData"
            :tableFields="tableFields"
            :itemsPerPage="itemsPerPage"
            :onEachSide="onEachSide"
            :sortFunctions="sortFunctions"
            :dataModeFilterableFields="dataModeFilterableFields"
          >
          <spring-spinner
            slot="loading"
            :animation-duration="2500"
            :size="70"
            color="#4ae387"
          />
          </vuestic-data-table>
        </vuestic-widget>
      </div>
    </div>

  </div>
</template>

<script>
  import Vue from 'vue'
  import BadgeColumn from './BadgeColumn.vue'
  import FieldsDef from './fields-definition'
  import {SpringSpinner} from 'epic-spinners'
  import Proxy from '@/proxies/Proxy'

  Vue.component('badge-column', BadgeColumn)

  export default {
    name: 'users',
    components: {
      SpringSpinner
    },
    created () {
      this.initalization()
    },

    data () {
      return {
        isLoaded: false,
        apiMode: false,
        sortFunctions: FieldsDef.sortFunctions,
        tableData: [],
        onEachSide: 1,
        tableFields: FieldsDef.tableFields,
        dataModeFilterableFields: ['name'],
        itemsPerPage: [
          {
            value: 10
          },
          {
            value: 20
          },
          {
            value: 50
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

<style lang="scss">

  .color-icon-label-table {
    td:first-child {
      width: 1rem;
    }
  }
</style>
