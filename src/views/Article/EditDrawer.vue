<script setup lang="ts">
import { ElMessageBox, type FormInstance, type FormRules } from 'element-plus';
import { computed, onMounted, onUpdated, reactive, ref, watch } from 'vue';
import { statusMap, statusObject, type keysType, defaultForm } from './index';
import { useGetCategoryList } from './useGetCategoryList';
import { articleDetailService, addArticleService, editArticleService } from '@/service/article';
import type { articleType } from '@/types/article';

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  id: {
    type: Number,
    required: false
  },
  refresh: {
    type: Function,
    required: true
  }
});
const emit = defineEmits(['update:model-value']);

const direction = ref('rtl');
const drawer = ref(false);
const formInline = reactive(defaultForm());
const { categoryList } = useGetCategoryList();
const ruleFormRef = ref<FormInstance>();
const isEdit = computed(() => Boolean(props.id));
const markdownText = ref('markdown内容');

watch(
  () => props.modelValue,
  (newValue) => {
    drawer.value = newValue;
  }
);
watch([() => props.id, () => props.modelValue], ([id, visible]) => {
  console.log(id, visible);
  if (id && visible) {
    getArticleDetailById(id);
  }
});

onMounted(() => {
  console.log(props.modelValue, drawer.value, 1111);
});

onUpdated(() => {
  console.log(props.modelValue, drawer.value, 1111);
});

const getArticleDetailById = async (id: number | undefined) => {
  console.log(formInline, defaultForm(), Object.assign(formInline, defaultForm()));
  if (id === undefined) return Object.assign(formInline, defaultForm());
  const { code, data } = await articleDetailService(id);
  if (code === 200) Object.assign(formInline, data);
};

function cancelClick() {
  emit('update:model-value', false);
}
function confirmClick(formEl: FormInstance | undefined) {
  console.log('submit');
  if (!formEl) return;
  formEl.validate((valid) => {
    if (!valid) return;
    ElMessageBox.confirm(`你确定提交吗?`)
      .then(async () => {
        if (isEdit.value) {
          await editArticle(formInline);
        } else {
          await addArticle(formInline);
        }
        emit('update:model-value', false);
        props.refresh();
      })
      .catch(() => {});
  });
}
const editArticle = async (params: articleType) => {
  const { code } = await editArticleService({ ...params, id: props.id });
  if (code === 200) return Promise.resolve();
};
const addArticle = async (params: articleType) => {
  const { code } = await addArticleService(params);
  if (code === 200) return Promise.resolve();
};
const handleClose = () => {
  emit('update:model-value', false);
};
</script>
<template>
  <el-drawer
    size="75%"
    v-model="drawer"
    title="I am the title"
    :direction="direction"
    :before-close="handleClose"
  >
    <template #header>
      <h4>修改标题</h4>
    </template>
    <template #default>
      <div>
        <el-form ref="ruleFormRef" :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="标题" prop="title" required>
            <el-input v-model="formInline.title" placeholder="请输入" clearable />
          </el-form-item>
          <el-form-item label="内容" required prop="content">
            <el-input v-model="formInline.content" placeholder="请输入" clearable />
          </el-form-item>
          <el-form-item label="类别" required prop="categoryId">
            <el-select v-model="formInline.categoryId" placeholder="请选择" clearable>
              <el-option
                v-for="item in categoryList"
                :key="item.id"
                :label="item.categoryName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="状态" required prop="status">
            <el-select v-model="formInline.status" placeholder="请选择" clearable>
              <el-option
                v-for="item in statusMap"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <v-md-editor v-model="markdownText" height="400px"></v-md-editor>
      </div>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick">取消</el-button>
        <el-button type="primary" @click="confirmClick(ruleFormRef)">提交</el-button>
      </div>
    </template>
  </el-drawer>
</template>
<style scoped lang="less">
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}
</style>
