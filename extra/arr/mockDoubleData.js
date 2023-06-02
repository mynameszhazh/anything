const { pinyin } = require('pinyin')
const { exec } = require('child_process')
const iconv = require('iconv-lite')
const template =
  '序号	仪器名称	型号规格	测量范围	生产厂家	编号	出厂日期	状态	溯源方式	溯源单位	校准日期	有效日期	确认结果	存放地点	备注	计量要求'
const data = `
1	拉力试验机	AI-7000-LAU5	最大拉力：0-50kN	高铁检验仪器（东莞）有限公司	DG191203550	2020.4	在用	检定	自治区计量院	2022/3/26	2023/3/25	符合	棉花包装材料检验室（一楼）		GB/T1040.1-2018 5.1.1试验机应符合GB/T16825.1-2008
2	拉力试验机	AI-7000-LAU5	速度精度：±0.5%	高铁检验仪器（东莞）有限公司	DG191203551	2020.4	在用	检定	自治区计量院	2022/3/26	2023/3/25	符合	棉花包装材料检验室		GB/T1040.1-2018 5.1.1试验机应符合GB/T16825.1-2008
`
const title = 'process2List'
const arr = template.split('\t')
// .split(' ')

const dataArr = data
  .split('\n')
  // .split('\n')
  // .split(' ')
  .filter((item) => item !== '')

let objArr = []
for (let i = 0; i < dataArr.length; i++) {
  let obj = {}
  let itemArr = dataArr[i].split('\t')
  for (let k = 0; k < arr.length; k++) {
    obj[
      pinyin(arr[k], {
        style: pinyin.STYLE_FIRST_LETTER
      }).join('')
    ] = itemArr[k]
  }
  objArr.push(obj)
}

let ret = {
  key: title,
  data: {
    current: 1,
    size: 10,
    total: objArr.length,
    record: objArr
  }
}

console.log(JSON.stringify(ret, null, 2))

exec('clip').stdin.end(iconv.encode(JSON.stringify(ret, null, 2), 'gbk'))

module.exports = ret
