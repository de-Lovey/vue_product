
import Vue from 'vue'


Vue.prototype.$getCookie = function(name) {
  var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
  if (arr != null) return unescape(arr[2]);
  return null;
}
Vue.prototype.$setCookie = function(name, value) {
  //此 cookie 将被保存 1 小时
  var hour = 1;
  var exp = new Date();
  exp.setTime(exp.getTime() + hour * 60 * 60 * 1000);
  document.cookie = name + "=" + value + ";expires=" + exp.toGMTString();
  console.log(name, value);
}
Vue.prototype.$deleteCookie = function(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = this.$getCookie(name); // 这是cookie的值
  if (cval != null) {
    // 这里删除操作其实是将expires过期时间设置为当前时间，使cookie立即过期
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
  }
}
