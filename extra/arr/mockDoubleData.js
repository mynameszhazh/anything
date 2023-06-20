const { pinyin } = require('pinyin')
const { exec } = require('child_process')
const iconv = require('iconv-lite')
const template =
  '序号 企业名称 加工场所 企业负责人 职工人数 企业地址 法人代表 企业类型 信用得分'
const data = `
1 企业A 加工场所A 企业负责人A 20 企业地址A 法人代表A 1 96
`
const title = 'process2List'
const arr = template
  // .split('\t')
  .split(' ')

const dataArr = data
  // .split('\n')
  .split('\n')
  // .split(' ')
  .filter((item) => item !== '')

let objArr = []
for (let i = 0; i < dataArr.length; i++) {
  let obj = {}
  let itemArr = dataArr[i]
    // .split('\t')
    .split(' ')
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
