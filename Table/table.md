## 表格文档


### 引入
1. 引入 
```
import { Table } from "@repackel/repack";

```
```
  components: {
    [Table.name]: Table,
  },
```
```
<rl-table :cfg="cfg" ref="staffTable" @getSelection="getSelection" @treeClick="getTree"></rl-table>
```

### 配置

1. `cfg` 配置
```
{
  tree: true, // 是否显示树
  treeName: "小区", //页面名称
  rightName: "人员信息", // 页面名称
  actionList:[], // 操作按钮列表
  actionAlign: "right", // 操作按钮对齐
  searchList:[], // 搜索列表
  searchFn: Function, // 搜索方法
  tableSelection: true, // 表格是否可勾选
  tableList:[], // 表格表头
}
```