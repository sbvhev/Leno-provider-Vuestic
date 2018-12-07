<template>
  <form class="register-form step3">
    <div class="row">
      <div class="col-sm-12 text-right">
        <vuestic-accordion>
          <vuestic-collapse
            v-for="(pricing, index) in pricingInstance"
            :key="index"
            :value="index == expandIndex"
            :index="index"
            @onClickHeader="handleExpandIndex"
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
                      <toggle-switch
                        :locationIsOn="pricing.isOn"
                        @checkChange="isOnChange"
                      ></toggle-switch>
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
                  <price-form ref="priceForm" :options="pricing.options"></price-form>
                </div>
              </div>
              <div
                class="d-flex flex-row justify-content-center align-content-center pt-2 pb-4"
              >
                <button
                  class="btn btn-info"
                  @click.prevent="nextCollapse()"
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
import PriceForm from '../elements/PriceForm.vue'
import {mapGetters} from 'vuex'

export default {
  name: 'step3',
  components: {
    ToggleSwitch,
    VuesticCollapse,
    VuesticAccordion,
    PriceForm
  },
  computed: {
    ...mapGetters({
      pricings: 'auth/pricings',
    }),
  },
  watch: {
    pricings: {
      handler (val) {
        this.pricingInstance = JSON.parse(JSON.stringify(val))
      },
    }
  },
  data () {
    return {
      expandIndex: 0,
      pricingInstance: [],
    }
  },
  methods: {
    nextCollapse () {
      const {priceModels} = this.$refs.priceForm[this.expandIndex].$data
      this.$store.commit('auth/CHANGEPRICING', {key: this.expandIndex, value: priceModels})
      this.expandIndex++
    },
    handleExpandIndex (index) {
      this.expandIndex = index
    },
    isOnChange () {
      this.$store.commit('auth/CHANGEPRICEISON', this.expandIndex)
    }
  },
}
</script>
<style lang="scss" scoped>
$info-color: #76c5ea;

/deep/.step3 {
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
        width: 50%;
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
