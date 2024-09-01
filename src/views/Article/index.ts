export const statusObject = {
    "0": '草稿',
    "1": "已发布"
};

export type keysType = "0" | "1"

export const statusMap = Object.keys(statusObject).map((item) => ({
    value: Number(item),
    label: statusObject[item as keysType]
}));

export const defaultForm = () => ({
    title: '',
    content: '',
    categoryId: undefined,
    status: undefined
});

export const defaulPage = () => ({
    currentPage: 1,
    pageSize: 5,
    total: 100
});
