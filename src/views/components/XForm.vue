<template>
  <div class="xform">
    <slot></slot>
  </div>
</template>

<script>
export default {
  provide() {
    return {
      form: this
    }
  },
  data() {
    return {};
  },
  props: {
    model: {
      type: Object,
      required: true
    },
    rules: {
      type: Object,
      default: () => {}
    },
  },
  methods: {},
};
</script>

<style lang="less" scoped></style>
