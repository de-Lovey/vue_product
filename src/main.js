// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './modules/resource'
import './modules/cookie'
import './App.less'

//导入mint-ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.min.css'
Vue.use(MintUI)

//导入axios
import axios from 'axios'
axios.defaults.baseURL = 'http://47.103.23.189:8080'
Vue.prototype.$axios = axios

//导入mui
import mui from '../static/lib/mui/js/mui.min.js'
Vue.prototype.$mui = mui;

//导入font-awesome
import "font-awesome/css/font-awesome.css"

// 引入layer弹框组建
import layer from '../static/lib/layer/layer.js'
import '../static/lib/layer/need/layer.css'

// 配置axios相关属性
axios.interceptors.request.use(config => {
  var loadTip = layer.open({
    type: 2,
    content: '加载中'
  });
  return config;
}, error => { //请求错误处理
  Promise.reject(error)
});

axios.interceptors.response.use(
  response => {  //成功请求到数据
    layer.closeAll()
    return response
  },
  error => {  //响应错误处理
    console.log(JSON.stringify(error));
    return Promise.reject(error)
  }
)








Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
