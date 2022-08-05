<template>
  <div class="Notice" :class="type" v-if="isshow">
    <div class="close" @click="handleClose">关闭</div>
    <div class="massge" :class="type + '-msg'">
      {{ message }}
    </div>
  </div>
</template>

<script>
import { clearTimeout } from 'timers';

export default {
  props: {
    message: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      default: 3000,
    },
    type: {
      type: String,
      default: "success", // error | waring | success
      validator(value) {
        return ["error", "waring", "success"].includes(value);
      },
    },
  },
  data() {
    return {
      isshow: false,
      timer: null
    };
  },
  mounted() {},
  methods: {
    show() {
      this.isshow = true;
      this.timer = setTimeout(() => {
        this.remove();
      }, this.duration);
    },
    hide() {
      this.isshow = false;
      // this.remove();
    },
    handleClose() {
      this.remove();
    },
  },
};
</script>

<style lang="less" scoped>
.Notice {
  width: 500px;
  height: 300px;
  border: 1px solid blue;
  position: fixed;
  top: 200px;
  left: 50%;
  transform: translate(-50%, -50%);

  .massge {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: blue;
    font-size: 38px;
    text-align: center;
  }
  .error-msg {
    color: red;
  }
  .waring-msg {
    color: yellow;
  }
  .success-msg {
    color: blue;
  }
  .close {
    position: absolute;
    right: 0;
    top: 0;
  }
}
.error {
  border-color: red;
}
.success {
  border-color: blue;
}
.waring {
  border-color: yellow;
}
</style>
