<template>
  <div class="xform">
    <slot></slot>
  </div>
</template>

<script>
export default {
  componentName: 'XForm',
  provide() {
    return {
      form: this,
    };
  },
  data() {
    return {};
  },
  props: {
    model: {
      type: Object,
      required: true,
    },
    rules: {
      type: Object,
      default: () => {},
    },
  },
  created () {
    this.fields = [];
    this.$on('x.form.addField', (field) => {
      this.fields.push(field)
    })
    this.$on('x.form,removeField', (field)  => {
      // this.field.splice()
    }) 
  },
  methods: {
    validate(cb) {
      // let resultArr = this.$children
      //   .filter(item => item.prop)
      //   .map(item => {
      //     // console.log(item.validate())
      //     return item.validate()
      //   })
      let resultArr = this.fields.map(item => item.validate())
      Promise.all(resultArr)
        .then(res => {
           cb(true)
        })
        .catch(err => cb(false))
    },
  },
};
</script>

<style lang="less" scoped></style>
