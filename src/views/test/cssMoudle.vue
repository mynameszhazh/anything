<template>
  <div :class="[$style.box, 'box2']">
    {{ name }}
    <div :class="{[$style.text]: false, active: false}">
      我就是一个text
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '123'
    }
  },
  computed() {
  },
}
</script>

<style scoped module>
.box {
  color: red;
}

.text {
  color: yellow;
}
</style>

<style lang="less" scoped>

.box2 {
  font-size: 44px;
}
.active {
  font-weight: 700; 
}
</style>
