import store from 'vuex-store'

const palette = store.getters['shared/palette']

export default {
  labels: ['Active Users', 'Avg/Steps Today', 'Spent this month', 'Classes this month', 'Active Users', 'Avg/Steps Today', 'Spent this month', 'Classes this month', 'Spent this month', 'Classes this month'],
  datasets: [{
    label: 'Population (millions)',
    backgroundColor: [palette.info, palette.warning, palette.primary, palette.fontColor, palette.info, palette.warning, palette.primary, palette.fontColor, palette.primary, palette.fontColor],
    data: [49, 3800, 1900, 56, 3800, 3800, 56, 3800, 3800, 56]
  }]
}
