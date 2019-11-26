<template>
  <div class="app-container">
    <!--顶部header区域-->

    <!--router路由区域-->

    <transition>
      <router-view></router-view>
    </transition>

    <!--底部tabbar区域-->
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item-my" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item-my" to="/category">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">分类</span>
      </router-link>
      <router-link class="mui-tab-item-my" to="/cart">
                <span class="mui-icon mui-icon-extra mui-icon-extra-cart">

                </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item-my" to="/user">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">个人中心</span>
      </router-link>
    </nav>

  </div>
</template>


<script>
  import vpTop from './components/subComponents/vpTop'
  export default {
    name: "app",
    components:{
      vpTop
    },
    data(){
      return {
        flag: false
      }
    },
    methods:{
      getUserInfo: function() {
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
          console.log(res);
          console.log(res.data.content.list[0])
          that.userInfo = res.data.content.list[0]
        }).catch(function(err) {
          that.$mui.toast('获取用户信息失败')
          console.log(err)
        })
      },
      // goBack(){
      //   this.$router.go(-1);
      // }
    },
    // created(){
    //   this.flag = this.$route.path === "/home" ? false : true;
    // },
    // watch:{
    //   '$route.path': function (newVal) {
    //     this.flag =  newVal === "/home" ? false : true;
    //   }
    // }
  }

</script>




<style  lang="less">
  html,
  body{
    height: 100%;
  }
  .app-container {
    height: 100%;
    padding-bottom: 50px;
    padding-top: 40px;
    overflow-x: hidden;
    position: relative;
  }
  .mint-header{
    position: fixed;
    z-index: 999;
    width: 100%;
    top: 0;
  }

  .mui-content{
    background-color: #fff!important;
  }

  /*.v-enter {*/
    /*opacity: 0;*/
    /*transform: translateX(100%);*/
  /*}*/

  /*.v-leave-to {*/
    /*opacity: 0;*/
    /*transform: translateX(-100%);*/
    /*position: absolute;*/
  /*}*/

  /*.v-enter-active, .v-leave-active {*/
    /*transition: all 1s;*/
    /*overflow: hidden;*/
  /*}*/

  /*改类名, 解决和js冲突的问题*/
  .mui-bar-tab .mui-tab-item-my {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
  }

  .mui-bar-tab .mui-tab-item-my .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .mui-bar-tab .mui-tab-item-my .mui-icon ~ .mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .mui-bar-tab .mui-tab-item-my.mui-active {
    color: #007aff;
  }

</style>
