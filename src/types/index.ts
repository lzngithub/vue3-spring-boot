export type Result = {
    code: number;
    data: null;
    message: string;
}

export type pageType = {
    currentPage: number;
    pageSize: number;
    total?: number;
}