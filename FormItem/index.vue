<template>
    <el-form-item :label="x.name" :rules="rules(x)" :class="{'inline-block':x.inline}">
        <template v-if="x.type==='input'">
            <el-input v-model="form[x.key]" v-bind="inputcfg(x)" />
        </template>
        <template v-else-if="x.type==='select'">
            <el-select v-model="form[x.key]" v-bind="inputcfg(x)">
                <el-option v-for="dict in (x.dict ? dictList : x.list || [])" :key="dict.val" :label="dict.name" :value="dict.val" />
            </el-select>
        </template>
        <template v-else-if="x.type==='date'">
            <el-date-picker v-model="form[x.key]" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" v-bind="inputcfg(x)" value-format="yyyy-MM-dd">
            </el-date-picker>
        </template>
        <template v-else-if="x.type==='date1'">
            <el-date-picker v-model="form[x.key]" type="date" placeholder="选择日期" v-bind="inputcfg(x)" value-format="yyyy-MM-dd">
            </el-date-picker>
        </template>
        <template v-else>
            <slot></slot>
        </template>
    </el-form-item>
</template>
<script>
const tipsFn = x => {
  if (x.type === "input") {
    return "请输入" + x.name;
  } else if (x.type === "select") {
    return "请选择" + x.name;
  }
};
export default {
  name: "rl-form-item",
  props: ["x", "form"],
  data() {
    const self = this;
    return {
      queryParams: {},
      dictList: []
    };
  },
  async mounted() {
    if (this.x.dict) {
      this.dictList = await this.$dict(this.x.dict);
    }
  },
  computed: {},
  methods: {
    inputcfg: x => ({
      clearable: true,
      size: "small",
      filterable: Boolean(x.dict),
      style: x.width ? "width:" + x.width : "",
      class: x.class,
      placeholder: tipsFn(x),
      maxlength: x.type === "input" ? x.maxlength || 50 : null
    }),
    rules: x => [
      {
        required: ! x.norule ,
        message: tipsFn(x),
        trigger: x.type === "select" ? "change " : "blur"
      }
    ]
  }
};
</script>
