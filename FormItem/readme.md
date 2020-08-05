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
    <el-input v-if="x.name==='建筑面积'" v-model="form.acreage" placeholder="建筑面积" size="small">
        <template slot="append">m²</template>
    </el-input>
</form-item>
```

3. 列表字段

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
| type | `input` `select` | `String` | 必传 |"select" |
| key | 表单的键 | `String` | 必传 | "housingCategory"  |
| list | 下拉类型的列表 | `Array` | 必传 | this.$dictLoc("房屋类型") |
| maxlength | 输入框的长度 | `Number`| 50| 11 |
| inline | 行内 | `Boolean` | `false` | true  |
| class | css 类名 | `String` | 无 | 'w300'  |
| width | 宽度 | `String` | 无 | '150px'  |
| size | element size | `String` | small | 'small'  |
| placeholder | 占位符 | `String` | 请输入/请选择 | '请输入'  |
| filterable | 可筛选 | `Boolean` | 无 | true  |
| clearable | 可清空 | `Boolean` | 无 | true  |
