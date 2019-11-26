<template>
    <div>
      <mt-header  :title="title">
            <span slot="left" @click="goBack" v-show="flag">
                <mt-button icon="back">返回</mt-button>
            </span>
      </mt-header>
    </div>
</template>

<script>
    export default {
        name: "vpTop",
      data(){
          return {
            flag: false
          }
      },
      props:['title'],
      methods:{
        goBack(){
          this.$router.go(-1);
        }
      },
      created(){
        this.flag = this.$route.path === "/home" ? false : true;
      },
      watch:{
        '$route.path': function (newVal) {
          this.flag =  newVal === "/home" ? false : true;
        }
      }
    }
</script>

<style scoped>

</style>
