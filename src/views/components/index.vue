<template>
  <div class="box">
    <XForm :model="userInfo" :rules="rules">
      <x-from-item label="姓名" prop="userName">
        <Xinput
          v-model="userInfo.userName"
          @input="inputchange(1, $event)"
        ></Xinput>
      </x-from-item>
      <x-from-item label="密码" prop="password">
        <Xinput
          v-model="userInfo.password"
          placeholder="请输入密码"
        ></Xinput>
      </x-from-item>
    </XForm>
  </div>
</template>

<script>
import Xinput from "./XInput.vue";
import XFromItem from "./XFromItem.vue";
import XForm from "./XForm.vue";
export default {
  data() {
    return {
      userInfo: {
        userName: "xjh",
        password: "12345",
      },
      rules: {
        userName: [
          {
            required: true,
            message: "请输入用户名",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
          },
        ],
      },
    };
  },
  methods: {
    inputchange(flag, value) {
      if (flag == 0) return;
      this.userInfo.userName = value;
    },
  },
  components: {
    Xinput,
    XFromItem,
    XForm,
  },
};
</script>

<style lang="less" scoped></style>
