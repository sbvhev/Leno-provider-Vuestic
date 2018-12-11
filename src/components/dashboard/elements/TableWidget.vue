<template>
  <div class="table-container">
    <vuestic-pre-loader v-if="!isLoaded" class="pre-loader"></vuestic-pre-loader>
    <vuestic-widget
      v-if="isLoaded"
      class="table-widget"
      :headerText="headerText"
    >
      <div class="table-body pt-3">
        <div class="row">
          <div class="col-md-12">
            <vuestic-data-table
              :apiMode="apiMode"
              :tableData="table.datas"
              :tableFields="table.fields"
              :sortFunctions="table.sortFunctions"
              :itemsPerPage="itemsPerPage"
              :onEachSide="onEachSide"
              :perPageSelectorShown="perPageSelectorShown"
              :dataModeFilterableFields="dataModeFilterableFields"
            />
          </div>
        </div>
      </div>
    </vuestic-widget>
  </div>
</template>

<script>
import Proxy from '@/proxies/Proxy'
import TableDataInfo from '@/helpers/TableDataInfo'

export default {
  name: 'schedule-table',

  created () {
    this.initalization()
  },
  props: {
    headerText: {
      type: String,
      require: true
    },
    endpoint: {
      type: String,
      require: true
    },
    perPageSelectorShown: {
      type: Boolean,
      default: false
    },
    parameters: {
      type: Object,
      default: () => {}
    }
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
          data: []
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
        const {success, error, ...data} = await new Proxy(this.endpoint).submit('post', {
          providerId,
          providerAccessToken,
          classDescriptionId: this.parameters ? this.parameters[0] : {}
        })
        if (success && data) {
          if (data) {
            this.table = new TableDataInfo(Object.values(data).pop())
          }
        } else {
          this.showToast(error)
        }
        this.isLoaded = true
      } catch (error) {
        console.log('empty table')
      }
    },
    showToast (error = 'Oops, Please try again later.') {
      this.$store.dispatch('auth/notification', {
        type: 'ERROR',
        title: 'Parameters error!',
        message: error
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

/deep/.table-container {
  min-height: 100px;
  position: relative;
  .table-widget {
    .table-body {
      padding-left: 2%;
      padding-right: 2%;
      @include media-breakpoint-down(md) {
        padding-left: 0;
        padding-right: 0;
      }
    }
  }
}
</style>
