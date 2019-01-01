<template>
  <div class="profile-dropdown col nav-item dropdown navbar-dropdown" v-dropdown>
    <a class="nav-link dropdown-toggle" href="#">
      <span class="profile-section-avatar-container">{{providerName}}
      </span>
      <i class="i-vuestic-arrow"></i>
    </a>
    <div class="dropdown-menu last">
      <div class="dropdown-menu-content">
        <div v-for="(option, id) in options" :key="id"
          class="dropdown-item plain-link-item" @click="logout">
          <!-- <router-link :to="{name: option.redirectTo}" class="plain-link" href="#"> -->
            {{ `user.${option.name}` | translate}}
          <!-- </router-link> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'profile-section',

    props: {
      options: {
        type: Array,
        default: () => [
          {
            name: 'logout',
            redirectTo: 'login'
          }
        ]
      }
    },
    data () {
      return {
        providerName: ''
      }
    },
    created () {
      this.providerName = localStorage.getItem('providerName')
    },
    methods: {
      logout () {
        this.$store.dispatch('auth/logout')
      }
    }
  }
</script>

<style lang="scss">
  .profile-dropdown {
    a {
      color: white !important;
      font-family: 'Nunito', sans-serif;
      font-weight: bold;
      font-size: 17px;
    }

    .profile-section-avatar-container {
      display: inline-block;
      width: auto;
      overflow: hidden;
      color: black;

      img {
        height: 100%;
        width: 100%;
      }
    }

  }

</style>
