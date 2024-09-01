<script setup lang="ts">
import { reactive, ref, onMounted, type Ref, watch, onUpdated } from 'vue';
import { articleListService, deleteArticleService } from '@/service/article';
import { defaulPage, defaultForm, statusMap, statusObject, type keysType } from './index';
import EditDrawer from './EditDrawer.vue';
import { useGetCategoryList } from './useGetCategoryList';
import { type articleType } from '@/types/article';
import moment from 'moment';
import { ElMessage, ElMessageBox } from 'element-plus';

const formInline = reactive(defaultForm());
const tableData = ref([]);
const visible = ref(false);
const editId: Ref<number | undefined> = ref(0);
const { categoryList } = useGetCategoryList();
const page = reactive(defaulPage());

onMounted(() => {
  onSubmit(1);
});

const onSubmit = async (currentPage: number) => {
  const params = { ...formInline, ...page, currentPage };
  const { code, data } = await articleListService(params);
  if (code === 200) {
    const { list, total, currentPage, pageSize } = data;
    tableData.value = list;
    page.total = total;
    page.currentPage = currentPage;
    page.pageSize = pageSize;
  }
};
const select = () => {
  onSubmit(1);
};
const change = (currentPage: number) => {
  onSubmit(currentPage);
};
const reset = () => {
  Object.assign(formInline, defaultForm());
  onSubmit(1);
};

const handleEdit = (index: number, row: articleType) => {
  editId.value = row.id;
  visible.value = true;
};
const handleDelete = (index: number, row: articleType) => {
  ElMessageBox.confirm('确定删除吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    const { code } = await deleteArticleService(row.id as number);
    if (code === 200) {
      ElMessage({
        type: 'success',
        message: '删除成功'
      });
      reset();
    }
  });
};
const openDrawer = () => {
  editId.value = undefined;
  visible.value = true;
};
onUpdated(() => {});
const closeDrawer = () => {
  visible.value = false;
};
</script>
<template>
  <div class="query-box">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="标题">
        <el-input v-model="formInline.title" placeholder="请输入" clearable />
      </el-form-item>
      <el-form-item label="内容">
        <el-input v-model="formInline.content" placeholder="请输入" clearable />
      </el-form-item>
      <el-form-item label="类别">
        <el-select v-model="formInline.categoryId" placeholder="请选择" clearable>
          <el-option
            v-for="item in categoryList"
            :key="item.id"
            :label="item.categoryName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="formInline.status" placeholder="请选择" clearable>
          <el-option
            v-for="item in statusMap"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="select">查询</el-button>
        <el-button type="info" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="operater-layout">
      <el-button type="primary" @click="openDrawer">新增</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%" class="table-layout">
      <el-table-column type="selection" width="55" fixed />
      <el-table-column prop="title" label="标题" fixed width="180" />
      <el-table-column prop="content" label="内容" width="180" />
      <el-table-column label="类别">
        <template #default="scope">
          <span>{{
            categoryList.find((item) => item.id === scope.row.categoryId)?.categoryName
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template #default="scope">
          <span>{{ statusObject[scope.row.status as keysType] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="创建时间"
        width="180"
        :formatter="(row: articleType) => moment(row.createTime).format('YY-MM-DD HH:mm:ss')"
      />
      <el-table-column
        label="更新时间"
        width="180"
        :formatter="(row: articleType) => moment(row.updateTime).format('YY-MM-DD HH:mm:ss')"
      />
      <el-table-column label="操作" width="130" fixed="right">
        <template #default="scope">
          <el-button text size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">
            编辑
          </el-button>
          <el-button text size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="page-layout"
      background
      layout="prev, pager, next"
      :total="page.total"
      v-model:current-page="page.currentPage"
      v-model:page-size="page.pageSize"
      @current-change="change"
    />
    <EditDrawer v-model="visible" :id="editId" :refresh="reset"></EditDrawer>
  </div>
</template>
<style scoped lang="less">
.query-box {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  margin: 0.5px;
  border-bottom: 1px solid #dcdfe6;
  height: 100%;
}
.demo-form-inline {
}
.operater-layout {
  padding: 1.5rem;
  padding-left: 0;
  padding-top: 0;
  // border-bottom: 1px solid #dcdfe6;
}
.table-layout {
  flex-grow: 1;
}
.page-layout {
  padding-top: 1.5rem;
}
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}
</style>
