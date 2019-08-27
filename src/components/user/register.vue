<template>
    <div>
      <header style="z-index: 10000;" class="mui-bar mui-bar-nav">
        <a href="javascript:history.back()" class="backFont mui-icon mui-pull-left"></a>
        <h1 class="mui-title">注册</h1>
      </header>
      <div class="mui-content">
        <form class="mui-input-group">
          <div class="mui-input-row">
            <label>用户名</label>
            <input id='account' @change="userNameIsReged" type="text" v-model="userName" class="mui-input-clear mui-input" placeholder="请输入用户名">
          </div>
          <div class="mui-input-row">
            <label>密码</label>
            <input id='password' v-model="password" type="password" class="mui-input-clear mui-input" placeholder="请输入密码">
          </div>
          <div class="mui-input-row">
            <label>确认</label>
            <input id='password_confirm' v-model="password_confirm" type="password" class="mui-input-clear mui-input" placeholder="请确认密码">
          </div>
          <div class="mui-input-row">
            <label>邮箱</label>
            <input id='email' v-model="email" type="email" class="mui-input-clear mui-input" placeholder="请输入邮箱">
          </div>
        </form>
        <div class="mui-content-padded">
          <button style="padding:5px 0px;" @click="reg()" class="mui-btn mui-btn-block mui-btn-primary">注册</button>
        </div>

      </div>
    </div>
</template>

<script>
  export default{
    name:'register',
    data(){
      return {
        userName:'',
        password:'',
        password_confirm:'',
        email:'',

      }
    },
    methods:{
      //1.输入用户名时
      userNameIsReged:function(){  // 用户输入完用户名  立马去后台查询是否被注册
        var that = this
        this.$axios({
          method: 'post',
          url: '/reg/userNameIsReged/'+that.userName,
        }).then(function(res) {
          console.log(res);
          if(res.data.code==200){
            //什么也不做
          }else{
            that.$mui.alert('用户名已经被占用')
            that.userName=''
          }
        })
          .catch(function(error) {
            console.log(error);
          });
      },
      //2. 点击提交
      reg:function(){
        //对注册信息进行非空校验  以及邮箱格式  密码数字字母长度
        if(this.password!=this.password_confirm){
          this.$mui.alert('两次密码输入的不一致')
          this.password_confirm=''
          return;
        }
        var that = this
        this.$axios({
          method: 'post',
          url: '/reg/user',
          data: {
            userName: that.userName,
            password: that.password,
            email:that.email
          }
        }).then(function(res) {
          if(res.data.code==200){
            that.$mui.toast('注册成功，请登录')
            that.$router.push('/login')
          }else{
            that.$mui.alert('注册失败，原因：'+res.data.msg)
          }
        })
          .catch(function(error) {
            console.log(error);
          });
      }
    }
  }

</script>

<style scoped>

</style>
