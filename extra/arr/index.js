const { pinyin } = require('pinyin')
const { exec } = require('child_process')
const iconv = require('iconv-lite')
const template =
  '登记人	登记日期	检验类别	检验性质	补充更改	登记单号	委托单位	受检单位 委托单位联系人	委托单位地址	委托单位电话	受检单位联系人	受检单位地址	受检单位电话	缴费单位	缴费单位联系人	应收金额	取报告方式	检测依据	其他说明	报告结论	报告签发人	报告签发日期	报告检验周期	要求出报告日期	检验备注	原检编号	流程状态	样品名称	样品数量	样品描述	样品等级	抽验基数	型号规格	商标	来样方式	余样处理	生产单位	生产日期	抽样人	安全等级	生产单位电话	协议备注'
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
