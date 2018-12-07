/* ============
 * State of the auth module
 * ============
 *
 * The initial state of the auth module.
 */

export default {
  authenticated: false,
  isSetupProfile: false,
  notificationInfo: {
    type: '',
    message: '',
    title: ''
  },
  formData: {
    locations: null,
    pricings: []
  },
  provider: {
    providerId: null,
    providerAccessToken: null,
    mindbodyActivationLink: '',
    siteId: null
  },
  isProcessing: false
}
