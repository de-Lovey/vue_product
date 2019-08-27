<template>
  <div>
    <mt-swipe :auto="2000">
      <!--将来谁要使用轮播图组件, 谁就传递banner-->
      <mt-swipe-item v-for="item in banner" :key="item.id">
        <img :src="item.img" alt="" :class="{home: isHome}">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
  export default {
    name: "swiper",
    props:['banner','isHome']
  }
</script>

<style lang="less" scoped>
  .home{
    width: 100%;
  }
  .mint-swipe{
    height: 200px;
    text-align: center;
    img{
      height: 100%;
    }
  }
</style>
