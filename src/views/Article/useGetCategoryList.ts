import { categoryListService } from "@/service/category";
import type { categoryType } from "@/types/category";
import { ref, type Ref } from "vue";

export function useGetCategoryList() {
  const categoryList: Ref<categoryType[]> = ref([]);
  const getCategoryList = async () => {
    const { code, data } = await categoryListService({});
    if (code === 200) {
      categoryList.value = data;
    }
  };
  getCategoryList();
  return { categoryList };
}