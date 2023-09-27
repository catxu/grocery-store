import axios from "axios";
import { toast } from "~/composables/utils";
import { getToken } from "~/composables/auth";

const httpClient = axios.create({
  baseURL: "/admin"
})

// 添加请求拦截器
httpClient.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const token = getToken()
  if (token) {
    config.headers['token'] = token
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
httpClient.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  if (response.data.page) {
    return response.data;
  } else {
    return response.data.data;
  }
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  toast(error.response.data.msg || error.message, 'error')
  return Promise.reject(error);
});


export default httpClient