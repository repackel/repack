## 组件文档

1. 引入 
```
import { FormItem } from "@repackel/repack";

  components: {
    FormItem,
  },
```
```
<form-item :form="form" :x="x" v-for="(x,i) in list" :key="i">
    <!-- <el-input v-if="x.name==='建筑面积'" v-model="form.acreage" placeholder="建筑面积" size="small">
        <template slot="append">m²</template>
    </el-input> -->
</form-item>
```

**默认插槽：将自定义内容放到 `<form-item></form-item>` 之间即可。可以通过列表项的 `name` 来做判断**

2. 列表字段

列表结构
```
list:[
    {
        name: "房屋类型",
        type: "select",
        inline: true,
        key: "housingCategory",
        list: this.$dictLoc("房屋类型")
    }
]

```

| 键名 | 值 | 类型 | 默认值 | 示例 |
| --- | --- | --- |--- | --- |
| name | 中文名 | `String` |必传 |"房屋类型" |
| type | 见下表 | `String`| 必传 | "select" |
| key | 表单的键 | `String` | 必传 | "housingCategory"  |
| list | 下拉类型的列表 | `Array` | 必传 | this.$dictLoc("房屋类型") |
| pick | 过滤列表，仅保留 val 在数组内的项 | `Array` |   | ['1','2'] |
| maxlength | 输入框的长度 | `Number`| 50| 11 |
| inline | 行内 | `Boolean` | `false` | true  |
| norule | 不校验 | `Boolean` | 无 | true  |
| class | css 类名 | `String` | 无 | 'w300'  |
| width | 宽度 | `String` | 无 | '150px'  |
| size | element size | `String` | small | 'small'  |
| placeholder | 占位符 | `String` | 请输入/请选择 | '请输入'  |
| filterable | 可筛选 | `Boolean` | 无 | true  |
| clearable | 可清空 | `Boolean` | 无 | true  |
| multiple | 同 element-ui | `Boolean` | 无 | true  |
| readonly | 同 element-ui | `Boolean` | 无 | true  |
| disabled | 同 element-ui | `Boolean` | 无 | true  |
| range | 即 min 和 max | `Array` | 无 | [1,20]  |



3. 支持的 form item 类型

| 传值 | 含义 |
| -- | -- |
| `input` | 输入框 |
| `number` | 数字输入框 |
| `textarea` |文本框 |
| `radio` | 单选框 |
| `select`| 下拉框 | 
| `date`| 日期范围 | 
| `date1`| 单个日期 |