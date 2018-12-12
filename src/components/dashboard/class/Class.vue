<template>
  <div class="class-container">
    <vuestic-pre-loader v-if="!isLoaded" class="pre-loader"></vuestic-pre-loader>
    <div class="class-details" v-if="isLoaded">
      <vuestic-widget class="class-header-card" ref="widgetHeader" :isEdit="isEdit" @onChangeHeader="onChangeHeader(val)" :headerText="generalInfo.name">
        <div class="d-flex flex-row justify-content-between">
          <h5>Description</h5>
          <a href="#" class="text-info" @click.prevent="onClickEdit">{{btnText}}</a>
        </div>
        <p v-if="!isEdit">{{generalInfo.description}}</p>
        <textarea row="5" col="50" class="edit-content" v-model="generalInfo.description" v-else></textarea>
        <div class="d-flex flex-row justify-content-between align-items-end">
          <div>
            <h6 class="d-inline pr-3">Price</h6>
            <custom-input :value="inputValue" @inputChange="onInputChange"></custom-input>
          </div>
          <a href="#" class="text-info">Advanced pricing</a>
        </div>
      </vuestic-widget>

      <div class="row">
        <div class="col-md-6 col-12">
          <vuestic-widget class="business-posts p-2">
            <vuestic-social-news
              class="vuestic-social-news"
              :news="news"
              :url="'http://instagram.com/smartapant'"
              btnText="upload"
              headerText="Photos"
            ></vuestic-social-news>
          </vuestic-widget>
          <table-widget
            headerText="Instructors"
            endpoint="classDescription/instructors.php"
            :parameters="{classDescriptionId: classId}"
          ></table-widget>
        </div>
        <div class="col-md-6 col-12 class-description">
          <vuestic-widget>
            <div v-for="(info, index) in leonInfo" :key="index" class="pa-3">
              <h5>{{info.title}}</h5>
              <p class="pt-2">{{info.description}}</p>
            </div>
            <div
              class="d-flex flex-row justify-content-between align-items-end pt-4"
            >
              <h6 class="d-inline pr-3">Want to change this info</h6>
              <a href="#" class="text-info">Contact Bryan</a>
            </div>
          </vuestic-widget>
        </div>
      </div>

      <table-widget
        headerText="Schedule"
        endpoint="classDescription/schedule.php"
        :parameters="{classDescriptionId: classId}"
      ></table-widget>
    </div>
  </div>
</template>
<script>
import TableWidget from '../elements/TableWidget.vue'
import CustomInput from '../elements/CustomInput.vue'
import Proxy from '@/proxies/Proxy'

export default {
  name: 'class',
  components: {
    TableWidget,
    CustomInput
  },
  data () {
    return {
      news: [
        {
          photoURL: 'https://i.imgur.com/PiTDDcA.png'
        },
        {
          photoURL: 'https://i.imgur.com/ZXRIHfk.png'
        },
        {
          photoURL: 'https://i.imgur.com/vEy3fRU.png'
        },
        {
          photoURL: 'https://i.imgur.com/Xrywphx.png'
        },
        {
          photoURL: 'https://i.imgur.com/dqVtQGY.png'
        },
        {
          photoURL: 'https://i.imgur.com/qP7rTCy.png'
        },
        {
          photoURL: 'https://i.imgur.com/6YLsM43.png'
        },
        {
          photoURL: 'https://i.imgur.com/9PAOx55.png'
        },
        {
          photoURL: 'https://i.imgur.com/mVpc04D.png'
        },
        {
          photoURL: 'https://i.imgur.com/WdbTSLn.png'
        },
        {
          photoURL: 'https://i.imgur.com/ZXRIHfk.png'
        }
      ],
      inputValue: 'input...',
      classId: this.$route.params.classId,
      leonInfo: null,
      instructors: null,
      generalInfo: null,
      isLoaded: false,
      isEdit: false,
      btnText: 'Edit',
      widgetHeaderText: ''
    }
  },
  created () {
    this.initalization()
  },
  methods: {
    async initalization () {
      this.isLoaded = false
      this.leonInfo = await this.getDatasFromEndpoint('classDescription/leonInfo.php', {classDescriptionId: this.classId})
      this.inputValue = await this.getDatasFromEndpoint('classDescription/price.php', {classDescriptionId: this.classId})
      this.generalInfo = await this.getDatasFromEndpoint('classDescription/generalInfo.php', {classDescriptionId: this.classId})
      this.isLoaded = true
    },
    onInputChange (val) {
      this.inputValue = val
    },
    async onClickEdit () {
      if (this.isEdit) {
        this.btnText = 'Edit'
        const data = this.$refs.widgetHeader.$data
        await this.getDatasFromEndpoint('classDescription/save/generalInfo.php', {
          name: data.editedHeaderText,
          description: this.generalInfo.description
        })
        this.generalInfo.name = data.editedHeaderText
      } else {
        this.btnText = 'Save'
      }
      this.isEdit = !this.isEdit
    },
    async getDatasFromEndpoint (url, params) {
      const {providerId, providerAccessToken} = this.$store.getters['auth/provider']
      try {
        const {success, error, ...data} = await new Proxy(url).submit('post', {
          providerId,
          providerAccessToken,
          ...params
        })
        if (success) {
          return Object.values(data).pop()
        } else {
          this.showToast(error)
        }
      } catch (err) {
        this.showToast()
      }
    },
    showToast (err = 'Oops, Please try again later.') {
      this.$store.dispatch('auth/notification', {
        type: 'ERROR',
        title: 'Parameter error',
        message: err
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.class-details {
  .widget.class-header-card {
    .widget-header {
      font-size: 2.2rem;
    }
  }

  .class-description {
    .widget {
      max-height: 96%;
      min-height: 96%;
    }
  }

  p {
    max-width: 800px;
  }

  .vuestic-data-table .vuetable-body tr td:nth-child(2) {
    color: inherit;
    cursor: inherit;
  }
  .vuestic-data-table .vuetable-body tr td:nth-child(2):hover {
    color: inherit;
  }
  .edit-content {
    width: 100%;
    height: 300px;
    font-family: "Nunito", sans-serif;
    font-size: 1rem;
    font-weight: 300;
    line-height: 1.5;
    color: #34495e;
    text-align: left;

    &:focus {
      outline: rgba(74, 227, 135, 0.5) auto 5px;
    }
  }
}
</style>
