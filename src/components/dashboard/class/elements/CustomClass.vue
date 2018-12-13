<template>
  <div class="class-container">
    <div class="d-flex flex-row justify-content-between">
      <h5>{{headerText}}</h5>
      <a v-if="canEdit" href="#" class="text-info" @click.prevent="onClickEdit">{{btnText}}</a>
    </div>
    <p v-if="!_contentText" class="no-info">No info yet</p>
    <p v-else-if="!isEdit">{{_contentText}}</p>
    <textarea v-else row="5" col="50" class="edit-content" v-model="_contentText"></textarea>
  </div>
</template>

<script>
export default {
  name: 'customClass',
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
        await this.getDatasFromEndpoint('classDescription/save/leonInfo.php', {
          infoId: this.infoId,
          description: this._contentText
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
  }
}
</script>

<style lang="scss" scoped>
.no-info {
  opacity: 0.25;
}
</style>
