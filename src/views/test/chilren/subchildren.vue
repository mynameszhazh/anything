<template>
  <div>
    {{sub}}
  </div>
</template>

<script>
  export default {
    name: 'subchildren',
    inject: {sub: {from: 'foo'}, subList: {from: 'list'}},
    created () {
      console.log(this.subList);
    },
  }
</script>

<style lang="scss" scoped>

</style>