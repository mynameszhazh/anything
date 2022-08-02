<template>
  <div class="box">
    <XForm :model="userInfo" :rules="rules" ref="xform">
      <x-from-item label="姓名" prop="userName">
        <Xinput
          v-model="userInfo.userName"
          @input="inputchange(1, $event)"
          placeholder="请输入姓名"
        ></Xinput>
      </x-from-item>
      <x-from-item label="密码" prop="password">
        <Xinput v-model="userInfo.password" placeholder="请输入密码"></Xinput>
      </x-from-item>
      <x-from-item>
        <button @click="login">登录</button>
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
        userName: "",
        password: "",
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
    login() {
      this.$refs["xform"].validate((result) => {
        if (result) {
          alert("login 成功");
        } else {
          this.$message.error("登录失败");
        }
      });
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
