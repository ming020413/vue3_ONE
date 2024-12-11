/* 
    创建路由守卫
    1.导入路由实例
    2.创建路由前置和后置守卫
*/
//引入依赖
import router from "./index";


//1.路由前置守卫
router.beforeEach((to, from, next) => {
    next()
})

//2.路由后置守卫
router.afterEach((to, from) => {

});