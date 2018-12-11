<template>
  <div class="users-table-tab dashboard-tab">
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
          :perPageSelectorShown="false"
          @onCellClicked="onCellClicked"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import BadgeColumn from 'components/users/BadgeColumn.vue'
import Proxy from '@/proxies/Proxy'
import TableDataInfo from '@/helpers/TableDataInfo'

Vue.component('badge-column', BadgeColumn)

export default {
  name: 'users-table-tab',

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
        datas: {
          data: {}
        },
        fields: [],
        sortFunctions: {}
      },
    }
  },

  methods: {
    async initalization () {
      const {providerId, providerAccessToken} = this.$store.getters['auth/provider']
      try {
        const { success, users } = await new Proxy('getUsers.php?').submit('post', {
          providerId,
          providerAccessToken
        })

        if (success && users) {
          if (users) {
            this.table = new TableDataInfo(users)
          } else {
            this.showToast()
          }

          this.isLoaded = true
        }
      } catch (error) {
        console.log('empty table')
      }
    },
    onCellClicked (e) {
      console.log('row selected --->', e)
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
@import '../../../sass/_variables.scss';
@import '~bootstrap/scss/functions';
@import '~bootstrap/scss/variables';
@import '~bootstrap/scss/mixins/breakpoints';

.users-table-tab {
  padding-left: 10%;
  padding-right: 10%;
  @include media-breakpoint-down(md) {
    padding-left: 0;
    padding-right: 0;
  }
}
</style>
