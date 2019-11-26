<template>

  <div>

    <header class="mui-bar mui-bar-nav">
      <a href="javascript:history.back()" class="mui-icon mui-pull-left"><</a>
      <h1 class="mui-title">找回密码</h1>
    </header>
    <div class="mui-content">
      <form class="mui-input-group">
        <div class="mui-input-row">
          <label>邮箱</label>
          <input id='email' v-model="email" type="email" class="mui-input-clear mui-input" placeholder="请输入注册邮箱">
        </div>
      </form>
      <div class="mui-content-padded">
        <button id='sendMail' @click="sendEmail" class="mui-btn mui-btn-block mui-btn-primary">提交</button>
      </div>
    </div>


  </div>

</template>

<script>

  export default{
    name:'forget',
    data(){
      return{
        email:''
      }
    },
    methods:{
      sendEmail:function(){
        var that = this
        this.$axios('/email/sendPassWordToEmail/'+that.email).then(function(res){
          console.log(res)
          if(res.data.code==200){
            that.$mui.toast(res.data.msg)
            that.$router.push('/login')
          }else{
            that.$mui.toast(res.data.msg)
          }
        })
      }
    }

  }

</script>

<style>
  #sendMail{
    padding: 5px 0;
  }
</style>
