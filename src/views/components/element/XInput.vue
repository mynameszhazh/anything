<template>
  <div class="xinput">
    <input class="input" :type="type" @input="oninput" v-model="value" v-bind='$attrs'/>   
  </div>
</template>

<script>
  export default {
    inheritAttrs: false,
    props: {
      type: {
        type: String,
        default:'text' 
      },
      value: {
        type: String,
        required: true
      }
    },
    methods: {
      oninput(e) {
        this.$emit('input', e.target.value) 
        this.$parent.$emit('validate')
      }
    },   
  }
</script>

<style lang="less" scoped>
.xinput {
  .input {
    border: 1px solid yellow;
  }
}
</style>