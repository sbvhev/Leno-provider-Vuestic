class TableDataInfo {
  constructor (data) {
    this.datas = { data: [] }
    this.fields = []
    this.sortFunctions = {}
    if (data.length) {
      Object.keys(data[0]).forEach(ele => {
        if (ele !== 'classDescriptionId' && ele !== 'percentage') {
          this.fields.push({ name: ele, title: ele, sortField: ele })
          this.sortFunctions[ele] = function (item1, item2) {
            return item1 >= item2 ? 1 : -1
          }
        }
      })
      const keys = this.fields.map(({ name }) => name)
      this.datas.data = data.map(item =>
        keys.reduce((acc, key) => ({ ...acc, [key]: item[key] }), {})
      )
    }
  }
}

export default TableDataInfo
