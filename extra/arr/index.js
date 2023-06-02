const { pinyin } = require('pinyin')
const { exec } = require('child_process')
const iconv = require('iconv-lite')
const template =
  '序号	仪器名称	型号规格	测量范围	生产厂家	编号	出厂日期	状态	溯源方式	溯源单位	校准日期	有效日期	确认结果	存放地点	备注	计量要求'
const arr = template
  .split('\t')
  // .split('\n')
  // .split(' ')
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

exec('clip').stdin.end(iconv.encode(JSON.stringify(arr, null, 2), 'gbk'))

module.exports = arr
