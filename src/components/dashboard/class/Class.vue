<template>
  <div class="class-container">
    <vuestic-pre-loader v-if="!isLoaded" class="pre-loader"></vuestic-pre-loader>
    <div class="class-details" v-if="isLoaded">
      <vuestic-widget class="class-header-card" ref="widgetHeader" :isEdit="isEdit" @onChangeHeader="onChangeHeader(val)" :headerText="generalInfo.name">
        <a href="#" class="text-info save-edit" @click.prevent="onClickEdit">{{btnText}}</a>
        <div class="d-flex flex-row justify-content-between length-div">
          <h5>Description</h5>
          <p class="length-show" v-if="isEdit">{{`${generalInfo.description.length}/500`}}</p>
        </div>
        <p v-if="!isEdit">{{generalInfo.description}}</p>
        <textarea row="5" col="50" class="edit-content" maxlength="500" v-model="generalInfo.description" @keydown="onKeyDown" v-else></textarea>
        <div class="d-flex flex-row justify-content-between align-items-end">
          <div>
            <h6 class="price-header">Drop-in Price Override:</h6>
            <p v-if="!price ? ((this.price === 0) ? true : false) : true" class="dollar-sign">$</p>
            <p v-if="!isEdit" class="price-content" v-bind:style=
            "{opacity: !price ? ((this.price === 0) ? 1 : 0.5) : 1}">{{!price ? ((this.price === 0) ? this.price : 'None') : this.price}}</p>
            <fieldset v-else>
              <div
                class="form-group with-icon-right"
                :class="{'has-error': errors.has('price')}"
              >
                <div class="input-group">
                  <input
                    name="price"
                    data-vv-as="price"
                    v-model="price"
                    placeholder="None"
                    @keydown="onPriceKeyDown"
                  >
                  <i class="bar"></i>
                </div>
              </div>
            </fieldset>
          </div>
          <div
            class="d-flex justify-content-center flex-row align-items-center flex-wrap"
          >
            <div class="font-weight-bold text-center mr-1">Show on LEON?</div>
            <div>
              <toggle-switch
                :locationIsOn="priceIsOn"
                @checkChange="onCheckChange"
              ></toggle-switch>
            </div>
          </div>
        </div>
      </vuestic-widget>

      <div class="row">
        <div class="col-md-6 col-12">
          <vuestic-widget class="business-posts multiple-upload p-2" :headerText="'Photos'">
            <vuestic-file-upload
                type="gallery"
                :file-types="'.png, .jpg, .jpeg, .gif'"
                v-model="photos"
                :multiple="true"
                :sort="'class'"
                :classId="classId"
            />
          </vuestic-widget>
          <table-widget headerText="Instructors" endpoint="classDescription/instructors.php" :parameters="{classDescriptionId: classId}"></table-widget>
        </div>
        <div class="col-md-6 col-12 class-description">
          <vuestic-widget class="leonInfo-div">
            <div class="d-flex flex-row justify-content-between">
              <h5>LEON Info</h5>
            </div>
            <p class="leonInfo-explanation">{{leonInfo.explanation}}</p>
            <div v-for="(info, index) in leonInfo.info" :key="index" class="pa-3">
              <custom-class :headerText="info.title" :contentText="info.description" :infoId="info.infoId" :canEdit="leonInfo.canEdit"></custom-class>
            </div>
            <div v-if="!leonInfo.canEdit" class="d-flex flex-row justify-content-between align-items-end pt-4 bottom-div-leoninfo">
              <h6 class="d-inline pr-3">Need an edit?</h6>
              <button href="#" class="btn btn-primary btn-micro">Contact us</button>
            </div>
          </vuestic-widget>
        </div>
      </div>

      <table-widget headerText="Schedule" endpoint="classDescription/schedule.php" :parameters="{classDescriptionId: classId}"></table-widget>
    </div>
  </div>
</template>
<script>
import TableWidget from '../elements/TableWidget.vue'
import CustomInput from '../elements/CustomInput.vue'
import CustomClass from './elements/CustomClass.vue'
import Notification from '@/components/Notification'
import ToggleSwitch from '../setup-profile-tab/elements/ToggleSwitch.vue'
import Proxy from '@/proxies/Proxy'

export default {
  name: 'class',
  components: {
    TableWidget,
    CustomInput,
    CustomClass,
    Notification,
    ToggleSwitch
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
      photos: [],
      inputValue: 'input...',
      classId: this.$route.params.classId,
      leonInfo: null,
      instructors: null,
      generalInfo: null,
      isLoaded: false,
      isEdit: false,
      btnText: 'Edit',
      widgetHeaderText: '',
      priceIsOn: false,
      localIsOn: this.priceIsOn,
      price: ''
    }
  },
  created () {
    this.initalization()
  },
  methods: {
    onPriceKeyDown (e) {
      if ((e.keyCode > 31 && (e.keyCode < 48 || e.keyCode > 57)) && e.keyCode !== 46) {
        e.preventDefault()
      }
    },
    async onCheckChange (e) {
      this.localIsOn = !this.localIsOn
      const data = this.$refs.widgetHeader.$data
      await this.getDatasFromEndpoint('classDescription/save/generalInfo.php', {
        name: data.editedHeaderText,
        description: this.generalInfo.description,
        showOnLeon: this.localIsOn,
        classDescriptionId: this.classId,
        overridePrice_cents: this.price
      })

      this.$store.dispatch('auth/notification', {
        type: 'SUCCESS',
        title: 'SUCCESS',
        message: 'SUCCESS!'
      })
    },
    onKeyDown (e) {
      if (e.key === 'Enter') {
        e.preventDefault()
      }
    },
    async initalization () {
      this.isLoaded = false
      this.leonInfo = await this.getDatasFromEndpoint('classDescription/leonInfo.php', {classDescriptionId: this.classId})
      this.generalInfo = await this.getDatasFromEndpoint('classDescription/generalInfo.php', {classDescriptionId: this.classId})
      this.priceIsOn = this.generalInfo.showOnLeon
      this.localIsOn = this.priceIsOn
      this.price = this.generalInfo.overridePrice_cents !== null ? this.generalInfo.overridePrice_cents / 100 : null
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
          description: this.generalInfo.description,
          classDescriptionId: this.classId,
          showOnLeon: this.localIsOn,
          overridePrice_cents: !this.price ? ((this.price === 0) ? 0 : null) : this.price * 100
        })

        this.$store.dispatch('auth/notification', {
          type: 'SUCCESS',
          title: 'SUCCESS',
          message: 'SUCCESS!'
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
        this.showToast(err)
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

  .multiple-upload {
    .widget-body {
      padding: 0 1.5625rem !important;
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

  .price-content {
    margin-left: 190px;
    margin-top: 13px;
  }

  .price-header {
    position: absolute;
    margin-top: 16px;
  }

  .with-icon-right {
    margin-bottom: 0px !important;
    margin-left: 190px;
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
    font-family: 'Nunito', sans-serif;
    font-size: 1rem;
    font-weight: 300;
    line-height: 1.5;
    color: #34495e;
    text-align: left;

    &:focus {
      outline: rgba(74, 227, 135, 0.5) auto 5px;
    }
  }
  .save-edit {
    position: absolute;
    right: 50px;
    top: 110px;
    @media only screen and (max-width: 768px) {
      top: 141px;
    }
  }

  .leonInfo-explanation {
    margin-bottom: 50px;
  }
  .bottom-div-leoninfo {
    position: absolute;
    bottom: 25px;
    width: 100%;
    padding: 1.5625rem;
    left: 0;
  }
  .dollar-sign {
    position: absolute;
    margin-left: 179px;
    margin-top: 13px;
  }
  .leonInfo-div {
    position: relative;
  }
  .length-show {
    padding-left: 20px;
  }
  .length-div {
    justify-content: flex-start !important;
  }
}
</style>
