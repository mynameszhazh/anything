<template>
  <div class="xinput">
    <input
      class="input"
      :type="type"
      @input="oninput"
      v-model="value"
      v-bind="$attrs"
    />
  </div>
</template>

<script>
import emitter from "../../../mixins/emitter";
export default {
  inheritAttrs: false,
  mixins: [emitter],
  props: {
    type: {
      type: String,
      default: "text",
    },
    value: {
      type: String,
      required: true,
    },
  },
  methods: {
    oninput(e) {
      this.$emit("input", e.target.value);
      // this.$parent.$emit('validate')
      // 找到第一个 kfromitem的父组件, emit 这个 validate 事件过去
      this.dispatch('XFormItem','validate')
    },
  },
};
</script>

<style lang="less" scoped>
.xinput {
  .input {
    border: 1px solid yellow;
  }
}
</style>
