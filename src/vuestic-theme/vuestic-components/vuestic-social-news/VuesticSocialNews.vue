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
        <label for="logo" class="btn btn-micro btn-primary">UPLOAD</label>
        <input type="file" name="logo" id="logo" style="visibility: hidden;" @change="onLogoChanged" accept="image/png,image/jpeg">
      </div>
      <div v-if="multiple" class="multiple-upload">
        <label for="photos" class="btn btn-micro btn-primary">UPLOAD</label>
        <input type="file" name="photos[]" id="photos" style="visibility: hidden;" @change="onFileChanged" accept="image/png,image/jpeg" multiple>
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
    methods: {
      onFileChanged(event) {
        var input = event.target;
        for(let i=0; i< input.files.length ; i++) {
          var reader = new FileReader();
          reader.onload = (e) => {
            this.photos.push(e.target.result);
          }
          reader.readAsDataURL(input.files[i]);
        }
      },
      onLogoChanged(event) {
        var input = event.target;
        if(input.files && input.files[0]) {
          var reader = new FileReader();
          reader.onload = (e) => {
            this.logo = e.target.result;
          }
          reader.readAsDataURL(input.files[0]);
        }
      },
      onClickImage(index) {
        this.highlighted = index
        console.log("index", index)
      }
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
