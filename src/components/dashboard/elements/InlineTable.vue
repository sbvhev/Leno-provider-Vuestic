<template>
  <div class="inline-table-container">
    <vuestic-pre-loader v-show="!isLoaded" class="pre-loader"></vuestic-pre-loader>
    <div v-if="isLoaded" class="table-body pt-3">
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
            @onRowClicked="onRowClicked"
          />
        </div>
      </div>
    </div>
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
    },
    rowClickParams: {
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
      result: []
    }
  },

  methods: {
    async initalization () {
      const {providerId, providerAccessToken} = this.$store.getters['auth/provider']
      try {
        const {success, error, ...data} = await new Proxy(this.endpoint).submit('post', {
          providerId,
          providerAccessToken,
          ...this.parameters
        })

        if (success && data) {
          this.result = Object.values(data).pop()
          this.table = new TableDataInfo(this.result)
        } else {
          this.showToast(error)
        }
        this.isLoaded = true
      } catch (error) {
        console.log('empty table')
        this.isLoaded = true
      }
    },
    onRowClicked (e) {
      const {kind, id} = this.rowClickParams
      if (kind === 'class') {
        setTimeout(() => {
          const selectedClass = this.result.filter(ele => e[id] === ele[id]).pop()
          this.$router.push(`dashboard/class/${selectedClass.classDescriptionId}`)
        }, 20)
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

.inline-table-container {
  padding-left: 10%;
  padding-right: 10%;
  @include media-breakpoint-down(md) {
    padding-left: 0;
    padding-right: 0;
  }
}
</style>
