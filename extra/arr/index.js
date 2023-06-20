const { pinyin } = require('pinyin')
const { exec } = require('child_process')
const iconv = require('iconv-lite')
const template =
  '申报文件 上传时间 上传情况'
const arr = template
  // .split('\t')
  // .split('\n')
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

exec('clip').stdin.end(iconv.encode(JSON.stringify(arr, null, 2), 'gbk'))

module.exports = arr
