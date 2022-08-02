<template>
  <div class="x-from-item">
    <div class="main">
      <div class="label">{{ label }}</div>
      <slot></slot>
    </div>
    <div class="error" v-if="error">{{ error }}</div>
  </div>
</template>

<script>
import Schema from 'async-validator';
export default {
  inject: ['form'],
  data() {
    return {
      error: '',
    }
  },
  props: {
    label: {
      type: String,
    },
    prop: {
      type: String
    }
  },
  mounted () {
    this.$on('validate', () => {
      this.validate()
    });
  },
  methods: {
    validate() {
      // 校验规则
      // console.log('validate', this.form.rules[this.prop])   
      let rules = this.form.rules[this.prop]
      let value = this.form.model[this.prop]

      let desc = {[this.prop]: rules}
      let schema = new Schema(desc)
      // 这个 validate 
      // 这个版本的validate 不是一个promise的函数了
      return schema.validate({[this.prop]: value}, (errors) => {
        if(errors) {
          this.error = errors[0].message
        } else {
          this.error = '' 
        }
      })
    }
  },
};
</script>

<style lang="less" scoped>
.x-from-item {
  .main {
    display:flex;
    .label {
      padding-right: 10px;
    }
  }
  .error {
    color: red;
  }
}
</style>
