import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/home",
      name: "index",
      component: () => import("@/views/index.vue"),
      /* 首页 发现 收音机 我的 四个主页 */
      children: [
        //首页
        {
          path: "/home",
          name: "home",
          component: () => import("@/views/home/index.vue"),
          meta: {
            KeepAlive: true,
          },
        },
        //发现
        {
          path: "/discover",
          redirect: "/discover/read",
          name: "discover",
          component: () => import("@/views/discover/index.vue"),
          //阅读 日签
          children: [
            {
              path: "/discover/read",
              name: "read",
              component: () => import("@/views/discover/read.vue"),
              meta: {
                KeepAlive: true,
              },
            },
            {
              path: "/discover/note",
              name: "note",
              component: () => import("@/views/discover/note.vue"),
              meta: {
                KeepAlive: true,
              },
            },
          ],
          meta: {
            KeepAlive: true,
          },
        },
        {
          path: "/radio",
          name: "radio",
          component: () => import("@/views/radio/index.vue"),
          meta: {
            KeepAlive: true,
          },
        },
        {
          path: "/my_home",
          name: "myHome",
          component: () => import("@/views/myHome/index.vue"),
          meta: {
            KeepAlive: true,
          },
        },
      ],
    },
  ],
});

export default router;
