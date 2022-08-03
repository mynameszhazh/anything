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
import Xinput from "./element/XInput.vue";
import XFromItem from "./element/XFromItem.vue";
import XForm from "./element/XForm.vue";
import Notice from "../../components/Notice.vue";
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
          // alert("login 成功");
          const comp = this.$createComp(Notice, {
            message: "login 成功",
            type: "success",
          });
          comp.show();
        } else {
          // this.$message.error("登录失败");
          const comp = this.$createComp(Notice, {
            message: "登录失败",
            type: "error",
            duration: 5000,
          });
          comp.show();
          setTimeout(() => {
            comp.hide() 
          }, 1000);
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
