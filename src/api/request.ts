/* 
    封装axios及拦截器
    1. 创建axios实例对象
    2. 配置axios的基础URL
    3. 配置axios的请求响应拦截器
    4. 导出axios实例对象
 */
//导入依赖
import { useRouter } from "vue-router";
import axios from "axios";

// 1.创建axios实例
let service = axios.create({
    baseURL: "https://apis.netstart.cn/one/", //基地址
    timeout: 300000, //最长响应时间
});

// 2. 配置axios的请求响应拦截器
// 2.1 请求拦截器
service.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 2.2 响应拦截器
service.interceptors.response.use(
    (response) => {
        //在进行Excel导出时，接受到的数据是二进制Blob，所以需要进行判断，是就直接返回，不需要解构
        if (response.data instanceof Blob) return response.data;
        //进行数据解构，剥层
        return response.data
    },
    (error) => {
        let $router = useRouter();
        let message = "";
        //http状态码
        const status = error.response.status;
        switch (status) {
            case 401:
                message = "身份验证已过期，请重新登录";
                setTimeout(() => {
                    $router.push("/login");
                }, 1500);
                break;
            case 403:
                message = "无权访问";
                break;
            case 404:
                message = "请求地址错误";
                break;
            case 500:
                message = "服务器出现问题";
                break;
            default:
                message = "网络出现问题";
                break;
        }
        // 错误响应返回一个reject的promise对象
        return Promise.reject(error);
    }
);

//3.导出
export default service;
