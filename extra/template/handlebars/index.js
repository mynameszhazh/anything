const fs = require('fs')
// import fs from 'fs'
const Handlebars = require('handlebars')
var myHandlebars = Handlebars.create({ 
  // 修改插值符号
  delimiters: ['${{', '}}'] 
});

myHandlebars.registerHelper('equal', function (v1, v2, options) {
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

compilerFn(
  {
    test: 'test',
    isType(type) {
      return type === 'input'
    },
    search: [
      {
        type: 'input',
        title: '商家名称',
        name: 'sjmc'
      },
      {
        type: 'select',
        title: '是否优报',
        name: 'sfyb'
      },
      {
        type: 'select',
        title: '是否优报3',
        name: 'sfyb3'
      },
      {
        type: 'select',
        title: '是否优报2',
        name: 'sfyb2'
      }
    ]
  },
  './index.vue',
  './App.vue.hbs'
)
