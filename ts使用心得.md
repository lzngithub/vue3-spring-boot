# ts使用心得

## 场景一

定义下面的数据时会报错：

```TS
export const statusObject = {
    "0": '草稿',
    "1": "已发布"
}

export const statusMap = Object.keys(statusObject).map((item) => ({
    value: Number(item),
    label: statusObject[item], // 报错：No index signature with a parameter of type 'string' was found on type '{ "0": string; "1": string; }'.
}))
```

大概意思就是item的为string类型，不能用作statusObject对象的键值。原因在于ts的类型推断推不出item其实是 "0" | "1" 类型

解决办法：

1. 定义 statusObject 对象 的类型为 { [key: string]: string; }

```TS
export const statusObject: { [key: string]: string; } = {
    "0": '草稿',
    "1": "已发布"
}

export const statusMap = Object.keys(statusObject).map((item) => ({
    value: Number(item),
    label: statusObject[item]
}))
```

2. 在 item 使用的时候使用断言 来指定 item的值为 "0" | "1", 推荐使用这种

```TS
export const statusObject = {
    "0": '草稿',
    "1": "已发布"
}

type keysType = "0" | "1"

export const statusMap = Object.keys(statusObject).map((item) => ({
    value: Number(item),
    label: statusObject[item as keysType]
}))
```
