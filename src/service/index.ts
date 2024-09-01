import axios from 'axios';
import { getToken } from '@/utils';
import router from '@/router';
import { ElMessage } from 'element-plus';

const axiosObect = axios.create({
    timeout: 10000,
});

// 请求拦截器
axiosObect.interceptors.request.use(
    config => {
        console.log(config);
        // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        config.headers['Authorization'] = getToken();
        if (config.method?.toUpperCase() === 'POST' && !config.headers["Content-Type"]) {
            config.headers['Content-Type'] = 'application/json;charset=utf-8';
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    });

// 返回拦截器
axiosObect.interceptors.response.use(
    res => {
        // 该 code 是浏览器层面的状态码
        const { data, code, message } = res;
        return Promise.resolve(data);
    },
    error => {
        console.log(error);
        switch (error.response.status) {
            case 500:
                ElMessage.error('Oops,Server Error.');
                break;
            case 404:
                ElMessage.error('Oops, Not Find!');
                break;
            case 401:
                ElMessage.error('登录失效，即将跳转到登录页');
                router.push("/login");
                break;
            case 400:
                // ElMessage.error('Oops, 400!')
                break;
            // 其他错误，直接抛出错误提示
            default:
                ElMessage.error(error.message);
        }
        return Promise.reject(error);
    }
);

export default axiosObect;