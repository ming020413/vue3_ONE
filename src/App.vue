<script setup lang="ts"></script>

<template>
  <RouterView v-slot="{ Component }">
    <keep-alive>
      <transition name="fade">
        <component :is="Component" v-if="!$route.meta.keepAlive" />
      </transition>
    </keep-alive>
    <transition name="fade">
      <component :is="Component" v-if="$route.meta.keepAlive" />
    </transition>
  </RouterView>
</template>

<style scoped name="App">
body {
  font-size: 16px;
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
  transition: all 0.5s ease;
}
/* 组件进入后 */
.fade-leave-active {
  transition: all 0.5s ease;
}
/* 要怎么动 */
.fade-enter,
.fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
