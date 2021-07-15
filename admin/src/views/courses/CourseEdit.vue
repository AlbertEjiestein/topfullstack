<template>
  <div>
    <h3>{{ isNew ? "创建" : "编辑" }}课程</h3>
    <el-form :model="form" label-width="100px">
      <el-form-item label="课程名称">
        <el-input v-model="form.title" placeholder="请输入课程名称"></el-input>
      </el-form-item>
      <el-form-item label="课程封面图">
        <el-input
          v-model="form.cover"
          placeholder="请输入课程封面图"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button>返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  computed,
  getCurrentInstance,
  onMounted,
} from "vue";

export default defineComponent({
  props: ["id"],
  setup(props) {
    const form = reactive({
      title: "",
      cover: "",
    });

    const isNew = computed(() => !props.id);

    // axios实例
    const internalInstance = getCurrentInstance();
    const globalProps = internalInstance?.appContext.config.globalProperties;

    const fetch = async () => {
      const res = await globalProps?.$http.get(`courses/${props.id}`);
      form.title = res.data.title;
      form.cover = res.data.cover;
    };

    const onSubmit = async () => {
      const url = isNew.value ? 'courses' : `courses/${props.id}`;
      const method = isNew.value ? 'post' : 'put';
      await globalProps?.$http[method](url, form);
      globalProps?.$message.success({message: '保存成功'});
      form.title = '';
      form.cover = '';
      globalProps?.$router.go(-1);
    };

    onMounted(() => {
      !isNew.value && fetch();
    });

    return {
      form,
      isNew,
      onSubmit,
    };
  },
});
</script>

<style scoped>
</style>