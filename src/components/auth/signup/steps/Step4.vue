<template>
  <div class="row">
    <div class="col-md-12">
      <fieldset>
        <h6><span class="badge badge-pill badge-success">Free</span>NO SERVICE CHARGE</h6>
        <vuestic-radio-button label="$100/mo" :id="'radio1'" :value="'100'" :name="'radio'" v-model="planChoice" />
        <vuestic-radio-button label="$50/mo" :id="'radio2'" :value="'50'" :name="'radio'" v-model="planChoice" />
        <vuestic-radio-button label="$25/mo" :id="'radio3'" :value="'25'" :name="'radio'" v-model="planChoice" />
      </fieldset>
      <fieldset>
        <h6><span class="badge badge-pill badge-success">$50/mo</span>SERVICE CHARGE</h6>
        <vuestic-radio-button label="No stipend" :id="'radio4'" :value="'0'" :name="'radio'" v-model="planChoice" />
      </fieldset>
    </div>
  </div>
</template>

<script>

export default {
  name: 'step4',
  data () {
    return {
      planChoice: this.$store.getters['account/myself'].planChoice,
    }
  },
  methods: {
    completedData () {
      return this.$data
    }
  }
}
</script>
<style lang="scss" scoped>

.badge {
  font-size: 1.225rem;
  letter-spacing: 0.125rem;
  margin: 21px;
}

.abc-radio {
  margin-bottom: 11.5%;
  padding-left: 80px;
}
</style>
