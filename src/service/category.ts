import api from './index';

export const categoryListService =
  (params?: { categoryName?: string, categoryAlias?: string }) => (api.post('/api/category/list', params));
