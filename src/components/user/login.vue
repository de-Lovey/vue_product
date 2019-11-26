<template>

  <div>

    <header class="mui-bar mui-bar-nav">
      <h1 class="mui-title">登录</h1>
    </header>
    <div class="mui-content">
      <form id='login-form' class="mui-input-group">
        <div class="mui-input-row">
          <label>用户名</label>
          <input id='account' v-model="userName" type="text" class="mui-input-clear mui-input" placeholder="请输入用户名">
        </div>
        <div class="mui-input-row">
          <label>密码</label>
          <input id='password' v-model="password" type="password" class="mui-input-clear mui-input" placeholder="请输入密码">
        </div>
      </form>
      <div class="mui-content-padded">
        <button style="padding: 5px 0;" id='login' @click="login()" class="mui-btn mui-btn-block mui-btn-primary">登录</button>
        <div class="link-area"><a id='reg' @click="toReg">注册账号</a> <span class="spliter">|</span> <a @click="toForget" id='forgetPassword'>忘记密码</a>
        </div>
      </div>
      <div class="mui-content-padded oauth-area">

      </div>
    </div>


  </div>

</template>

<script>
  export default{
    name:'login',
    data(){
      return{
        userName:'',
        password:''
      }
    },
    methods:{
      login:function(){
        var that = this
        console.log(that.userName+'-'+that.password)
        this.$axios({
          method: 'post',
          url: '/login/user',
          data: {
            userName: that.userName,
            password: that.password
          }
        }).then(function(res) {
          console.log(res);
          if(res.data.code==200){
            that.$setCookie('userName',that.userName)
            that.$mui.toast('登录成功')
            that.$userInfo=res.data.content
            console.log(that.$userInfo)
            that.$router.push('/')
          }else{
            that.$mui.toast(res.data.msg)
          }
        })
          .catch(function(error) {
            console.log(error);
          });
      },
      toReg:function(){
        this.$router.push({path:'/register'})
      },
      toForget:function(){
        this.$router.push({path:'/user/forget'})
      }
    },
    mounted:function(){
      this.$mui.init({
        swipeBack: true //启用右滑关闭功能
      });

      this.$mui('#autoLogin').each(function() { //循环所有toggle
        /**
         * toggle 事件监听
         */
        this.addEventListener('toggle', function(event) {
          //event.detail.isActive 可直接获取当前状态
          // this.parentNode.querySelector('span').innerText = '状态：' + (event.detail.isActive ? 'true' : 'false');
        });
      });
    }

  }

</script>

<style scoped="scoped">
.link-area{
  text-align: center;
}



</style>
