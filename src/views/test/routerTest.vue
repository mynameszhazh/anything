<template>
  <div :class="[$style.box, 'box2']">
    {{ name }}
    <div :class="{[$style.text]: false, active: false}">
      我就是一个text
     <button @click="onClick()">changeRouter</button> 
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
  methods: {
    onClick() {
      this.$router.push({
        name: 'waterMarker'
      })
    }
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
