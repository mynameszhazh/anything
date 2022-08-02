<template>
  <div class="xform">
    <slot></slot>
  </div>
</template>

<script>
export default {
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
  methods: {
    validate(cb) {
      let resultArr = this.$children
        .filter(item => item.prop)
        .map(item => {
          // console.log(item.validate())
          return item.validate()
        })
      console.log(resultArr)
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
