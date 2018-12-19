<template>
  <div v-if="isLoaded" class="row bottom-widgets">
    <div class="col-md-6 d-flex">
      <vuestic-widget class="no-h-padding no-v-padding vuestic-activity-feed" :headerText="'Activity Feed'">
        <vuestic-feed :initialPosts="posts"></vuestic-feed>
      </vuestic-widget>
    </div>
    <div class="col-md-6 d-flex photo-upload">
      <vuestic-widget class="business-posts single-upload p-2" :headerText="'Logo'">
        <vuestic-social-news
          class="vuestic-social-news"
          :news="news"
          :btnText="'UPLOAD'"
          :multiple="false"
        ></vuestic-social-news>
      </vuestic-widget>
      <vuestic-widget class="business-posts multiple-upload p-2" :headerText="'Photos'">
        <vuestic-social-news
          class="vuestic-social-news"
          :news="news"
          :btnText="'UPLOAD'"
          :multiple="true"
        ></vuestic-social-news>
      </vuestic-widget>
    </div>
  </div>
</template>

<script>
import Proxy from '@/proxies/Proxy'

export default {
  name: 'dashboard-bottom-widgets',
  created () {
    this.initalization()
  },
  data () {
    return {
      posts: [],
      isLoaded: false,
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
    max-height: 600px;
    overflow-y: scroll;
    margin: 5px;
  }
}
/deep/.single-upload {
  height: 180px;
}
.multiple-upload {
  height: 457px;
}
</style>
