<template>
    <div>
      <vp-top :title="'个人中心'"></vp-top>
      <div class="cz_container">
        <ul class="mui-table-view mui-table-view-chevron">
          <li class="mui-table-view-cell mui-media">
            <a class="mui-navigate-right" href="#account">
              <img class="mui-media-object mui-pull-left head-img" id="head-img" :src="userInfo.headPic">
              <div class="mui-media-body">
                {{userInfo.userName}}<p class="mui-ellipsis">绑定邮箱:{{userInfo.email}}</p>
              </div>
            </a>
          </li>
          <li class="mui-table-view-cell">
            <a @click="toEditUser" href="javascript:;" class="mui-navigate-right">账号与安全</a>
          </li>
          <li class="mui-table-view-cell">
            <router-link to="/cart" class="mui-navigate-right">我的购物车</router-link>
          </li>
          <li class="mui-table-view-cell">
            <a @click="joke" class="mui-navigate-right">收货地址管理</a>
          </li>
        </ul>
        <div>
          <a @click="logout" href="javascript:;" class="mui-btn btn_outLogin">退出登录</a>
        </div>
      </div>
    </div>
</template>

<script>
  import vpTop from '../subComponents/vpTop'


  export default {
        name: "user",
    components:{
      vpTop
    },
      data(){
          return {
            userInfo:{}
          }
      },
      created(){
        this.getUserInfo();

      },
      mounted(){

      },
      methods:{
          joke(){
            this.$mui.toast('暂未开放, 敬请期待')
          },
          //获取用户信息
        getUserInfo: function() {
          if (!this.$getCookie("userName")) {
            this.$router.push({
              path: "/login"
            });
            return this.$mui.toast('请先登录');
          }
          var that = this
          this.$axios({
            url: "/getAllUser",
            method: 'post',
            data: {
              model: {
                "userName": that.$getCookie('userName')
              },
              orderParams: [

              ],
              pageNum: 0,
              pageSize: 5
            }

          }).then(function(res) {
            console.log(res.data.content.list[0]);
            that.userInfo = res.data.content.list[0]
          }).catch(function(err) {
            that.$mui.toast('获取用户信息失败')
            console.log(err)
          })
        },
        //点击修改个人信息
        toEditUser: function () {
          this.$router.push({
            name: "userEdit",
            params: {
              userInfo: this.userInfo
            }
          });
        },
        //点击退出登录
        logout:function(){
          this.$deleteCookie('userName')
          this.$mui.toast('安全退出')
          this.$router.push('/login')
        },
      }
    }
</script>

<style scoped>
.btn_outLogin{
  width: 80%;
  margin: 20px 10%;
}
.mui-table-view-cell:after{
  left: 0px;
}
</style>
