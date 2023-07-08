<template>
  <div class="main">
    <div class="login-box">
      <el-form
        :model="formData"
        status-icon
        ref="formData"
        label-width="100px"
        class="demo-formData"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formData.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="formData.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('formData')"
            >提交</el-button
          >
          <el-button type="danger" @click="$router.push('/excel/home')"
            >危险直连</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        username: 'xjh',
        password: '123456'
      }
    }
  },
  methods: {
    onSubmit() {
      this.$http({
        url: '/api/login',
        method: 'post',
        data: this.formData
      }).then(res => {
        if (res.code == 0) {
          this.$message.warning(res.msg)
          return
        }
        this.$message.success('login 成功')
        this.$router.push('/System/user')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-box {
  width: 500px;
  height: 300px;
  padding: 50px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin: auto;
}
</style>
