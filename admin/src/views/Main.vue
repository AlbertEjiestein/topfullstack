<template>
  <el-container>
    <el-aside width="200px">
      <el-menu style="height:100vh;" mode="vertical" :default-active="$route.path" text-color="#000" active-text-color="#ffd04b" router>
        <el-submenu
          v-for="(item, index) in menu.items"
          :index="`menu-item-${index}`"
          :key="`menu-item-${index}`"
        >
          <template #title>{{item.title}}</template>
          <el-menu-item v-for="(subItem, subIndex) in item.items"
            :index="subItem.path"
            :key="`menu-item-${index}-${subIndex}`"
          >{{subItem.title}}
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <h3>全栈之巅-后台管理界面</h3>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>
        底页
      </el-footer>
    </el-container>
  </el-container>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    setup() {
      const menu = {
        items: [
          {
            title: '内容管理',
            items: [
              { title: '首页', path: '/' },
              { title: '课程管理', path: '/courses/list' },
              { title: '课时管理', path: '/episode/list' },
            ]
          },
          {
            title: '运营管理',
            items: [
              {title: '用户管理', path: '/users/list'}
            ]
          }
        ]
      }

      return {
        menu
      }
    }
  })
</script>

<style scoped>
</style>