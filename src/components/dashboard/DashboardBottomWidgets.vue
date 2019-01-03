<template>
  <div v-if="isLoaded" class="row bottom-widgets">
    <div class="col-md-6 d-flex">
      <vuestic-widget class="no-h-padding no-v-padding vuestic-activity-feed" :headerText="'Activity Feed'">
        <vuestic-feed :initialPosts="posts"></vuestic-feed>
      </vuestic-widget>
    </div>
    <div class="col-md-6 d-flex photo-upload">
       <vuestic-widget class="business-posts single-upload p-2" :headerText="'Logo'">
          <vuestic-file-upload
              type="gallery"
              :file-types="'.png, .jpg, .jpeg, .gif'"
              v-model="logo"
              :multiple="false"
              :sort="'studio'"
          />
        </vuestic-widget>
       <vuestic-widget class="business-posts multiple-upload p-2" :headerText="'Photos'">
          <vuestic-file-upload
              type="gallery"
              :file-types="'.png, .jpg, .jpeg, .gif'"
              v-model="photos"
              :multiple="true"
              :sort="'studio'"
          />
        </vuestic-widget>
        <vuestic-widget class="class-header-card p-2" :headerText="'Studio Bio'">
          <div class="d-flex flex-row justify-content-between">
            <p class="length-show" v-if="isEdit">{{`${providerDescription.length}/500`}}</p>
            <a href="#" class="text-info save-edit" @click.prevent="onClickEdit">{{btnText}}</a>
          </div>
          <p class="pt-3 no-bio" v-if="!providerDescription && !isEdit">No bio</p>
          <p class="pt-3 bio" v-else-if="!isEdit">{{providerDescription}}</p>
          <textarea class="edit-content"   maxlength="500" v-model="providerDescription" v-if="isEdit" @keydown="onKeyDown"></textarea>
        </vuestic-widget>
    </div>
  </div>
</template>

<script>
import Proxy from '@/proxies/Proxy'

export default {
  name: 'dashboard-bottom-widgets',
  async created () {
    let providerDescription = await this.getDatasFromEndpoint('studioInfo.php', {})
    await this.initalization()
    this.providerDescription = providerDescription
  },
  data () {
    return {
      posts: [],
      isLoaded: false,
      logo: [],
      photos: [],
      isEdit: false,
      btnText: 'Edit',
      providerDescription: '',
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
      ]
    }
  },
  methods: {
    onKeyDown (e) {
      if (e.key === 'Enter') {
        e.preventDefault()
      }
    },
    async initalization () {
      const {providerId, providerAccessToken} = this.$store.getters['auth/provider']
      try {
        const { success, feed } = await new Proxy('getFeed.php?').submit('post', {
          providerId,
          providerAccessToken
        })

        if (success) {
          this.posts = feed.splice(0, 100)
          this.isLoaded = true
        } else {
          this.posts = []
          this.showToast()
        }
      } catch (error) {
        this.showToast()
      }
    },
    async onClickEdit () {
      if (this.isEdit) {
        this.btnText = 'Edit'
        await this.getDatasFromEndpoint('saveStudioInfo.php', {
          providerDescription: this.providerDescription
        })
        this.$store.dispatch('auth/notification', {
          type: 'SUCCESS',
          title: 'SUCCESS',
          message: 'SUCCESS!'
        })
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
    showToast () {
      this.$store.dispatch('auth/notification', {
        type: 'ERROR',
        title: 'DashboardBottomWidgets',
        message: 'Oops, Please try again later.'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.bottom-widgets {
  > div[class^='col'] {
    & > div {
      width: 100%;
    }
  }
}
.photo-upload {
  display: flex;
  flex-direction: column;
}
::-webkit-scrollbar-track {
  background-color: red;
  border-radius: 5px;
}
/deep/.vuestic-activity-feed {
  .widget-body {
    max-height: 900px;
    overflow-y: scroll;
    margin: 5px;
  }
}
/deep/.single-upload {
  height: 250px;
}
/deep/.multiple-upload {
  height: 387px;
  .vuestic-file-upload-main {
    overflow-y: scroll;
    overflow-x: hidden;
    max-height: 305px;
  }
}
.save-edit {
  margin-top: -42px;
}
.length-show {
  margin-top: -42px;
  padding-right: 20px;
}
.edit-content {
  width: 100%;
  height: 200px;
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
.display-content {
  width: 100%;
  height: 200px;
  font-family: 'Nunito', sans-serif;
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.5;
  color: #34495e;
  text-align: left;
  border: 0;

  &:focus {
    outline: 0;
  }
}
/deep/.bottom-widgets {
  .widget-body {
    padding: 0 1.5625rem !important;
    .d-flex {
      justify-content: flex-end !important;
    }
  }
}
.no-bio {
  opacity: 0.5;
  min-height: 180px;
}
.bio {
  min-height: 180px;
}
</style>
