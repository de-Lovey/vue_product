import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/tabbar/home.vue'
import Category from '../components/tabbar/category.vue'
import Cart from '../components/tabbar/cart.vue'
import User from '../components/tabbar/user.vue'
import Register from '../components/user/register'
import Login from '../components/user/login'
import UserEdit from '../components/user/userEdit'

Vue.use(Router)

export default new Router({
  linkActiveClass:'mui-active',
  routes: [
    {path:'/',redirect:'/home'},
    {path:'/home', component: Home},
    {path:'/category', component: Category},
    {path:'/cart', component: Cart},
    {path:'/user', component: User},
    {path:'/register', component: Register},
    {path:'/login', component: Login},
    {path:'/user/userEdit',name: "userEdit", component: UserEdit},
  ]
})
