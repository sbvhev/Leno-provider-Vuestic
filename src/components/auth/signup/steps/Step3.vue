<template>
  <form class="register-form step3">
    <div class="row">
      <div class="col-sm-12 text-right">
        <vuestic-accordion>
          <vuestic-collapse
            v-for="(pricing, index) in thisPricings"
            :key="index"
            :value="index === expandIndex"
          >
            <span slot="header">{{pricing.title}}</span>
            <div slot="body">
              <div class="row pt-2">
                <div class="col-sm-12">
                  <div
                    class="d-flex justify-content-sm-end flex-row align-items-center flex-wrap"
                  >
                    <div
                      class="font-weight-bold text-center mr-1 show-leon font-weight-bold"
                    >Show on LEON?</div>
                    <div>
                      <toggle-switch :locationIsOn="pricing.isOn"></toggle-switch>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row justify-center align-center mt-2">
                <div class="col-md-6">
                  <vuestic-widget class="info-widget">
                    <div
                      class="table-header pt-3 d-flex flex-row flex-wrap justify-content-between align-content-center border-bottom-2"
                    >
                      <div class="location pr-3">
                        <div class="location-title">
                          <h5>Classname</h5>
                        </div>
                      </div>
                      <div
                        class="d-flex justify-content-center flex-row align-items-center flex-wrap"
                      >
                        <div class="font-weight-bold text-center mr-1">
                          <h5>30 day count</h5>
                        </div>
                      </div>
                    </div>
                    <div
                      class="py-0 row table-body"
                      v-for="ele in pricing.classes"
                      :key="ele.id"
                    >
                      <div
                        class="col-10 text-left widget-element pl-1"
                      >{{ele.name}}</div>
                      <div
                        class="col-2 text-right widget-element pr-1"
                      >{{ele.count}}</div>
                    </div>
                  </vuestic-widget>
                </div>
                <div class="col-md-6">
                  <vuestic-widget class="info-widget">
                    <div
                      class="table-header pt-3 d-flex flex-row flex-wrap justify-content-between align-content-center border-bottom-2"
                    >
                      <div class="location pr-3">
                        <div class="location-title">
                          <h5>Payment Options</h5>
                        </div>
                      </div>
                      <div
                        class="d-flex justify-content-center flex-row align-items-center flex-wrap"
                      >
                        <div class="font-weight-bold text-center mr-1">
                          <h5>Price</h5>
                        </div>
                      </div>
                    </div>
                    <div class="table-body">
                      <div class="py-3 row">
                        <div class="col-8 text-left widget-element pl-1">
                          <b>Single Class</b>
                        </div>
                        <div class="col-4 text-right widget-element input">
                          $
                          <input
                            type="number"
                            align="right"
                            class="h-100"
                            v-model="pricing.options[0].price_cents"
                          >
                        </div>
                      </div>
                      <div class="pt-3 pb-1 row">
                        <div class="col-8 text-left widget-element pl-1">
                          <b>5-pack</b>
                        </div>
                        <div class="col-4 text-right widget-element input">
                          $
                          <input
                            type="number"
                            align="right"
                            class="h-100"
                            :value="pricing.options[1].price_cents"
                          >
                        </div>
                      </div>
                      <div class="pt-1 pb-3 row">
                        <div class="col-8 text-left widget-element pl-1">
                          <b>10-pack</b>
                        </div>
                        <div class="col-4 text-right widget-element input">
                          $
                          <input
                            type="number"
                            align="right"
                            class="h-100"
                            :value="pricing.options[2].price_cents"
                          >
                        </div>
                      </div>
                      <div class="pt-3 pb-1 row">
                        <div class="col-8 text-left widget-element pl-1">
                          <b>Monthly membership</b>
                        </div>
                        <div class="col-4 text-right widget-element input">
                          $
                          <input
                            type="number"
                            align="right"
                            class="h-100"
                            :value="pricing.options[3].price_cents"
                          >
                        </div>
                      </div>
                      <div class="pt-1 pb-3 row">
                        <div class="col-8 text-left widget-element pl-1">
                          <b>max classes per month</b>
                        </div>
                        <div class="col-4 text-right widget-element input">
                          $
                          <input
                            type="number"
                            align="right"
                            class="h-100"
                            :value="pricing.options[4].classes"
                          >
                        </div>
                      </div>
                      <div class="py-3 row">
                        <div class="col-8 text-left widget-element pl-1">
                          <b>introductory rate</b>
                        </div>
                        <div class="col-4 text-right widget-element input">
                          $
                          <input
                            type="number"
                            align="right"
                            class="h-100"
                            :value="pricing.options[5].price_cents"
                            v-model="ddsd"
                          >
                        </div>
                      </div>
                    </div>
                  </vuestic-widget>
                </div>
              </div>
              <div
                class="d-flex flex-row justify-content-center align-content-center pt-2 pb-4"
              >
                <button
                  class="btn btn-info"
                  @click="nextCollapse(index+1)"
                >{{'auth.submit' | translate}}</button>
              </div>
            </div>
          </vuestic-collapse>
        </vuestic-accordion>
      </div>
    </div>
  </form>
</template>

<script>
import ToggleSwitch from '../elements/ToggleSwitch'
import VuesticCollapse from '../elements/VuesticCollapse.vue'
import VuesticAccordion from '../elements/VuesticAccordion.vue'
import {mapGetters} from 'vuex'

export default {
  name: 'step3',
  components: {
    ToggleSwitch,
    VuesticCollapse,
    VuesticAccordion
  },
  computed: {
    ...mapGetters({
      pricings: 'auth/pricings',
    })
  },
  watch: {
    pricings () {
      this.thisPricings = [].concat(this.pricings)
    }
  },
  data () {
    return {
      expandIndex: 0,
      thisPricings: [],
      dddd: 0
    }
  },
  methods: {
    nextCollapse (nextIndex) {
      const currentIndex = nextIndex - 1
      this.expandIndex = nextIndex
      console.log('currentIndex--->', currentIndex, this.dddd)
    }
  }
}
</script>
<style lang="scss" scoped>
$info-color: #76c5ea;

.step3 {
  .table-header {
    padding-left: 5%;
    padding-right: 5%;
    @include media-breakpoint-down(sm) {
      padding-left: 2%;
      padding-right: 2%;
    }
  }
  .table-body {
    padding-left: 5%;
    padding-right: 5%;
    @include media-breakpoint-down(sm) {
      padding-left: 2%;
      padding-right: 2%;
    }
  }
  .widget.info-widget {
    border-color: $info-color;
  }
  .widget-element {
    font-size: 1rem;
    &.input {
      padding: 0;
      height: 25px;
      input {
        width: 40%;
        @include media-breakpoint-down(sm) {
          width: 80%;
        }
        color: #34495e;
        direction: rtl;
        text-align: right;
        -webkit-transition: outline 0.3s; /* Safari */
        transition: outline 0.3s;
        &:focus {
          outline: rgba(74, 227, 135, 0.5) auto 5px;
        }
      }
    }
  }
  h2 {
    margin-bottom: 0;
  }
  .border-bottom-2 {
    border-bottom: 2px solid #ddd;
  }
  .row {
    margin-right: 0;
    margin-left: 0;
  }
  /deep/.toggle {
    .check:checked ~ .track {
      box-shadow: inset 0 0 0 20px $info-color;
    }
  }
  .show-leon {
    color: #e34a4a;
  }
}
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
