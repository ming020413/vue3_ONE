<template>
  <div class="index">
    <div class="container">
      <!-- 主页 -->
      <!-- 二级路由 -->
      <RouterView></RouterView>
      <!-- 底部导航栏 -->
      <div class="footer-nav">
        <van-tabbar v-model="active" route active-color="#000">
          <van-tabbar-item push to="/home">
            <span>首页</span>
            <template #icon="props">
              <i class="iconfont" :class="active == 0 ? iconActive[0] : iconList[0]"></i>
            </template>
          </van-tabbar-item>
          <van-tabbar-item push to="/discover">
            <span>分类</span>
            <template #icon="props">
              <i class="iconfont" :class="active == 1 ? iconActive[1] : iconList[1]"></i>
            </template>
          </van-tabbar-item>
          <van-tabbar-item push to="/radio">
            <span>收音机</span>
            <template #icon="props">
              <i class="iconfont" :class="active == 2 ? iconActive[2] : iconList[2]"></i>
            </template>
          </van-tabbar-item>
          <van-tabbar-item push to="/my_home">
            <span>我的</span>
            <template #icon="props">
              <i class="iconfont" :class="active == 3 ? iconActive[3] : iconList[3]"></i>
            </template>
          </van-tabbar-item>
        </van-tabbar>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="home">
import { ref, reactive } from "vue";
/* 底部导航栏控制 */
let active = ref(0);
let iconList = ["icon-shouye1", "icon-faxian1", "icon-shouyinji", "icon-wode"];
let iconActive = [
  "icon-index-copy",
  "icon-faxianxuanzhong",
  "icon-shouyinjikuai",
  "icon-wode_xuanzhong",
];
</script>

<style scoped>
.index {
  width: 375rem;
  font-size: 16rem;
  .container {
    width: 100%;
    .footer-nav {
      position: fixed;
      bottom: 0;
      z-index: 5;
    }
  }
}
</style>
