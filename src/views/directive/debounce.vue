<template>
  <div class="page">
    <el-button type="primary" v-debounce="debounceClick">防抖</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    debounceClick() {
      console.log('只触发一次')
    }
  }
}
</script>
