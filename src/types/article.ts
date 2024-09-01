export type articleType = {
    id?: number;
    title: string;
    content: string;
    coverImg?: string;
    status: number | undefined;
    categoryId: number | undefined;
    createUser?: number;
    createTime?: string;
    updateTime?: string;
}