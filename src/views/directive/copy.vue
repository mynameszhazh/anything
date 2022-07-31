<template>
 <div class="page">
  <el-input  v-model='copyText' type="text" />
  <el-button type="primary" v-copy="copyText">复制</el-button>
 </div> 
</template>

<script>
  export default {
    data() {
      return {
        copyText: 'a copy directives',
      }
    },
  }
</script>
<style scoped lang="less">
 .el-button {
  margin-top: 20px;
 }
</style>