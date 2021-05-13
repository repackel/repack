<template>
  <section class="full-page repack-page">
    <slot name="pageBegin"></slot>
    <div class="full-page-inner" :class="{hasLeft:cfg.hasLeft}">
      <div class="action-bar repack-action-bar" :class="cfg.actionAlign" v-if="cfg.actionList && cfg.actionList.length">
        <div v-for="(x,i) in (cfg.actionAlign ==='between' ? cfg.actionList:[cfg.actionList]  )" :key="i">
          <el-button :type="y.type||'primary'" :plain="y.plain" :icon="y.icon" :size="baseConfig.size" @click="y.fn ? y.fn() : $emit(y.e)" v-for="(y,j) in x" :key="j">{{y.name}}</el-button>
        </div>
      </div>
      <slot name="beforeTable"></slot>
      <el-form :inline="true" class="repack-search-form" label-width="6em" v-if="!cfg.hideSearchForm">
        <slot name="searchBegin"></slot>
        <template v-for="(x,i) in (cfg.searchList && cfg.searchList.filter(x=>x))">
          <el-form-item :label="x.name" :key="i" v-if="!x.hidden" :class="x.itemClassName">
            <template v-if="x.type==='input'">
              <el-input v-model="queryParams[x.key]" v-bind="inputcfg(x, i)" @keyup.enter.native="getList()" :value="x.value" />
            </template>
            <template v-else-if="x.type==='select'">
              <el-select v-model="queryParams[x.key]" v-bind="inputcfg(x, i)">
                <el-option v-for="dict in ( x.list instanceof Array ? x.list : queryList[x.list||x.key] || [] )" :key="dict.val" :label="dict.name" :value="x.useLabel ? dict.name : dict.val" />
              </el-select>
            </template>
            <template v-else-if="x.type==='date'">
              <el-date-picker type="daterange" v-model="searchDateArr" v-bind="inputcfg(x, i)" @change="arr=>dateChange(arr,x)">
              </el-date-picker>
            </template>
            <template v-else-if="x.type==='datetime'">
              <el-date-picker type="datetimerange" v-model="searchDateArr" v-bind="inputcfg(x, i)" @change="arr=>dateChange(arr,x)">
              </el-date-picker>
            </template>
            <template v-else-if="x.type==='date1'">
              <el-date-picker type="date" v-model="queryParams[x.key]" v-bind="inputcfg(x, i)">
              </el-date-picker>
            </template>
            <template v-else-if="x.type==='slot'">
              <slot name="searchbox" v-bind="inputcfg(x, i)"></slot>
            </template>
          </el-form-item>
          <br class="break" :key="i" v-if="x.br" />
        </template>
        <el-form-item class="repack-search-btns">
          <el-button type="primary" icon="el-icon-search" :size="baseConfig.size" @click="searchButton" v-if="searchCfg.queryText || searchCfg.queryBtn + '' === '2' ">{{searchCfg.queryText || locz('search') }}</el-button>
          <el-button type="plain" icon="el-icon-refresh-right" :size="baseConfig.size" @click="resetQuery" v-if="searchCfg.resetText || searchCfg.queryBtn + '' === '2'">{{searchCfg.resetText || locz('reset') }}</el-button>
        </el-form-item>
      </el-form>
      <div class="customTable repack-custom-table" v-if="cfg.customTable" v-loading="loading">
        <slot name="customTable"></slot>
      </div>
      <el-table :data="tableData" class="repack-table" v-loading="loading" v-bind="tableProps" @selection-change="handleSelectionChange" @current-change="handleTableCurrentChange" v-else>
        <el-table-column type="selection" width="55" v-if="cfg.tableSelection" fixed="left" :selectable="cfg.selectable"/>
        <el-table-column type="index" width="80" :label="locz('index')" />
        <template v-for="(x,i) in (cfg.tableList && cfg.tableList.filter(x=>x && !x.hidden) || [])">
          <el-table-column v-bind="colcfg(x,i)" :key="i" v-if="x.buttonList" :fixed="(x.fixed==='false' || x.fixed=== false )? false : x.fixed || 'right'">
            <template slot-scope="scope">
              <template v-for="(y,j) in x.buttonList">
                <el-button :size="y.size" :type="y.type|| 'text'" :key="j" @click="y.fn ? y.fn(scope.row,scope.$index) : void 0" v-bind="genAttr(y,scope)" v-if="!y.hidden || !(y.hidden && y.hidden(scope.row,scope.$index) )">
                  {{ typeof y.text === 'function' ? y.text(scope.row,scope.$index) : y.text }}
                </el-button>
              </template>
            </template>
          </el-table-column>
          <el-table-column v-bind="colcfg(x,i)" :key="i" v-else-if="x.type==='switch'">
            <template slot-scope="scope">
              <el-switch v-model="scope.row[x.prop]" v-bind="x.bindAttr" @change=" newVal => x.change ? x.change(newVal,scope.row,scope.$index) : void 0"></el-switch>
            </template>
          </el-table-column>          
          <el-table-column v-bind="colcfg(x,i)" :key="i" v-else-if="x.type==='image'||x.viewImg">
            <template slot-scope="scope">
              <el-image class="repack-table-view-image" fit="contain" :src="x.transform(scope.row)" :preview-src-list="[x.transform(scope.row)]" v-if="x.transform">
              </el-image>
              <el-image class="repack-table-view-image" fit="contain" :src="scope.row[x.prop]" :preview-src-list="[scope.row[x.prop]]" v-else>
              </el-image>
            </template>
          </el-table-column>
          <el-table-column v-bind="colcfg(x,i)" :key="i" v-else-if="x.transform || x.class || x.style || cfg.tableCellFallbackText ">
            <template slot-scope="scope">
              <span v-bind="genAttr(x,scope)" @click="x.fn ? x.fn(scope.row,scope.$index) : void 0">{{ fallbackText(x.transform ? x.transform(scope.row) : scope.row[x.prop]) }}</span>
            </template>
          </el-table-column>
          <el-table-column v-bind="colcfg(x,i)" :key="i" v-else />
        </template>
      </el-table>
      <div class="pager-container repack-pagination" v-if="!cfg.hidePagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryParams[pageIndexKey]" :page-sizes="pageList" :page-size="queryParams[pageSizeKey]" layout="total, sizes, prev, pager, next, jumper" :total="tableTotal">
        </el-pagination>
      </div>
    </div>
  </section>
</template>

<script>
import { genAttr, locz, inputcfg } from "../commonFn/commonFn.js";
export default {
  name: "rl-table",
  props: ["cfg"],
  data() {
    return {
      pageIndexKey: (this.cfg.pageAlias && this.cfg.pageAlias.current) || "pageIndex",
      pageSizeKey: (this.cfg.pageAlias && this.cfg.pageAlias.size) || "pageSize",
      baseConfig: {
        size: "small",
      },
      tableProps: {
        stripe: true,
      },
      loading: false,
      // hidden: false,
      searchDateArr: [],
      queryParams: {},
      queryList: {},
      tableData: this.cfg.tableData || [],
      tableTotal: 0,
      dialogVisible: false,
      searchCfg: {
        queryBtn: 2,
      },
      currentPage: 1,
      imageList: [],
      pageList: this.cfg.pageSizes || [10, 50, 100, 150],
    };
  },
  computed: {},
  mounted() {
    this.queryParams = Object.assign(
      {
        [this.pageIndexKey]: 1,
        [this.pageSizeKey]: 10,
      },
      this.cfg.queryParams || {}
    );
    // Search Select List
    this.searchCfg = this.cfg.searchCfg || this.searchCfg;
    this.tableProps = Object.assign(this.tableProps, this.cfg.tableProps || {});
    this.baseConfig = Object.assign(this.baseConfig, this.cfg.baseConfig || {});
    // dictList only available when $dictArr exit
    if (this.$dictArr && this.cfg.searchList) {
      const dictList = this.cfg.searchList.map((x) => !(x.list instanceof Array) && x.list).filter((x) => x) || [];

      if (dictList.length) {
        this.$dictArr(...dictList).then((res) => dictList.forEach((x, i) => this.$set(this.queryList, x, res[i])));
      }
    }
    this.$nextTick((_) => {
      const hasVal = this.cfg.searchList && this.cfg.searchList.find((x) => x && x.type === "input" && x.value);
      if (hasVal) {
        this.queryParams[hasVal.key] = hasVal.value;
        this.getList();
      } else {
        this.getList("reset");
      }
      // fetchConditionFn
      if (this.cfg.fetchConditionFn) {
        this.cfg
          .fetchConditionFn()
          .then((res) => {
            Object.entries(res).forEach((x) => this.$set(this.queryList, x[0], x[1]));
          })
          .catch((err) => {
            console.log("err", err);
          });
      }
    });
  },
  methods: {
    genAttr,
    locz,
    inputcfg,
    fallbackText(val) {
      if (this.cfg.tableCellFallbackText && [null, undefined, ""].includes(val)) {
        return this.cfg.tableCellFallbackText;
      } else {
        return val;
      }
    },
    getList(reset) {
      // Search FN
      if (this.cfg.searchFn) {
        this.loading = true;
        this.cfg
          .searchFn(this.queryParams, reset)
          .then((res) => {
            if (res) {
              this.tableData = res.list;
              this.tableTotal = res.total;
            }
          })
          .catch((e) => {
            console.error(e);
          })
          .finally((f) => {
            this.loading = false;
          });
      }
    },
    colcfg: (x, i) => ({
      label: x.label,
      width: x.width,
      minWidth: x.minWidth,
      prop: x.prop,
      align: x.align,
      showOverflowTooltip: x.overflow,
      fixed: x.fixed,
      ...x,
    }),
    dateChange(arr, x) {
      [this.queryParams[x.key1], this.queryParams[x.key2]] = arr || [];
      if (this.queryParams[x.key2]) {
        this.queryParams[x.key2] = this.queryParams[x.key2].replace("00:00:00", "23:59:59");
      }
    },
    handleSizeChange(size) {
      this.queryParams[this.pageIndexKey] = 1;
      this.queryParams[this.pageSizeKey] = size;
      this.getList();
    },
    handleCurrentChange(page) {
      this.queryParams[this.pageIndexKey] = page;
      this.getList();
    },
    searchButton() {
      this.queryParams[this.pageIndexKey] = 1;
      this.getList();
    },
    resetQuery() {
      this.queryParams = { [this.pageSizeKey]: this.queryParams[this.pageSizeKey] };
      this.queryParams[this.pageIndexKey] = 1;
      this.searchDateArr = [];
      this.getList("reset");
    },
    handleSelectionChange(val) {
      this.$emit("getSelection", val);
    },
    handleTableCurrentChange(val) {
      this.$emit("getCurrent", val);
    },
  },
};
</script>