const { compilerFn } = require('./core.js')
console.log('compilerFn:', compilerFn)
compilerFn(
  {
    data: [{ name: 1 }, { name: 2 }]
  },
  './ret.js',
  './all.js.hbs'
)
