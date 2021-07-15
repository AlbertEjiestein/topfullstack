<template>
  <div>
    <h3>课程列表</h3>
    <div>
      <el-button type="success" size="small" @click="$router.push('/courses/create')">创建课程</el-button>
    </div>
    <el-table :data="courses.data" style="width: 100%">
      <el-table-column
        v-for="(field, name) in fields"
        :key="name"
        :prop="name"
        :label="field.label"
      >
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template v-slot="{ row }">
          <el-button
            type="success"
            size="small"
            @click="$router.push(`/courses/edit/${row._id}`)"
            >编辑</el-button
          >
          <el-button type="danger" size="small" @click="remove(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, ref } from "vue";

export default defineComponent({
  setup() {
    const courses = ref({
      data: [],
    });
    const fields = {
      _id: { label: "日期" },
      title: { label: "课程名称" },
      cover: { label: "课程封面图" },
    };

    const internalInstance = getCurrentInstance();
    const globalProps = internalInstance?.appContext.config.globalProperties;
    const fetch = () => {
      globalProps?.$http.get("courses").then((res: any) => {
        courses.value = res.data;
      });
    };

    fetch();

    const remove = async (row: any) => {
      try {
        await globalProps?.$confirm({ message: "是否确认删除？" });
      } catch {
        return;
      }
      await globalProps?.$http.delete(`courses/${row._id}`);
      globalProps?.$message.success({ message: "删除成功" });
      fetch();
    };

    return {
      courses,
      fields,
      remove,
    };
  },
});
</script>

<style scoped>
</style>