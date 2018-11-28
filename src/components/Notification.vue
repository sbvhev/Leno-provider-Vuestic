<template>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      notificationInfo: 'auth/notificationInfo'
    })
  },
  watch: {
    notificationInfo: function (newVal, oldVal) {
      switch (newVal.type) {
        case 'ERROR':
          this.$toast.error({
            title: newVal.title,
            message: newVal.message
          })
          break
        case 'SUCCESS':
          this.$toast.success({
            title: newVal.title,
            message: newVal.message
          })
          break
        case 'INFO':
          this.$toast.info({
            title: newVal.title,
            message: newVal.message
          })
          break
      }
    }
  }
}
</script>
