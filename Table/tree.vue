<template>
  <div class="common-tree-box">
    <div class="tree-title">{{ treeName || '区域' }} </div>
    <el-tree class="common-tree" :load="loadNode" :props="props" lazy node-key="buildingId" @node-click="handleNodeClick"></el-tree>
    <!-- :default-expanded-keys="[ 3, 11]" -->
  </div>
</template>

<script>
export default {
  props: ["treeName", "treeLev"],
  data() {
    return {
      data: [],
      props: {
        label: "buildingName",
        isLeaf: "leaf"
      },
      buildingId: ""
    };
  },
  mounted() {},
  methods: {
    async loadNode({ level, key, label }, resolve) {
      let params = {
        buildingType: level + 1
      };
      if (key) {
        params.paraentId = key;
      }
      // if ( level > this.lev - 1 ) {
      //   resolve([]);
      //   return
      // }

      // if (level == 3) {
      //   const res = await this.$req("/community/house/list", {
      //     method: "GET",
      //     params: {
      //       buildingId: key
      //     }
      //   });
      //   return resolve(res.rows);
      // }
      const res = await this.$req("/community/building/list", {
        method: "GET",
        params
      });

      return resolve(
        res.rows.map(x => ({
          ...x,
          leaf: level > this.treeLev - 2
        }))
      );

      return;
      if (level == 4) return resolve([]);
    },
    handleNodeClick(data) {
      this.$emit("treeClick", data);
      this.buildingId = data.buildingId;
    }
  }
};
</script>
<style lang="scss" scoped>
.common-tree-box {
  border: 1px solid #ddd;
  border-radius: 2px;
  position: relative;
  max-height: 80vh;
  .tree-title {
    padding: 10px 15px;
    font-size: 14px;
    color: #666;
    border-bottom: 1px solid #ddd;
  }
  &.hidden {
    opacity: 0;
    border: 0 solid transparent;
  }
  .common-tree {
    max-height: 75vh;
    overflow: auto;
  }
}
</style>