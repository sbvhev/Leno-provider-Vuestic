<template>
  <div class="vuestic-file-upload"
       :class="{'vuestic-file-upload--dropzone': dropzone}"
  >
    <vuestic-file-upload-container
        :type="type"
        :fileTypes="fileTypes"
        :dropzone="dropzone"
        @upload="uploadFile"
    >
      <vuestic-file-upload-list
          v-if="files.length"
          :type="type"
          :files="files"
          :multiple="multiple"
          :sort="sort"
          @remove="removeFile"
          @feature="selectFile"
          @remove-single="removeSingleFile"
      />
    </vuestic-file-upload-container>
  </div>
</template>

<script>
  import VuesticFileUploadList from './VuesticFileUploadList'
  import VuesticFileUploadContainer from './VuesticFileUploadContainer'
  import Proxy from '@/proxies/Proxy'

  export default {
    name: 'vuestic-file-upload',
    components: {
      VuesticFileUploadList: VuesticFileUploadList,
      VuesticFileUploadContainer: VuesticFileUploadContainer
    },
    props: {
      type: {
        type: String,
        default: 'list',
        validator: function (value) {
          return ['list', 'gallery', 'single'].indexOf(value) !== -1
        }
      },
      fileTypes: {
        type: String,
        default: function () {
          return this.type === 'gallery' ? '.png, .jpg, .jpeg, .gif' : ''
        }
      },
      dropzone: {
        type: Boolean,
        default: false
      },
      value: {
        default: () => []
      },
      multiple: {
        type: Boolean,
        default: false
      },
      sort: {
        type: String,
        default: 'studio'
      }
    },
    async created() {
      const _photos = await this.getDatasFromEndpoint(this.multiple ? 'photos.php' : 'logo.php', this.multiple ? {featureType: this.sort} : {})
      if(this.multiple) {
        _photos && _photos.map((photo) => {this.files.push(photo)})
      } else {
        this.files.push(_photos)
      }
      this.sorttype = this.sort
    },
    methods: {
      uploadFile (e) {
        let files = e.target.files || e.dataTransfer.files
        let self = this

        Promise.all([].map.call(files, function (file) {
          return new Promise((resolve, reject) => {
            if( /\.(jpe?g|png|gif)$/i.test(file.name)) {
              let reader = new FileReader()
              reader.addEventListener('load', function (e) {
                resolve(this.result)
              })
              reader.readAsDataURL(file)
            }
          })
        })).then(async (results) => {
            await self.getDatasFromEndpoint(self.multiple ? 'photos/upload.php': 'logo/upload.php', self.multiple ? {
               photos: results
            } : { logo: results[0] })
            self.$store.dispatch('auth/notification', {
              type: 'SUCCESS',
              title: 'SUCCESS',
              message: 'SUCCESS!'
            })
            const _photos = await self.getDatasFromEndpoint(self.multiple ? 'photos.php' : 'logo.php', self.multiple ? {featureType: this.sort} : {})
            if(self.multiple) {
              self.files = _photos
            } else {
              self.files = [_photos]
            }
        })

        // type validation
        if (this.fileTypes) {
          files = this.validateFileTypes(files)
        }
      },
      removeFile (index) {
        this.files.splice(index, 1)
      },
      selectFile (_index) {
        this.files = this.files.map((a, index) => {
          if(index == _index) 
            a.isFeatured = true; 
          else a.isFeatured = false;
           return a})
        console.log("this.files: ", this.files)
      },
      removeSingleFile () {
        this.files = []
      },
      validateFileTypes (files) {
        return [...files].filter(file => {
          const fileName = file.name
          const extn = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase()
          return this.fileTypes.indexOf(extn) !== -1
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
            return Object.values(data).pop()
          } else {
            this.showToast(error)
          }
        } catch (err) {
          this.showToast()
        }
      },
    },
    computed: {
      files: {
        get () {
          return this.value
        },
        set (files) {
          this.$emit('input', files)
        },
      },
    },
  }
</script>

<style lang='scss'>
  @import '../../../sass/_variables.scss';

  .vuestic-file-upload {
    &--dropzone {
      background-color: $lighter-green;
      padding: 0 2rem;
      overflow: hidden;
    }
  }

  // Maybe we should create new component for text button
  .btn-text {
    border: none;
    background: none;
    outline: none;
    cursor: pointer;
    padding: 0;

    &--primary {
      color: $vue-green;
      &:hover {
        opacity: 0.6;
      }
    }
    &--secondary {
      color: $white;
    }
  }

  @media (max-width: 576px) {
    .vuestic-file-upload {
      &--dropzone {
        padding: 0 1rem;
      }
    }
  }
</style>
