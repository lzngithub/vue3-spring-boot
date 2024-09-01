import { type UserType } from "@/types/user";

export const getToken = () => {
    return localStorage.getItem("Authorization");
};

export const setToken = (token: string) => {
    localStorage.setItem("Authorization", token);
};

export const setUserInfo = (userInfo: UserType) => {
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
};

export const getUserInfo = () => {
    const userInfo = localStorage.getItem("userInfo");
    return userInfo ? JSON.parse(userInfo) : userInfo;
};

