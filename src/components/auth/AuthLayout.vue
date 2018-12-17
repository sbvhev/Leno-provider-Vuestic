<template>
  <div class="auth-layout">
    <div class="nav d-lg-none">
      <router-link :to="{path: '/'}"></router-link>
    </div>
    <div class="main row">
      <div class="auth-content col-lg-6 col-12">
        <router-view></router-view>
      </div>
      <div class="auth-wallpaper col-6 d-none d-lg-flex">
        <!-- <div class="i-vuestic-back"></div> -->
        <canvas id="leonSketch"></canvas>
        <router-link class="i-vuestic" :to="{path: '/'}"></router-link>
      </div>
    </div>
  </div>
</template>
<script>

import leonSketch from './leonSketch'

export default {
  name: 'AuthLayout',
  data () {
    return {
      authKind: this.$route.name
    }
  },
  watch: {
    $route (to, from) {
      this.authKind = to.name
    }
  },
  mounted () {
    leonSketch()
  }
}
</script>

<style lang="scss">
canvas {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
}

.auth-layout {
  height: 100vh;
  margin: 0;
  .nav {
    display: flex;
    align-items: center;
    justify-content: center;
    height: $top-mobile-nav-height;
    background-color: $top-nav-bg;
    .i-vuestic {
      height: $auth-mobile-nav-ivuestic-h;
      width: 100%;
    }
  }
  .main {
    margin: 0;
    height: 100%;
    &.height-90 {
      height: 90%;
    }
    .auth-content {
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: white;
    }
    .auth-wallpaper {
      background: linear-gradient(to bottom right, #7FE3FF, #00577F);
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      .i-vuestic {
        z-index: 2;
        height: $auth-wallpaper-ivuestic-h;
        width: 100%;
      }
    }
  }

  @include media-breakpoint-down(md) {
    .main {
      height: $auth-mobile-main-h;
      .auth-content {
        align-items: flex-start;
        padding-top: $auth-content-padding-t;
      }
    }
  }
}
</style>
