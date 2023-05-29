const { pinyin } = require('pinyin')
const template =
  '设备名称 设备编号 生成商 检测项目 使用日期 使用频率  所属科室 科室负责人'
const arr = template
  // .split('\t')
  .split(' ')
  .filter((item) => item !== '')
  .map((item) => {
    return {
      name: item,
      // search: {
      //   show: true
      // },
      prop: pinyin(item, {
        style: pinyin.STYLE_FIRST_LETTER
      }).join('')
    }
  })

console.log(JSON.stringify(arr, null, 2))
