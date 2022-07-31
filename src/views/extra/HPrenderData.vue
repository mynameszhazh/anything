<template>
  <div>
    <h1>High performance rendering data</h1>
    <ul id="container" class="content-ui"></ul>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  mounted() {
    // 1.直接使用最暴力的方式进行渲染=
    // this.rudepageInit()

    // 2.通过计时器, 将渲染过程分批进行
    // this.STOpageInit()

    // 3. requestAnimationFrame, 通过 60fps 的操作
    this.requestAnimationFramePageInit()

    // 4. DocumentFragment, 并不是一次性加载到 window中
    // this.DocumentFragmentPageInit()
  },
  methods: {
    rudepageInit() {
      // 记录任务开始时间
      let now = Date.now()
      // 插入十万条数据
      const total = 100000
      // 获取容器
      let ul = document.getElementById('container')
      // 将数据插入容器中
      for (let i = 0; i < total; i++) {
        let li = document.createElement('li')
        li.innerText = ~~(Math.random() * total)
        ul.appendChild(li)
      }

      console.log('JS运行时间：', Date.now() - now)
      setTimeout(() => {
        // 注意这个是在之后原生处理 挂载之后执行
        console.log('总运行时间：', Date.now() - now)
      }, 0)
      // print: JS运行时间： 138
      // print: 总运行时间： 1641
    },
    STOpageInit() {
      //需要插入的容器
      let ul = document.getElementById('container')
      // 插入十万条数据
      let total = 100000
      // 一次插入 20 条
      let once = 20
      //总页数
      let page = total / once
      //每条记录的索引
      let index = 0
      //循环加载数据
      function loop(curTotal, curIndex) {
        if (curTotal <= 0) {
          return false
        }
        //每页多少条
        let pageCount = Math.min(curTotal, once)
        setTimeout(() => {
          for (let i = 0; i < pageCount; i++) {
            let li = document.createElement('li')
            li.innerText = curIndex + i + ' : ' + ~~(Math.random() * total)
            ul.appendChild(li)
          }
          loop(curTotal - pageCount, curIndex + pageCount)
        }, 0)
      }
      loop(total, index)
    },
    requestAnimationFramePageInit() {
      //需要插入的容器
      let ul = document.getElementById('container')
      // 插入十万条数据
      let total = 100000
      // 一次插入 20 条
      let once = 20
      //总页数
      let page = total / once
      //每条记录的索引
      let index = 0
      //循环加载数据
      function loop(curTotal, curIndex) {
        if (curTotal <= 0) {
          return false
        }
        //每页多少条
        let pageCount = Math.min(curTotal, once)
        window.requestAnimationFrame(function() {
          for (let i = 0; i < pageCount; i++) {
            let li = document.createElement('li')
            li.innerText = curIndex + i + ' : ' + ~~(Math.random() * total)
            ul.appendChild(li)
          }
          loop(curTotal - pageCount, curIndex + pageCount)
        })
      }
      loop(total, index)
    },
    DocumentFragmentPageInit() {
      //需要插入的容器
      let ul = document.getElementById('container')
      // 插入十万条数据
      let total = 100000
      // 一次插入 20 条
      let once = 20
      //总页数
      let page = total / once
      //每条记录的索引
      let index = 0
      //循环加载数据
      function loop(curTotal, curIndex) {
        if (curTotal <= 0) {
          return false
        }
        //每页多少条
        let pageCount = Math.min(curTotal, once)
        window.requestAnimationFrame(function() {
          let fragment = document.createDocumentFragment()
          for (let i = 0; i < pageCount; i++) {
            let li = document.createElement('li')
            li.innerText = curIndex + i + ' : ' + ~~(Math.random() * total)
            fragment.appendChild(li)
          }
          ul.appendChild(fragment)
          loop(curTotal - pageCount, curIndex + pageCount)
        })
      }
      loop(total, index)
    }
  }
}
</script>

<style lang="less" scoped>
.content-ui {
  height: 300px;
  overflow: auto;
}
</style>
