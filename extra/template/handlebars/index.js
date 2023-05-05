const fs = require("fs");
// import fs from 'fs' 
const handlebars = require("handlebars");

function compilerFn(meta, filePath, templatePath) {
  if (fs.existsSync(templatePath)) {
    const content = fs.readFileSync(templatePath).toString();
    const result = handlebars.compile(content)(meta);
    fs.writeFileSync(filePath, result);
  }
}

compilerFn({
  list: [
    {
      name: 123,
      title: 'title'
    },
    {
      name: 456,
      title: 'title2'
    },
  ]
}, './index.vue', './App.vue.hbs')