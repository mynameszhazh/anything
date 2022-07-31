<template>
 <div class="page">
  <h2>我的这个表单不能出现图片之类的东西</h2>
  <el-input  v-model='text' type="text" v-emoji />
 </div> 
</template>

<script>
  export default {
    data() {
      return {
        text: '',
      }
    },
  }
</script>
<style scoped lang="less">
 .el-button {
  margin-top: 20px;
 }
</style>