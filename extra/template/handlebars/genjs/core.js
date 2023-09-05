const fs = require('fs')
console.log('fs:', fs)
// import fs from 'fs'
const Handlebars = require('handlebars')
var myHandlebars = Handlebars.create({
  // 修改插值符号
  delimiters: ['{{', '}}']
})

myHandlebars.registerHelper('equal', function (v1, v2, options) {
  if(v2 === 'input' && v1 === undefined) return options.fn(this)
  if (v1 == v2) {
    return options.fn(this)
  } else {
    return options.inverse(this)
  }
})

function compilerFn(meta, filePath, templatePath) {
  if (fs.existsSync(templatePath)) {
    const content = fs.readFileSync(templatePath).toString()
    const result = myHandlebars.compile(content)(meta)
    fs.writeFileSync(filePath, result)
  }
}

module.exports.compilerFn = compilerFn