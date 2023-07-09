<template>
  <el-container class="home">
    <el-aside width="200px">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        style="height: 100%;"
        active-text-color="#ffd04b"
      >
        <el-submenu
          :index="meau.name"
          v-for="(meau, index) of routesMeaus"
          :key="index"
        >
          <template slot="title">
            <!-- <i class="el-icon-location"></i> -->
            <span>{{ meau.name }}</span>
          </template>
          <template v-for="(item, indey) of meau.children">
            <router-link :to="`/${meau.name}/${item.name}`">
              <el-menu-item :index="`${index}-${indey}`">{{
                item.name
              }}</el-menu-item>
            </router-link>
          </template>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="page-header">
        <el-dropdown class="user-info" size="medium" @command="handleCommand">
          <span class="el-dropdown-link">
            <!-- {{ userInfo.name }}<i class="el-icon-arrow-down el-icon--right"></i> -->
            <el-button @click="loginout">退出登录</el-button>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container class="page-content">
        <router-view />
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import { routesMeaus } from '../router/index'
export default {
  name: 'layout',
  data() {
    return {}
  },
  computed: {
    routesMeaus() {
      return routesMeaus
    }
  },
  components: {},
  methods: {
    loginout() {
      this.$router.push('/login')
      localStorage.removeItem('token')
    },
    handleCommand(command) {
      switch (command) {
        case 'logout':
          {
          }
          break
        default:
          break
      }
    }
  }
}
</script>
<style scoped lang="less">
.home {
  width: 100%;
  height: 100%;
  .page-header {
    line-height: 60px;
    overflow: hidden;
    border-bottom: 1px solid #eaecef;
    box-shadow: 0 1px 4px #eaecef;
    .user-info {
      float: right;
    }
  }
  .page-content {
    padding: 10px;
  }
}
</style>
