/* ============
 * Getters for the auth module
 * ============
 *
 * The getters that are available on the
 * auth module.
 */

export default {
  getPlanChoice: state => {
    const { planChoice, stripeCustomerId } = state
    return {
      planChoice,
      stripeCustomerId
    }
    // const { planChoice } = state;
    // return planChoice;
  },
  notificationInfo: state => {
    return state.notificationInfo
  },
  loading: state => {
    return state.isProcessing
  },
  getFormData: state => {
    return state.formData
  },
  pricings: state => {
    return state.formData.pricings
  },
  provider: state => {
    return state.provider
  }
}
