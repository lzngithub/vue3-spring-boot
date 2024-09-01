import api from './index';
import type { articleType } from "@/types/article";
import type { pageType } from "@/types";

export const articleListService = (params: articleType & pageType) => (api.post('/api/article/list', params));
export const addArticleService = (params: articleType) => (api.post('/api/article/add', params));
export const editArticleService = (params: articleType) => (api.post('/api/article/edit', params));
export const articleDetailService = (id: number) => (api.get(`/api/article/detail/${id}`));
export const deleteArticleService = (id: number) => (api.delete(`/api/article/delete/${id}`));
