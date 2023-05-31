const { pinyin } = require('pinyin')
const { exec } = require('child_process')
const iconv = require('iconv-lite')
const template =
  '操作日期	操作类型	操作人	操作环节	退回类别	被退回人	被退回环节	备注'
const data = `
2023/4/19 18:58	流转	毛叶·赛力克	业务登记				
2023/4/25 15:29	流转	魏璐	任务分配				
2023/5/12 12:09	流转	克迪里亚·吾麦尔	检验检测				
2023/5/12 18:48	流转	赵慧	检验检测				
2023/5/15 17:08	退回	赵慧	数据审核	格式调整	;赵慧	检验检测	
2023/5/22 10:06	流转	克迪里亚·吾麦尔	检验检测				
2023/5/28 14:29	流转	赵慧	检验检测				
2023/5/29 16:28	退回	赵慧	数据审核	格式调整	;赵慧	检验检测			
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
