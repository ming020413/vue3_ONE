<template>
  <div class="discover">
    <!-- 分类页 -->
    <div class="container">
      <!-- 顶部导航栏 -->
      <div class="top-nav">
        <van-tabs v-model:active="active" @click-tab="tabTo">
          <van-tab
            v-for="(item, index) in navList.data"
            :title="item.title"
            :key="item.url"
            :to="item.url"
          ></van-tab>
        </van-tabs>
      </div>
      <!-- 内容区 -->
      <div class="content">
        <RouterView v-slot="{ Component }">
          <keep-alive>
            <transition name="fade">
              <component
                :is="Component"
                v-if="!$route.meta.keepAlive"
                :key="$route.name"
              />
            </transition>
          </keep-alive>
          <transition name="fade">
            <component :is="Component" v-if="$route.meta.keepAlive" />
          </transition>
        </RouterView>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="discover">
/* 依赖 */
import { ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

/* 1.顶部导航栏 */
let active = ref(0);
let navList = reactive({
  data: [
    { title: "阅读", url: "/discover/read" },
    { title: "专题", url: "/discover/note" },
    { title: "问答", url: "/discover/read" },
    { title: "长篇", url: "/discover/note" },
    { title: "小记", url: "/discover/note" },
    { title: "热榜", url: "/discover/note" },
    { title: "书影", url: "/discover/note" },
    { title: "音乐", url: "/discover/note" },
    { title: "作者", url: "/discover/note" },
  ],
});
/* 2.tab路由跳转 */
let tabTo = (e: any) => {
  // console.log(e.currentTarget);
  // router.push("/discover/note");
};
</script>

<style scoped>
.discover {
  width: 375rem;
  .container {
    width: 100%;
    .top-nav {
      width: 315rem;
      position: fixed;
      top: 0;
      z-index: 5;
    }
  }
}
:deep(.van-tab) {
  width: 80rem !important;
  padding: 0 20rem !important;
}
:deep(.van-tab--active) {
  font-size: 20rem;
}

.transitionBody {
  position: absolute;
  top: 0;
  left: 0;
}
.iconfont {
  font-size: 20px;
}
/* 组件进入前 */
.fade-enter-active {
  transition: all 0.5s linear;
}
/* 组件进入后 */
.fade-leave-active {
  transition: all 0.5s linear;
}
/* 要怎么动 */

/* .fade-enter,
.fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
} */

.fade-enter-to {
  transform: translateX(375rem);
  opacity: 1;
}

.fade-leave-to {
  transform: translateX(-375rem);
  opacity: 0;
}
</style>
