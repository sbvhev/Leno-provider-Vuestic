/* ============
 * Getters for the auth module
 * ============
 *
 * The getters that are available on the
 * auth module.
 */

export default {
  toggleWithoutAnimation: state => {
    return state.sidebar.withoutAnimation
  },
  config: state => {
    return state.config
  },
  palette: state => {
    return state.config.palette
  },
  isLoading: state => {
    return state.isLoading
  }
}
