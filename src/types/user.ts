export type loginType = {
    password?: string;
    username: string;
}

export type UserType = {
    id: number;
    username: string;
    nickname: string;
    email: string | null;
    avatar: string | null;
    createTime: string;
    updateTime: string;
}


