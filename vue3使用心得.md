# vue3使用心得

## 数组清空与新增

reactive 方式定义的数组：

```TS
const tableData = reactive([]);

// 方式1
tableData.length = 0;
tableData.push(...res.data);

// 方式2
tableData.splice(0, tableData.length, ...res.data)
```

ref 方式定义数组

```TS
const tableData = ref([]);
tableData.value = res.data;
```
