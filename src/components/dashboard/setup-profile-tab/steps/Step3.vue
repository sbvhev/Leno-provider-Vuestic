<template>
  <form class="register-form step3">
    <h1 class="text-center">Set your pricing category and pricing options</h1>
    <h5 class="text-center justify-center align-center mt-5">LEON allows you to sell single class, multi class, unlimited memberships and even an intro option directly on the platform! Simply toggle on or off which pricing category you wish to offer.</h5>
    <div class="row justify-center align-center mt-5">
      <div class="col-sm-12 text-left">
        <div slot="body">
          <div class="row justify-center align-center mt-2">
            <div class="col-md-6">
              <vuestic-widget class="info-widget">
                <div
                  class="table-header pt-3 d-flex flex-row flex-wrap justify-content-between align-content-center"
                >
                  <div class="col-md-3 col-md-offset-1 location pr-3">
                    <div class="location-title">
                      <p>required</p>
                    </div>
                  </div>
                  <div
                    class="col-md-8 d-flex flex-row align-items-center flex-wrap"
                  >
                    <div class="font-weight-bold text-center mr-1">
                      <h3>Drop-In Classes</h3>
                    </div>
                  </div>
                </div>
                <div class="table-body py-2">
                  <div v-bind:class="['pt-3 pb-3', 'row']">
                    <div class="col-3 text-left widget-element input">
                      <p class="dollar-sign">$</p>
                      <fieldset>
                        <div
                          class="form-group with-icon-right"
                          :class="{'has-error': errors.has('dropInshort'), 'valid': isFormFieldValid('dropInshort')}"
                        >
                          <div class="input-group">
                            <input
                              name="dropInshort"
                              data-vv-as="dropInshort"
                              v-model="dropInshort"
                              @input="handleInput($event, 'dropIn-short')"
                              @keydown="onKeyDown"
                              v-validate="'required'"
                              required
                            >
                            <i class="bar"></i>
                            <small
                              v-show="errors.has('dropInshort')"
                              class="help text-danger"
                            >Required</small>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                    <div class="col-9 text-left widget-element pl-1">
                      <h6>Short Classes (<45m)</h6>
                      <p>{{this.pricingInstance? parseInt(this.pricingInstance.prices['dropIn-short'].percentage): ''}}% of your scheduled classes fall in this category</p>
                    </div>
                  </div>
                  <div v-bind:class="['pt-3 pb-3', 'row']">
                    <div class="col-3 text-left widget-element input">
                      <p class="dollar-sign">$</p>
                      <fieldset>
                        <div
                          class="form-group with-icon-right"
                          :class="{'has-error': errors.has('dropInprimary'), 'valid': isFormFieldValid('dropInprimary')}"
                        >
                          <div class="input-group">
                            <input
                              name="dropInprimary"
                              data-vv-as="dropInprimary"
                              v-model="dropInprimary"
                              @input="handleInput($event, 'dropIn-primary')"
                              @keydown="onKeyDown"
                              v-validate="'required'"
                              required
                            >
                            <i class="bar"></i>
                            <small
                              v-show="errors.has('dropInprimary')"
                              class="help text-danger"
                            >Required</small>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                    <div class="col-9 text-left widget-element pl-1">
                      <h6>Primary Classes (45-70m)</h6>
                      <p>{{parseInt(this.pricingInstance.prices['dropIn-primary'].percentage)}}% of your scheduled classes fall in this category</p>
                    </div>
                  </div>
                  <div v-bind:class="['pt-3 pb-3', 'row']">
                    <div class="col-3 text-left widget-element input">
                      <p class="dollar-sign">$</p>
                      <fieldset>
                        <div
                          class="form-group with-icon-right"
                          :class="{'has-error': errors.has('dropInlong'), 'valid': isFormFieldValid('dropInlong')}"
                        >
                          <div class="input-group">
                            <input
                              name="dropInlong"
                              data-vv-as="dropInlong"
                              v-model="dropInlong"
                              @input="handleInput($event, 'dropIn-long')"
                              @keydown="onKeyDown"
                              v-validate="'required'"
                              required
                            >
                            <i class="bar"></i>
                            <small
                              v-show="errors.has('dropInlong')"
                              class="help text-danger"
                            >Required</small>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                    <div class="col-9 text-left widget-element pl-1">
                      <h6>Long Classes (>70m)</h6>
                      <p>{{parseInt(this.pricingInstance.prices['dropIn-long'].percentage)}}% of your scheduled classes fall in this category</p>
                    </div>
                  </div>
                  <div v-bind:class="['pt-3 pb-3', 'row']">
                    <div class="col-3 text-left widget-element input">
                      <select @change="onChange($event, 'single')" v-model="singlediscount">
                        <option value="0">None</option>
                        <option value="0.05">5% off</option>
                        <option value="0.1">10% off</option>
                        <option value="0.15">15% off</option>
                        <option value="0.2">20% off</option>
                        <option value="0.25">25% off</option>
                        <option value="0.3">30% off</option>
                        <option value="0.35">35% off</option>
                        <option value="0.4">40% off</option>
                        <option value="0.45">45% off</option>
                        <option value="0.5">50% off</option>
                        <option value="0.55">55% off</option>
                        <option value="0.6">60% off</option>
                        <option value="0.65">65% off</option>
                        <option value="0.7">70% off</option>
                        <option value="0.75">75% off</option>
                        <option value="0.8">80% off</option>
                        <option value="0.85">85% off</option>
                        <option value="0.9">90% off</option>
                        <option value="0.95">95% off</option>
                        <option value="1">Free</option>
                      </select>
                    </div>
                    <div class="col-9 text-left widget-element pl-1">
                      <h6>Introductory Discount</h6>
                      <p>Applied to a user's first class with your studio</p>
                    </div>
                  </div>
                </div>
              </vuestic-widget>
            </div>
            <div class="col-md-6">
              <vuestic-widget class="info-widget">
                <div
                  class="table-header pt-3 d-flex flex-row flex-wrap justify-content-between align-content-center"
                >
                  <div class="col-md-3 col-md-offset-1 col-sm-3 location pr-3">
                    <div class="location-title">
                      <p>optional</p>
                    </div>
                  </div>
                  <div
                    class="col-md-8 col-sm-9 d-flex flex-row align-items-center flex-wrap"
                  >
                    <div class="font-weight-bold text-center mr-1">
                      <h3>Packs & Memberships</h3>
                    </div>
                  </div>
                </div>
                <div class="table-body py-2">
                  <div v-bind:class="['pt-3 pb-3', 'row']">
                    <div class="col-3 text-left widget-element input">
                      <p class="dollar-sign">$</p>
                      <fieldset>
                        <div
                          class="form-group with-icon-right"
                          :class="{'has-error': errors.has('pack5'), 'valid': isFormFieldValid('pack5')}"
                        >
                          <div class="input-group">
                            <input
                              name="pack5"
                              data-vv-as="pack5"
                              v-model="pack5"
                              placeholder="Not offered"
                              @input="handleInput($event, 'pack-5')"
                              @keydown="onKeyDown"
                            >
                            <i class="bar"></i>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                    <div class="col-9 text-left widget-element pl-1">
                      <h6>5 Pack</h6>
                      <p>Valid for any 5 classes; does not expire</p>
                    </div>
                  </div>
                  <div v-bind:class="['pt-3 pb-3', 'row']">
                    <div class="col-3 text-left widget-element input">
                      <p class="dollar-sign">$</p>
                      <fieldset>
                        <div
                          class="form-group with-icon-right"
                          :class="{'has-error': errors.has('pack10'), 'valid': isFormFieldValid('pack10')}"
                        >
                          <div class="input-group">
                            <input
                              name="pack10"
                              data-vv-as="pack10"
                              v-model="pack10"
                              placeholder="Not offered"
                              @input="handleInput($event, 'pack-10')"
                              @keydown="onKeyDown"
                            >
                            <i class="bar"></i>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                    <div class="col-9 text-left widget-element pl-1">
                      <h6>10 Pack</h6>
                      <p>Valid for any 10 classes; does not expire</p>
                    </div>
                  </div>
                  <div v-bind:class="['pt-3 pb-3', 'row']">
                    <div class="col-3 text-left widget-element input">
                      <p class="dollar-sign">$</p>
                      <fieldset>
                        <div
                          class="form-group with-icon-right"
                          :class="{'has-error': errors.has('membership'), 'valid': isFormFieldValid('membership')}"
                        >
                          <div class="input-group">
                            <input
                              name="membership"
                              data-vv-as="membership"
                              v-model="membership"
                              placeholder="Not offered"
                              @input="handleInput($event, 'membership')"
                              @keydown="onKeyDown"
                            >
                            <i class="bar"></i>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                    <div class="col-9 text-left widget-element pl-1">
                      <h6>Monthly Unlimited</h6>
                      <p>Valid for up to 1 class per day; renews each month</p>
                    </div>
                  </div>
                  <div v-bind:class="['pt-3 pb-3', 'row']">
                    <div class="col-3 text-left widget-element input">
                      <select @change="onChange($event, 'multi')" v-model="multidiscount">
                        <option value="0">None</option>
                        <option value="0.05">5% off</option>
                        <option value="0.1">10% off</option>
                        <option value="0.15">15% off</option>
                        <option value="0.2">20% off</option>
                        <option value="0.25">25% off</option>
                        <option value="0.3">30% off</option>
                        <option value="0.35">35% off</option>
                        <option value="0.4">40% off</option>
                        <option value="0.45">45% off</option>
                        <option value="0.5">50% off</option>
                        <option value="0.55">55% off</option>
                        <option value="0.6">60% off</option>
                        <option value="0.65">65% off</option>
                        <option value="0.7">70% off</option>
                        <option value="0.75">75% off</option>
                        <option value="0.8">80% off</option>
                        <option value="0.85">85% off</option>
                        <option value="0.9">90% off</option>
                        <option value="0.95">95% off</option>
                        <option value="1">Free</option>
                      </select>
                    </div>
                    <div class="col-9 text-left widget-element pl-1">
                      <h6>Introductory Discount</h6>
                      <p>Applied to a user's first pack/membership with your studio</p>
                    </div>
                  </div>
                </div>
              </vuestic-widget>
            </div>
          </div>
        </div>
        <div class="wizard-body-actions">
          <div class="btn-container ladda-div">
            <vue-ladda
            :loading="nextBtn.loading"
            :key="nextBtn.dataStyle"
            :data-style="nextBtn.dataStyle"
            class="btn btn-primary wizard-next"
            v-if="!isDashboard"
            @click.prevent="save()"
          >Save</vue-ladda>
          </div>
        </div>
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
import VueLadda from 'vue-ladda'
import Proxy from '@/proxies/Proxy'

export default {
  name: 'step3',
  components: {
    ToggleSwitch,
    VuesticCollapse,
    VuesticAccordion,
    PriceForm,
    VueLadda
  },
  computed: {
    ...mapGetters({
      pricings: 'auth/pricings',
    }),
    getPricings () {
      if (Object.keys(this.$store.getters).includes('auth/pricings')) {
        return this.$store.getters['auth/pricings']
      } else {
        return null
      }
    },
    getFormData () {
      if (Object.keys(this.$store.getters).includes('auth/getFormData')) {
        return this.$store.getters['auth/getFormData']
      } else {
        return null
      }
    },
    getProvider () {
      if (Object.keys(this.$store.getters).includes('auth/provider')) {
        return this.$store.getters['auth/provider']
      } else {
        return null
      }
    }
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
      dropInshort: '',
      dropInprimary: '',
      dropInlong: '',
      pack5: '',
      pack10: '',
      membership: '',
      singlediscount: '',
      multidiscount: '',
      expandIndex: 0,
      pricingInstance: [],
      nextBtn: {
        loading: false,
        dataStyle: 'zoom-in',
        progress: 0
      },
      isDashboard: false,
      formData: {},
      provider: '',
      priceModels: {}
    }
  },
  methods: {
    isFormFieldValid (field) {
      let isValid = false
      if (this.formFields[field]) {
        isValid =
          this.formFields[field].validated && this.formFields[field].valid
      }
      return isValid
    },
    validateFormField (fieldName) {
      this.$validator.validate(fieldName, this[fieldName])
    },
    wrapDiscount (val) {
      return (val * 100) === 0 ? 'None' : (val * 100) === 100 ? 'Free' : `${val * 100}% off`
    },
    handleExpandIndex (index) {
      this.expandIndex = index
    },
    handleInput (e, key) {
      this.priceModels[key].price_cents = e.target.value * 100
      this.$store.commit('auth/CHANGEPRICEISON', { key, value: e.target.value !== '' ? e.target.value : null })
    },
    onKeyDown (e) {
      if ((e.keyCode > 31 && (e.keyCode < 48 || e.keyCode > 57)) && e.keyCode !== 46) {
        e.preventDefault()
      }
    },
    onChange (e, type) {
      this.$store.commit('auth/CHANGEDISCOUNT', { key: type, value: e.target.value })
    },
    async save () {
      let that = this
      Object.keys(that.formFields).map(field => {
        that.validateFormField(field)
      })
      // validation check
      const validOk = Object.keys(that.formFields).every(field => {
        return that.isFormFieldValid(field)
      })

      if (validOk) {
        this.nextBtn.loading = true
        const {pricings: pricing} = this.getFormData
        const {mindbodyActivationLink, siteId, ...providerData} = this.provider
        const {success, error} = await new Proxy('savePricing.php?').submit('post', { pricing, ...providerData })

        if (success) {
          this.nextBtn.loading = false
          this.$store.dispatch('auth/notification', {
            type: 'SUCCESS',
            title: 'SUCCESS!',
            message: 'SUCCESS!'
          })
          return true
        } else {
          this.showToast()
          console.log(error)
          this.nextBtn.loading = false
          return false
        }
      }
    },
    showToast (errMessage = 'Oops, Please try again later.') {
      this.$store.dispatch('auth/notification', {
        type: 'ERROR',
        title: 'SERVER ERROR',
        message: errMessage
      })
    }
  },
  created () {
    this.isDashboard = this.$route.path.includes('dashboard')
    this.formData = this.getFormData
    this.provider = this.getProvider
    if (this.getPricings) {
      this.pricingInstance = JSON.parse(JSON.stringify(this.getPricings))
      this.priceModels = this.pricingInstance.prices
      this.dropInshort = this.priceModels['dropIn-short'].price_cents !== null ? this.priceModels['dropIn-short'].price_cents / 100 : ''
      this.dropInprimary = this.priceModels['dropIn-primary'].price_cents !== null ? this.priceModels['dropIn-primary'].price_cents / 100 : ''
      this.dropInlong = this.priceModels['dropIn-long'].price_cents !== null ? this.priceModels['dropIn-long'].price_cents / 100 : ''
      this.pack5 = this.priceModels['pack-5'].price_cents !== null ? this.priceModels['pack-5'].price_cents / 100 : ''
      this.pack10 = this.priceModels['pack-10'].price_cents !== null ? this.priceModels['pack-10'].price_cents / 100 : ''
      this.membership = this.priceModels['membership'].price_cents !== null ? this.priceModels['membership'].price_cents / 100 : ''
      this.singlediscount = this.pricingInstance.discounts.single
      this.multidiscount = this.pricingInstance.discounts.multi
    }
  }
}
</script>
<style lang="scss" scoped>
$info-color: #76c5ea;

/deep/.step3 {
  h1 {
  font-size: 3.5rem;
  margin-top: 40px;
  @media only screen and (max-width: 768px) {
    font-size: 2rem;
  }
  }
  h5 {
    margin-bottom: 100px;
  }
  .table-header {
    padding-left: 5%;
    padding-right: 5%;
    @include media-breakpoint-down(sm) {
      padding-left: 2%;
      padding-right: 2%;
    }
  }
  input {
    border-width: 1px;
    padding-right: 0;
    font-size: 13px;
  }
  .dollar-sign {
    position: absolute;
    margin-left: -13px;
    margin-top: 17px;
  }
  select {
    border: 1px solid grey;
    width: 90%;
    @media only screen and (max-width: 768px) {
      width: 100% !important;
    }
  }
  .col-sm-12 {
    @media only screen and (max-width: 768px) {
      padding-left: 0px;
      padding-right: 0px;
    }
  }
  .input-group {
    width: 90%;
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
        width: 90%;
        @include media-breakpoint-down(sm) {
          width: 90%;
        }
        color: #34495e;
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
  .ladda-button {
    border-radius: 25px;
    width: 180px;
  }
  h6 {
    font-size: 1.3rem;
  }
  p {
    font-size: 0.8rem;
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

.ladda-div {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
