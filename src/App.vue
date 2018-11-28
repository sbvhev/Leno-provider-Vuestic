<template>
  <div id="app" class="app">
    <router-view />
    <Notification></Notification>
  </div>
</template>

<script>
import Notification from '@/components/Notification'

export default {
  name: 'app',
  components: {
    Notification: Notification
  }
}
</script>

<style lang="scss">
@import "sass/main";

body {
  height: 100%;
  #app {
    height: 100%;
  }
}
</style>
