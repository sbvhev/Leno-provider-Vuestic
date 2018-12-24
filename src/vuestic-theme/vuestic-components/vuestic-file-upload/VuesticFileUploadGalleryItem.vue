<template>
  <div class="col-xl-4 col-lg-4 col-sm-5 photo-gallery">
    <div class="file-upload-gallery-item">
      <img :src="file.image.imageSrc" alt="" class="file-upload-gallery-item-image" v-bind:style="{opacity: multiple ? (featured ? 1 : 0.25) : 1}">
        <div v-bind:class="{ 'file-upload-gallery-item-overlay': multiple}">
          <button v-if="multiple" type="button"
                  class="btn-text btn-text--secondary file-upload-gallery-item-button set-as-main-studio-file"
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
  import Proxy from '@/proxies/Proxy'

  export default {
    name: 'vuestic-file-upload-gallery-item',
    components: {
    },
    data () {
      return {
        previewImage: '',
        removed: false,
        featured: this.file.image.isFeatured
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
        this.featured = this.file.image.isFeatured
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
        this.featured = true

        setTimeout(() => {
          if (this.featured) {
            this.$emit('feature')
            this.featured = true
          }
        }, 1000)
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

  .photo-gallery {
    max-width: 160px;
    height: 160px;
    font-size: 12px;
    
    button {
      text-decoration: underline;
    }
    .set-as-main-studio-file {
      font-weight: bold;
      margin-top: 0px;
    }
  }

  .file-upload-gallery-item {
    position: relative;
    width: 100%;
    padding-top: 100%;
    margin-bottom: 1rem;
    border: 1px solid lightgray;
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
