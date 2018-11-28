<template>
  <div class="auth-layout">
    <div :class="['nav', {'d-lg-none': authKind === 'login'}]">
      <router-link
        class="i-vuestic"
        :to="{path: '/'}"
      ></router-link>
    </div>
    <div :class="['main row', {'height-90': authKind === 'signup'}]">
      <div :class="['auth-content col-lg-6 col-12', {'col-lg-12': authKind === 'signup'}]">
        <router-view></router-view>
      </div>
      <div :class="['auth-wallpaper col-6 d-none', authKind === 'signup' ? 'd-lg-none': 'd-lg-flex']">
        <div class="oblique"></div>
        <router-link
          class="i-vuestic"
          :to="{path: '/'}"
        ></router-link>
      </div>
    </div>
  </div>
</template>

<script>

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
  }
}
</script>

<style lang="scss">
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
      background-color: $top-nav-bg;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      .i-vuestic {
        z-index: 2;
        height: $auth-wallpaper-ivuestic-h;
        width: 100%;
      }
      .oblique {
        position: absolute;
        background-color: $auth-wallpaper-oblique-line;
        left: calc(50% - 27% / 2);
        transform: rotate(15deg);
        width: 27%;
        height: 115%;
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
