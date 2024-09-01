import api from './index';
import type { loginType } from "@/types/user";

export const login = (params: loginType) => (api.post('/api/user/login', params, {
    headers: {
        "Content-Type": 'application/x-www-form-urlencoded'
    }
}));

export const registerService = (params: loginType) => (api.post('/api/user/register', params, {
    headers: {
        "Content-Type": 'application/x-www-form-urlencoded'
    }
}));

export const getUserInfoService = () => (api.get('/api/user/userInfo'));