<template>
  <div class="box">
    <!-- <Children></Children> -->
    <!-- <button @click="onclick">changefoo</button> -->
    <input aria-label="input" value="1333"/>
  </div>
</template>

<script>
import { getXJHInfo } from "../../api/test/mock";
import Children from "./chilren/index.vue";
export default {
  provide() {
    return {
      list: this.xjhList,
      foo: "test, foo",
    };
  },
  data() {
    return {
      name: "123",
      xjhList: [],
    };
  },
  async created() {
    this.xjhList = await getXJHInfo();
  },
  components: {
    Children,
  },
  methods: {
    onclick() {
      console.log('change')
      this.foo = 'change test.foo' 
    }
  },
};
</script>

<style lang="less" scoped>
.box {
  color: red;
  .text {
    color: yellow;
  }
}
</style>
