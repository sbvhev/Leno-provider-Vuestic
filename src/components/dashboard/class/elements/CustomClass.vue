<template>
  <div class="class-container">
    <div class="d-flex flex-row justify-content-between">
      <h5>{{headerText}}</h5>
      <a v-if="canEdit" href="#" class="text-info" @click.prevent="onClickEdit">{{btnText}}</a>
    </div>
    <p v-if="!_contentText && !isEdit" class="no-info">No info yet</p>
    <p v-else-if="!isEdit">{{_contentText}}</p>
    <textarea v-if="isEdit" row="5" col="50" class="edit-content" v-model="_contentText"></textarea>
  </div>
</template>

<script>
import Proxy from '@/proxies/Proxy'
import Notification from '@/components/Notification'
export default {
  name: 'customClass',
  components: {
    Notification
  },
  props: {
    canEdit: {
      type: Boolean,
      default: true
    },
    headerText: {
      type: String,
      default: ''
    },
    contentText: {
      type: String,
      default: ''
    },
    infoId: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      title: null,
      description: null,
      btnText: 'Edit',
      _contentText: '',
      isEdit: false
    }
  },
  created () {
    this._contentText = this.contentText
  },
  methods: {
    async onClickEdit () {
      if (this.isEdit) {
        this.btnText = 'Edit'
        console.log('adfadsf', this._contentText)
        await this.getDatasFromEndpoint('classDescription/save/leonInfo.php', {
          infoId: this.infoId,
          description: this._contentText
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
          this.$store.dispatch('auth/notification', {
            type: 'SUCCESS',
            title: 'SUCCESS',
            message: 'SUCCESS!'
          })
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
.no-info {
  opacity: 0.25;
}
.class-container {
  padding: 20px;
  background-color: #EFF4F5;
  margin-bottom: 20px;
}
</style>
