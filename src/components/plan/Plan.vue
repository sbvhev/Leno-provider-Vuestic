<template>
  <div class="row">
    <div class="col-md-12">
      <vuestic-pre-loader v-show="isLoading" class="pre-loader"></vuestic-pre-loader>
      <vuestic-widget
        class="chart-widget"
        :headerText="'Plan Update' | translate"
      >
        <div class="row d-flex justify-center-center">
          <div class="col-md-4"></div>
          <div class="col-md-4">
            <Plan ref="updatePlan"></Plan>
          </div>
          <div class="col-md-4"></div>
        </div>
        <div class="row">
          <div class="col-md-3"></div>
          <div class="col-md-3">
            <button class="btn btn-warning" @click="handleCancel">Cancel</button>
          </div>
          <div class="col-md-3">
            <button class="btn btn-primary" @click="hanldeUpdate">Update</button>
          </div>
          <div class="col-md-3"></div>
        </div>
      </vuestic-widget>
    </div>
  </div>
</template>

<script>
import Plan from '../dashboard/setup-profile-tab/steps/Step4'
import Proxy from '@/proxies/Proxy'

export default {
  name: 'plan',
  components: {
    Plan,
  },
  data: function () {
    return {
      me: this.$store.getters['account/myself'],
      beforePlanChoice: '',
      isLoading: false
    }
  },
  mounted () {
    this.beforePlanChoice = this.me.planChoice
  },
  methods: {
    handleCancel () {
      this.isLoading = true
      const that = this.$refs.updatePlan
      that.$data.planChoice = this.beforePlanChoice

      this.updateApi(this.beforePlanChoice)
    },
    hanldeUpdate () {
      this.isLoading = true
      const that = this.$refs.updatePlan
      const { planChoice } = that.$data
      this.updateApi(planChoice)
      this.beforePlanChoice = this.me.planChoice
    },
    async updateApi (value) {
      const { userId, accessToken } = this.me
      try {
        const { error } = await new Proxy('updatePlan.php?', {
          userId,
          accessToken,
          planChoice: value
        }).submit('post')
        if (error) {
          this.$store.dispatch('auth/notification', {
            type: 'ERROR',
            title: 'SERVER ERROR',
            message: 'Oops, Please try again later.'
          })
        } else {
          await this.$store.dispatch('account/me', {
            userId,
            accessToken
          })
          this.$store.dispatch('auth/notification', {
            type: 'SUCCESS',
            title: 'UPDATE SUCCESS',
            message: 'Plan updated successfully.'
          })
        }
        this.isLoading = false
      } catch (error) {
        this.$store.dispatch('auth/notification', {
          type: 'ERROR',
          title: 'SERVER ERROR',
          message: 'Oops, Please try again later.'
        })
        this.isLoading = false
      }
    }
  }
}
</script>

<style lang="scss">
.widget.chart-widget {
  .widget-body {
    height: 550px;
  }
}
.badge {
  font-size: 1.225rem;
  letter-spacing: 0.125rem;
  margin: 21px;
}

.abc-radio {
  margin-bottom: 8.5% !important;
  padding-left: 80px;
}
</style>
