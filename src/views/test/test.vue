<template>
  <div class="box">
    {{name}}
    <div class="text">
      <ul>
        <li v-for="item of xjhList">{{item.name}}-{{item.age}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getXJHInfo } from '../../api/test/mock'
  export default {
    data() {
      return {
        name: '123',
        xjhList: []
      }
    },
    async created () {
      this.xjhList = await getXJHInfo()
      console.log(this.xjhList)
    },
  }
</script>

<style lang="less" scoped>
.box {
  color: red;
  .text {
    color: yellow;
  }
}
</style>