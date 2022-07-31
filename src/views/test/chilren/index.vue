<template>
  <div>
    <SubChileren></SubChileren>        
  </div>
</template>

<script>
  import SubChileren  from './subchildren.vue'
  export default {
    data() {
      return {
        msg:  'subchildren'
      }
    }, 
    components: {
      SubChileren,
    },
  }
</script>

<style lang="scss" scoped>

</style>