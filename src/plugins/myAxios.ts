import axios from "axios";

const myAxios = axios.create({
    baseURL: 'http://localhost:8088/api'
});

myAxios.defaults.withCredentials = true; // 配置为true


//请求拦截器
myAxios.interceptors.request.use(function (config) {
    //请求成功做什么
    console.log("请求已发送",config)
    return config;
}, function (error) {
    //出现错误了怎么做
    return Promise.reject(error);
});

//响应拦截器
myAxios.interceptors.response.use(function (response) {
    //响应成功了做什么
    console.log("响应已接收到",response)
     // 未登录则跳转到登录页
    if (response?.data?.code === 40100) {
        //获取跳转前的URL
        const redirectUrl = window.location.href;
        window.location.href = `/user/login?redirect=${redirectUrl}`;
    }

        return response.data;
}, function (error) {
    //响应失败了做什么
    return Promise.reject(error);
});

export default myAxios;
