<template>
  <div class="col-xl-3 col-lg-3 col-sm-4" v-if="removed">
    <div class="file-upload-gallery-item">
      <vuestic-file-upload-undo
        class="file-upload-gallery-item-undo"
        @recover="recoverImage"
      />
    </div>
  </div>

  <div class="col-xl-3 col-lg-3 col-sm-4" v-else>
    <div class="file-upload-gallery-item">
      <img :src="file.image.imageSrc" alt="" class="file-upload-gallery-item-image">
        <div class="file-upload-gallery-item-overlay">
          <button v-if="multiple" type="button"
                  class="btn-text btn-text--secondary file-upload-gallery-item-button"
                  @click="selectImage">
            {{ $t('fileUpload.selectFile') }}
          </button>
          <button v-if="multiple" type="button"
                  class="btn-text btn-text--secondary file-upload-gallery-item-button"
                  @click="removeImage">
            {{ $t('fileUpload.deleteFile') }}
          </button>
        </div>
    </div>
  </div>
</template>

<script>
  import VuesticFileUploadUndo from './VuesticFileUploadUndo'
  import Proxy from '@/proxies/Proxy'

  export default {
    name: 'vuestic-file-upload-gallery-item',
    components: {
      VuesticFileUploadUndo: VuesticFileUploadUndo
    },
    data () {
      return {
        previewImage: '',
        removed: false
      }
    },
    props: {
      file: {
        default: {}
      },
      multiple: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      file () {
      }
    },
    methods: {
      async removeImage () {
        this.removed = true
        
        await this.getDatasFromEndpoint('photo/remove.php', {imageKey: this.file.image.imageKey})

        setTimeout(() => {
          if (this.removed) {
            this.$emit('remove')
            this.removed = false
          }
        }, 2000)
      },
      async selectImage () {
        await this.getDatasFromEndpoint('photo/feature.php', {imageKey: this.file.image.imageKey, featureType: 'studio'})
      },
      recoverImage () {
        this.removed = false
      },
      showToast (type, title, message) {
        this.$store.dispatch('auth/notification', {
          type,
          title,
          message
        })
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
            this.showToast('SUCCESS', 'SUCCESS', 'SUCCESS')
            return Object.values(data).pop()
          } else {
            this.showToast('ERROR', err, err)
          }
        } catch (err) {
          this.showToast()
        }
      },
    },
    mounted () {
      console.log('file: ', this.file)
    },
  }
</script>

<style lang='scss'>
  @import '../../../sass/_variables.scss';
  .multiple-upload {
    img {
      opacity: 0.25;
    }
  }

  .file-upload-gallery-item {
    position: relative;
    width: 100%;
    padding-top: 100%;
    margin-bottom: 1rem;
    &:hover {
      .file-upload-gallery-item-overlay {
        display: flex;
      }
    }
    &-overlay {
      display: none;
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      flex-direction: column;
      padding: 0.5rem;
      background: rgba($vue-green, 0.8);
      z-index: 1;
    }
    &-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: scale-down;
    }
    &-name {
      color: $vue-darkest-blue;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &-size {
      color: $vue-darkest-blue;
    }
    &-button {
      margin-top: auto;
      text-align: left;
    }
    &-undo {
      position: absolute;
      top: 0;
      left: 0;
      padding: 0.7rem 0 0;
    }
  }
</style>
