const { pinyin } = require('pinyin')
const { exec } = require('child_process')
const iconv = require('iconv-lite')
const template =
  '检验类别	检验性质	样品名称	登记日期	单号	检测科室	检测部位	分配的检验员	检验员	流程状态	出结果日期	检测项目'
const data = '纺织品及服装	风险监测	棉本色纱线（针织）	2023-04-19	65012022081200001	纺织服装及制品检验室		赵慧	赵慧	数据审核	2023-05-12	单纱断裂强度'
const title = 'workList'
const arr = template
  .split('\t')
const dataArr = data
  .split('\t')
  // .split('\n')
  // .split(' ')
  // .filter((item) => item !== '')
    
let obj = {}
for(let i=0; i<arr.length; i++) {
  obj[pinyin(arr[i], {
        style: pinyin.STYLE_FIRST_LETTER
      }).join('')] = dataArr[i]
}

let ret = {
  key: title,
  data: {
    current: 1,
    size: 10,
    total: 1,
    record: [obj]
  }
}

console.log(JSON.stringify(ret, null, 2))

exec('clip').stdin.end(iconv.encode(JSON.stringify(ret, null, 2), 'gbk'))

module.exports = ret 