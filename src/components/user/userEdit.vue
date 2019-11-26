<template>
  <div>
    <header class="mui-bar mui-bar-nav">
      <a class="mui-icon mui-pull-left" href="javascript:history.back(-1)">&lt;</a>
      <h1 class="mui-title">修改个人信息</h1>
    </header>
    <form class="mui-input-group">
      <div class="mui-input-row">
        <label>用户名</label>
        <input v-model="userInfo.userName" type="text" class="mui-input-clear" placeholder="请输入" />
      </div>
      <div class="mui-input-row">
        <label>密码</label>
        <input
          @change="changePass"
          v-model="userInfo.password"
          type="password"
          class="mui-input-clear"
          placeholder="请输入"
        />
      </div>
      <div class="mui-input-row">
        <label>邮箱</label>
        <input v-model="userInfo.email" type="text" class="mui-input-clear" placeholder="请输入" />
      </div>
      <div class="mui-input-row">
        <label>收货地址</label>
        <input
          v-model="userInfo.deliveryAddress"
          type="text"
          class="mui-input-clear"
          placeholder="请输入"
        />
      </div>
      <div style="position: relative;" class="mui-input-row">
        <label>上传头像</label>
        <span class="btn_uploadFile">
          选择头像
          <input @change="uploadHeadPic" type="file" class="mui-input-clear uploadFile" />
        </span>


      </div>
      <div  >
        <button @click="saveUser" type="button" class="mui-btn mui-btn-block mui-btn-primary btn_save">保存</button>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    name: "",
    data() {
      return {
        userInfo: {},
        isChangePass: false,
        oldPass: "",
        password: "",
        username: ""
      };
    },
    created(){
    },
    methods: {

      uploadHeadPic: function(e) {
        console.log("uploadHeadPic");
        let that = this;
        if (e.target.files.length !== 0) {
          var formData = new FormData();
          formData.append("image_data", e.target.files[0]);
          //单个文件进行上传
          this.$axios
            .post("/upload/addImage", formData, {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            })
            .then(response => {
              console.log("upload success");
              that.userInfo.headPic = that.$axios.defaults.baseURL + "/static/" + e.target.files[0].name;
              that.$mui.toast("头像上传成功");
            })
            .catch(err => {
              console.log(err);
            });
        }
      },
      toLogin: function() {
        this.$router.push({ path: "/login" });
      },
      changePass: function() {
        this.isChangePass = this.userInfo.password != this.oldPass;
      },
      saveUser: function() {
        var that = this;
        delete this.userInfo.roleId;
        this.$axios({
          method: "put",
          url: "/updateUser",
          data: that.userInfo
        })
          .then(function(res) {
            console.log(res.data.code);
            if (res.data.code == 200) {

              if (that.isChangePass) {
                that.$deleteCookie("userName");
                that.$router.push("/login");
                that.$mui.toast("密码已经更改，请重新登录");
              } else {
                that.$mui.toast("修改成功, 请重新登录");
                that.$router.push("/login");
              }
            } else {
              that.$mui.toast(res.data.msg);
            }
          })
          .catch(function(err) {
            console.log(err);
          });
      }
    },
    created() {
      if(this.$route.params.userInfo){
        this.userInfo = this.$route.params.userInfo;
        this.oldPass = this.userInfo.password;
      }else {
        this.$mui.toast('获取用户信息失败');
        this.$router.push('/user');
      }

    }
  };
</script>

<style scoped="scoped">
.uploadFile{
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
}
  .btn_uploadFile{
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 80px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    float: left;
    margin-top: 4px;
  }
  .btn_save{
    width: 80%;
    margin: 10px 10%;
    padding: 5px 0;
  }
.mui-input-group:after{
  content: "";
  display: none;
}
</style>
