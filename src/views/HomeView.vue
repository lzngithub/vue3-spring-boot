<script setup lang="ts">
import { RouterView, useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const logout = () => {
  router.push('/login');
};
const changeMenu = (value: any) => router.push(`/home/${value}`);
</script>

<template>
  <div class="layout">
    <div class="header">
      <span class="text-large font-600 mr-3"> home </span>
      <el-button @click="logout">退出登录</el-button>
    </div>
    <el-row class="content">
      <el-col :span="4">
        <el-menu :default-active="route.name" class="el-menu-vertical-demo" @select="changeMenu">
          <el-menu-item index="category">
            <span>类别管理</span>
          </el-menu-item>
          <el-menu-item index="article">
            <span>文章管理</span>
          </el-menu-item>
          <el-menu-item index="userInfo">
            <span>个人中心</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20">
        <RouterView> </RouterView>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="less">
.layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.header {
  display: flex;
  flex-grow: 0;
  padding: 1.5rem;
  margin: 0.5px;
  border-bottom: 1px solid #dcdfe6;
  justify-content: space-between;
}
.content {
  flex-grow: 1;
}
.el-menu-vertical-demo {
  height: 100%;
}
</style>
