<template>
  <div v-if="isLoaded" class="row bottom-widgets">
    <div class="col-md-6 d-flex">
      <vuestic-widget class="no-h-padding no-v-padding">
        <vuestic-feed :initialPosts="posts"></vuestic-feed>
      </vuestic-widget>
    </div>
    <div class="col-md-6 d-flex">
      <vuestic-widget class="business-posts p-2">
        <vuestic-social-news
          class="vuestic-social-news"
          :news="news"
          :url="'http://instagram.com/smartapant'"
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
        const { error, feed } = await new Proxy('getFeed.php?').submit('post', {
          providerId,
          providerAccessToken
        })

        if (error) {
          this.posts = []
          this.showToast()
        } else {
          this.posts = feed.splice(0, 3)
          this.isLoaded = true
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
</style>
