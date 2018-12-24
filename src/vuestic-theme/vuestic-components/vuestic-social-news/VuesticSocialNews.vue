<template>
  <div class="vuestic-social-news">
    <div class="d-flex justify-content-between align-items-center text-w-btn">
      <div v-if="multiple" class="d-flex justify-content-between align-items-center vuestic-description">
        <span
          class="text"
        >Highlighted photo is your primary studio photo:</span>
        <a href="#" class="text-info">Edit</a>
      </div>

      <div v-if="!multiple" class="single-upload">
        <form>
          <label for="logo" class="btn btn-micro btn-primary">UPLOAD</label>
          <input type="file" name="logo" id="logo" style="visibility: hidden;" @change.prevent="onLogoChanged" accept="image/png,image/jpeg">
          <input type="hidden" name="provider" id="provider"/>
        </form>
      </div>
      <div v-if="multiple" class="multiple-upload">
        <label for="photos" class="btn btn-micro btn-primary">UPLOAD</label>
        <input type="file" name="photos[]" id="photos" style="visibility: hidden;" @change.prevent="onFileChanged" accept="image/png,image/jpeg" multiple>
      </div>
    </div>
    <div class="d-flex flex-row justify-content-around photos" v-if="!multiple">
      <div class="logo" v-if="logo.length > 0">
        <img :src="logo" class="highlighted">
      </div>
    </div>
    <div class="d-flex flex-row justify-content-around photos" v-else>
      <div class="photo" v-if="photos.length > 0" v-for="(photo, idx) in photos">
        <img :class="{'highlighted': idx == highlighted}" :src="photo" @click.prevent="onClickImage(idx)">
      </div>
    </div>

  </div>
</template>

<script>
import Proxy from '@/proxies/Proxy'

  export default {
    name: 'vuestic-social-news',
    props: {
      news: {
        type: Array
      },
      url: {
        type: String
      },
      btnText: {
        type: String,
        default: 'UPLOAD'
      },
      headerText: {
        type: String
      },
      multiple: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        photos: [],
        logo: "",
        highlighted: 0
      }
    },
    async created() {
      const {imageKey, imageSrc} = await this.getDatasFromEndpoint('logo.php', {})
      const _photos = await this.getDatasFromEndpoint('photos.php', {})
      _photos && _photos.map(({imageSrc}) => {this.photos.push(imageSrc)})
      this.logo = imageSrc
    },
    methods: {
      async onFileChanged(event) {
        let input = event.target
        let self = this

        Promise.all([].map.call(input.files, function (file) {
          return new Promise((resolve, reject) => {
            if( /\.(jpe?g|png|gif)$/i.test(file.name)) {
              let reader = new FileReader()
              reader.addEventListener('load', function (e) {
                resolve(this.result)
              })
              reader.readAsDataURL(file)
            }
          })
        })).then((results) => {
            self.getDatasFromEndpoint('photos/upload.php', {
              photos: results
            })
            self.$store.dispatch('auth/notification', {
              type: 'SUCCESS',
              title: 'SUCCESS',
              message: 'SUCCESS!'
            })
            self.photos = self.photos.concat(results) 
        })
        event.preventDefault();
      },
      onLogoChanged(event) {
        let input = event.target;
        if(input.files && input.files[0]) {
          let reader = new FileReader()
          reader.onload = async (e) => {
            this.logo = e.target.result
            await this.getDatasFromEndpoint('logo/upload.php', {
              logo: encodeURIComponent(this.logo)
            })
            this.$store.dispatch('auth/notification', {
              type: 'SUCCESS',
              title: 'SUCCESS',
              message: 'SUCCESS!'
            })
          }
          reader.readAsDataURL(input.files[0]);
        }
        event.preventDefault();
      },
      onClickImage(index) {
        this.highlighted = index
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

<style lang="scss">
.business-posts .widget-body {
  padding-left: 2rem;
  padding-right: 0;
  position: relative;
  .text-w-btn {
    padding-right: 1.3rem;
    padding-bottom: 1.5rem;
    overflow: hidden;
    .text {
      font-size: $font-size-base;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .btn {
      margin-left: 1rem;
      line-height: 1; //TODO: review btn styles
    }
  }
  .text-info {
    margin-right: 10px;
  }
  .photos {
    padding-right: 2rem;
    flex-wrap: wrap;
    overflow: hidden;
    display: inline-block !important;
    margin-left: 20px;
    .photo {
      background-size: cover !important;
      width: 80px;
      height: 80px;
      margin-right: 10px;
      margin-bottom: 10px;
      float: left;
      img {
        width: 100%;
        height: 100%;
        opacity: 0.3;
      }
      .highlighted {
        opacity: 1;
      }
    }
    .logo {
      background-size: cover !important;
      width: 80px;
      height: 80px;
      margin-right: 10px;
      margin-bottom: 10px;
      float: left;
      img {
        width: 100%;
        height: 100%;
        opacity: 0.3;
      }
      .highlighted {
        opacity: 1;
      }
    }
  }
  .single-upload {
    position: absolute;
    top: -45px;
    right: -300px;
  }
  .multiple-upload {
    position: absolute;
    top: -45px;
    right: -300px;
  }
  .vuestic-description {
    margin-top: 20px;
    margin-left: 20px;
    width: 100%;
  }
}
</style>
