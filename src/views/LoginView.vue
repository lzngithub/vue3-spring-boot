<script setup lang="ts">
import { reactive, ref } from 'vue';
import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus';
import { login, getUserInfoService, registerService } from '@/service/user';
import { setToken, setUserInfo } from '@/utils';
import { ElMessage } from 'element-plus';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const isLogin = ref(true);

const form = reactive({
  username: '',
  password: ''
});

const submitForm = async () => {
  console.log('登录信息:', form);
  const { code, data, message } = await login(form);
  if (code !== 200) return ElMessage.error(message);
  setToken(data);
  const res = await getUserInfoService();
  if (res.code === 200) {
    setUserInfo(res.data);
    router.push('/home');
    ElMessage.success('登录成功');
  } else {
    ElMessage.error(res.message);
  }
};
const changeRegister = () => {
  console.log('register');
  isLogin.value = false;
};
const register = async () => {
  console.log('注册信息:', form);
  const { code, message } = await registerService(form);
  if (code !== 200) return ElMessage.error(message);
  ElMessage.success('注册成功');
  isLogin.value = true;
};
</script>

<template>
  <div class="login-layout">
    <el-form ref="loginForm" :model="form" label-width="80px">
      <el-form-item label="账号">
        <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item v-if="isLogin">
        <el-button type="primary" @click="submitForm">登录</el-button>
        <el-button @click="changeRegister">注册</el-button>
      </el-form-item>
      <el-form-item v-else>
        <el-button type="primary" @click="isLogin = true">返回登录</el-button>
        <el-button @click="register">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="less">
.login-layout {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-form {
  width: 240px;
}
</style>
