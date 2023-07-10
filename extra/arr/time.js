// const { pinyin } = require('pinyin')
const { exec } = require('child_process')
const iconv = require('iconv-lite')
const template =
  `
08.15.27[M][0@0][0][0].jpg
08.15.27[M][0@0][1][0].jpg
08.18.14[M][0@0][0][0].jpg
08.18.14[M][0@0][1][0].jpg
08.43.08[M][0@0][0][0].jpg
08.43.08[M][0@0][1][0].jpg
08.44.40[M][0@0][0][0].jpg
08.44.40[M][0@0][1][0].jpg
08.45.39[M][0@0][0][0].jpg
08.45.39[M][0@0][1][0].jpg
08.49.16[M][0@0][0][0].jpg
08.49.16[M][0@0][1][0].jpg
08.51.50[M][0@0][0][0].jpg
08.51.50[M][0@0][1][0].jpg
08.57.29[M][0@0][0][0].jpg
08.57.29[M][0@0][1][0].jpg
08.58.34[M][0@0][0][0].jpg
08.58.34[M][0@0][1][0].jpg
09.01.26[M][0@0][0][0].jpg
09.01.26[M][0@0][1][0].jpg
09.03.35[M][0@0][0][0].jpg
09.03.35[M][0@0][1][0].jpg
09.03.38[M][0@0][0][0].jpg
09.03.38[M][0@0][1][0].jpg
09.04.49[M][0@0][0][0].jpg
09.04.49[M][0@0][1][0].jpg
09.07.51[M][0@0][0][0].jpg
09.07.51[M][0@0][1][0].jpg
09.14.24[M][0@0][0][0].jpg
09.14.24[M][0@0][1][0].jpg
09.15.14[M][0@0][0][0].jpg
09.15.14[M][0@0][1][0].jpg
09.16.26[M][0@0][0][0].jpg
09.16.26[M][0@0][1][0].jpg
09.16.41[M][0@0][0][0].jpg
09.16.41[M][0@0][1][0].jpg
09.16.52[M][0@0][0][0].jpg
09.16.52[M][0@0][1][0].jpg
09.21.18[M][0@0][0][0].jpg
09.21.18[M][0@0][1][0].jpg
09.21.48[M][0@0][0][0].jpg
09.21.48[M][0@0][1][0].jpg
09.22.40[M][0@0][0][0].jpg
09.22.40[M][0@0][1][0].jpg
09.22.46[M][0@0][0][0].jpg
09.22.46[M][0@0][1][0].jpg
09.22.47[M][0@0][0][0].jpg
09.22.47[M][0@0][1][0].jpg
09.22.52[M][0@0][0][0].jpg
09.22.52[M][0@0][1][0].jpg
09.23.01[M][0@0][0][0].jpg
09.23.01[M][0@0][1][0].jpg
09.23.08[M][0@0][0][0].jpg
09.23.08[M][0@0][1][0].jpg
09.23.09[M][0@0][0][0].jpg
09.23.09[M][0@0][1][0].jpg
09.23.45[M][0@0][0][0].jpg
09.23.45[M][0@0][1][0].jpg
09.24.32[M][0@0][0][0].jpg
09.24.32[M][0@0][1][0].jpg
09.24.37[M][0@0][0][0].jpg
09.24.37[M][0@0][1][0].jpg
09.58.05[M][0@0][0][0].jpg
09.58.05[M][0@0][1][0].jpg
09.59.18[M][0@0][0][0].jpg
09.59.18[M][0@0][1][0].jpg
09.59.24[M][0@0][0][0].jpg
09.59.24[M][0@0][1][0].jpg
09.59.29[M][0@0][0][0].jpg
09.59.29[M][0@0][1][0].jpg
09.59.42[M][0@0][0][0].jpg
09.59.42[M][0@0][1][0].jpg
09.59.46[M][0@0][0][0].jpg
09.59.46[M][0@0][1][0].jpg
10.00.33[M][0@0][0][0].jpg
10.00.33[M][0@0][1][0].jpg
10.00.39[M][0@0][0][0].jpg
10.00.39[M][0@0][1][0].jpg
10.00.47[M][0@0][0][0].jpg
10.00.47[M][0@0][1][0].jpg
10.01.16[M][0@0][0][0].jpg
10.01.16[M][0@0][1][0].jpg
10.02.42[M][0@0][0][0].jpg
10.02.42[M][0@0][1][0].jpg
10.02.48[M][0@0][0][0].jpg
10.02.48[M][0@0][1][0].jpg
10.02.49[M][0@0][0][0].jpg
10.02.49[M][0@0][1][0].jpg
10.03.04[M][0@0][0][0].jpg
10.03.04[M][0@0][1][0].jpg
10.03.17[M][0@0][0][0].jpg
10.03.17[M][0@0][1][0].jpg
10.03.18[M][0@0][0][0].jpg
10.03.18[M][0@0][1][0].jpg
10.03.35[M][0@0][0][0].jpg
10.03.35[M][0@0][1][0].jpg
10.03.46[M][0@0][0][0].jpg
10.03.46[M][0@0][1][0].jpg
10.04.54[M][0@0][0][0].jpg
10.04.54[M][0@0][1][0].jpg
10.05.21[M][0@0][0][0].jpg
10.05.21[M][0@0][1][0].jpg
10.05.36[M][0@0][0][0].jpg
10.05.36[M][0@0][1][0].jpg
10.05.44[M][0@0][0][0].jpg
10.05.44[M][0@0][1][0].jpg
10.06.08[M][0@0][0][0].jpg
10.06.08[M][0@0][1][0].jpg
10.06.09[M][0@0][0][0].jpg
10.06.09[M][0@0][1][0].jpg
10.06.11[M][0@0][0][0].jpg
10.06.11[M][0@0][1][0].jpg
10.06.46[M][0@0][0][0].jpg
10.06.46[M][0@0][1][0].jpg
10.06.47[M][0@0][0][0].jpg
10.06.47[M][0@0][1][0].jpg
10.06.49[M][0@0][0][0].jpg
10.06.49[M][0@0][1][0].jpg
10.06.50[M][0@0][0][0].jpg
10.06.50[M][0@0][1][0].jpg
10.06.52[M][0@0][0][0].jpg
10.06.52[M][0@0][1][0].jpg
10.07.06[M][0@0][0][0].jpg
10.07.06[M][0@0][1][0].jpg
10.07.08[M][0@0][0][0].jpg
10.07.08[M][0@0][1][0].jpg
10.07.11[M][0@0][0][0].jpg
10.07.11[M][0@0][1][0].jpg
10.07.30[M][0@0][0][0].jpg
10.07.30[M][0@0][1][0].jpg
10.07.36[M][0@0][0][0].jpg
10.07.36[M][0@0][1][0].jpg
10.07.49[M][0@0][0][0].jpg
10.07.49[M][0@0][1][0].jpg
10.07.53[M][0@0][0][0].jpg
10.07.53[M][0@0][1][0].jpg
10.07.55[M][0@0][0][0].jpg
10.07.55[M][0@0][1][0].jpg
10.08.07[M][0@0][0][0].jpg
10.08.07[M][0@0][1][0].jpg
10.08.23[M][0@0][0][0].jpg
10.08.23[M][0@0][1][0].jpg
10.08.26[M][0@0][0][0].jpg
10.08.26[M][0@0][1][0].jpg
10.08.32[M][0@0][0][0].jpg
10.08.32[M][0@0][1][0].jpg
10.08.36[M][0@0][0][0].jpg
10.08.36[M][0@0][1][0].jpg
10.08.39[M][0@0][0][0].jpg
10.08.39[M][0@0][1][0].jpg
10.08.41[M][0@0][0][0].jpg
10.08.41[M][0@0][1][0].jpg
10.08.45[M][0@0][0][0].jpg
10.08.45[M][0@0][1][0].jpg
10.08.46[M][0@0][0][0].jpg
10.08.46[M][0@0][1][0].jpg
10.08.47[M][0@0][0][0].jpg
10.08.47[M][0@0][1][0].jpg
10.08.50[M][0@0][0][0].jpg
10.08.50[M][0@0][1][0].jpg
10.08.52[M][0@0][0][0].jpg
10.08.52[M][0@0][1][0].jpg
10.08.53[M][0@0][0][0].jpg
10.08.53[M][0@0][1][0].jpg
10.08.56[M][0@0][0][0].jpg
10.08.56[M][0@0][1][0].jpg
10.09.00[M][0@0][0][0].jpg
10.09.00[M][0@0][1][0].jpg
10.09.01[M][0@0][0][0].jpg
10.09.01[M][0@0][1][0].jpg
10.09.15[M][0@0][0][0].jpg
10.09.15[M][0@0][1][0].jpg
10.09.26[M][0@0][0][0].jpg
10.09.26[M][0@0][1][0].jpg
10.09.29[M][0@0][0][0].jpg
10.09.29[M][0@0][1][0].jpg
10.09.33[M][0@0][0][0].jpg
10.09.33[M][0@0][1][0].jpg
10.09.34[M][0@0][0][0].jpg
10.09.34[M][0@0][1][0].jpg
10.09.45[M][0@0][0][0].jpg
10.09.45[M][0@0][1][0].jpg
10.09.59[M][0@0][0][0].jpg
10.09.59[M][0@0][1][0].jpg
10.10.02[M][0@0][0][0].jpg
10.10.02[M][0@0][1][0].jpg
10.10.20[M][0@0][0][0].jpg
10.10.20[M][0@0][1][0].jpg
10.10.31[M][0@0][0][0].jpg
10.10.31[M][0@0][1][0].jpg
10.10.46[M][0@0][0][0].jpg
10.10.46[M][0@0][1][0].jpg
10.10.49[M][0@0][0][0].jpg
10.10.49[M][0@0][1][0].jpg
10.10.51[M][0@0][0][0].jpg
10.10.51[M][0@0][1][0].jpg
10.10.52[M][0@0][0][0].jpg
10.10.52[M][0@0][1][0].jpg
10.11.17[M][0@0][0][0].jpg
10.11.17[M][0@0][1][0].jpg
10.11.18[M][0@0][0][0].jpg
10.11.18[M][0@0][1][0].jpg
10.11.20[M][0@0][0][0].jpg
10.11.20[M][0@0][1][0].jpg
10.11.36[M][0@0][0][0].jpg
10.11.36[M][0@0][1][0].jpg
10.11.41[M][0@0][0][0].jpg
10.11.41[M][0@0][1][0].jpg
10.11.42[M][0@0][0][0].jpg
10.11.42[M][0@0][1][0].jpg
10.44.04[M][0@0][0][0].jpg
10.44.04[M][0@0][1][0].jpg
10.50.22[M][0@0][0][0].jpg
10.50.22[M][0@0][1][0].jpg
10.50.39[M][0@0][0][0].jpg
10.50.39[M][0@0][1][0].jpg
10.53.00[M][0@0][0][0].jpg
10.53.00[M][0@0][1][0].jpg
10.53.03[M][0@0][0][0].jpg
10.53.03[M][0@0][1][0].jpg
10.56.20[M][0@0][0][0].jpg
10.56.20[M][0@0][1][0].jpg
10.56.53[M][0@0][0][0].jpg
10.56.53[M][0@0][1][0].jpg
10.57.26[M][0@0][0][0].jpg
10.57.26[M][0@0][1][0].jpg
10.57.28[M][0@0][0][0].jpg
10.57.28[M][0@0][1][0].jpg
10.57.31[M][0@0][0][0].jpg
10.57.31[M][0@0][1][0].jpg
10.58.31[M][0@0][0][0].jpg
10.58.31[M][0@0][1][0].jpg
10.58.33[M][0@0][0][0].jpg
10.58.33[M][0@0][1][0].jpg
10.58.49[M][0@0][0][0].jpg
10.58.49[M][0@0][1][0].jpg
10.59.27[M][0@0][0][0].jpg
10.59.27[M][0@0][1][0].jpg
11.00.02[M][0@0][0][0].jpg
11.00.02[M][0@0][1][0].jpg
11.00.27[M][0@0][0][0].jpg
11.00.27[M][0@0][1][0].jpg
11.01.56[M][0@0][0][0].jpg
11.01.56[M][0@0][1][0].jpg
11.02.18[M][0@0][0][0].jpg
11.02.18[M][0@0][1][0].jpg
11.03.13[M][0@0][0][0].jpg
11.03.13[M][0@0][1][0].jpg
11.10.48[M][0@0][0][0].jpg
11.10.48[M][0@0][1][0].jpg
11.14.12[M][0@0][0][0].jpg
11.14.12[M][0@0][1][0].jpg
11.22.46[M][0@0][0][0].jpg
11.22.46[M][0@0][1][0].jpg
11.22.56[M][0@0][0][0].jpg
11.22.56[M][0@0][1][0].jpg
11.34.24[M][0@0][0][0].jpg
11.34.24[M][0@0][1][0].jpg
11.35.09[M][0@0][0][0].jpg
11.35.09[M][0@0][1][0].jpg
11.37.00[M][0@0][0][0].jpg
11.37.00[M][0@0][1][0].jpg
  `
const obj =  {}
template
  // .split('\t')
  .split('\n')
  // .split(' ')
  .filter((item) => item !== ' ')
  .forEach((item, index) => {
    let temp1 =item.substring(0,5)
    let temp =item.substring(0,8)
    obj[temp1.replaceAll('.', ':')] = temp
  })

console.log(JSON.stringify(obj, null, 2))

exec('clip').stdin.end(iconv.encode(JSON.stringify(obj, null, 2), 'gbk'))

module.exports = obj