const express = require('express')
const app = express()
app.get('/api/courses', (req, res) => {
  setTimeout(() => {
    res.json([{ name: 'xjh1', age: 18 }, { name: 'xjh2', age: 181 }])
  }, 1000);
})
app.listen(3000,() => {
  console.log('running port at 3000')
})