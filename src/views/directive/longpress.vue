<template>
  <div class="page">
    <el-button type="primary" v-longpress="longpress">长按</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    longpress() {
      alert('长按指令生效')
    }
  }
}
</script>
