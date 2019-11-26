<template>
  <div>

    <!-- 顶部通栏 -->
    <div class="topbar">
      <form action="">
        <input type="text" placeholder="搜索一万件好东西">
        <span class="fa fa-search"></span>
      </form>
      <a href="javascript:void(0);" class="fa fa-minus-square-o"></a>
      <a href="javascript:void(0);" class="fa fa-commenting-o"></a>
    </div>

    <!-- 导航栏 -->
    <div class="yt_nav">
      <a href="javascript:void(0);">精选</a>
      <a href="javascript:void(0);">居家生活</a>
      <a href="javascript:void(0);">美食厨房</a>
      <a href="javascript:void(0);">服饰珠宝</a>
      <a href="javascript:void(0);">美妆洗护</a>
    </div>

    <swiper :banner="banner" :isHome="true"></swiper>




    <div>
    <div class="yt_new">
      <a href="javascript:void(0);">
        <img src="../../assets/images/nav-001.png" alt=""><br>
        <span>新品专区</span>
      </a>
      <a href="javascript:void(0);">
        <img src="../../assets/images/nav-002.png" alt=""><br>
        <span>必买清单</span>
      </a>
      <a href="javascript:void(0);">
        <img src="../../assets/images/nav-003.png" alt=""><br>
        <span>签到零币</span>
      </a>
      <a href="javascript:void(0);">
        <img src="../../assets/images/nav-004.png" alt=""><br>
        <span>使用专区</span>
      </a>
    </div>
    <div class="yt_ad1">
      <a href="javascript:void(0);"><img src="../../assets/images/ad-001.png" alt=""></a>
    </div>
    <div class="yt_recommend">
      <p>新人推荐</p>
      <a href="javascript:void(0);">
        <img src="../../assets/images/pd-001.png" alt="">
        <span>香水一样好闻的清晰空气剂</span><br>
        <span>新人专享团</span><br>
        <span>拼团价￥19</span>
      </a>
      <a href="javascript:void(0);">
        <img src="../../assets/images/pd-002.png" alt="">
        <span>香水一样好闻的清晰空气剂</span><br>
        <span>新人专享团</span><br>
        <span>拼团价￥19</span>
      </a>
      <a href="javascript:void(0);">
        <img src="../../assets/images/pd-003.png" alt="">
        <span>香水一样好闻的清晰空气剂</span><br>
        <span>新人专享团</span><br>
        <span>拼团价￥19</span>
      </a>
    </div>
    <div class="yt_buy clearFix">
      <div>
        <p>限时购</p>
        <a href="javascript:void(0);">
          <img src="../../assets/images/pd-001.png" alt="">
          <span>￥77  </span>
          <span>￥89</span>
        </a>
        <a href="javascript:void(0);">
          <img src="../../assets/images/pd-002.png" alt="">
          <span>￥77  </span>
          <span>￥89</span>
        </a>
      </div>
      <div>
        <p>拼团价</p>
        <a href="javascript:void(0);">
          <img src="../../assets/images/pd-001.png" alt="">
          <span>￥77  </span>
          <span>￥89</span>
        </a>
        <a href="javascript:void(0);">
          <img src="../../assets/images/pd-002.png" alt="">
          <span>￥77  </span>
          <span>￥89</span>
        </a>
      </div>
    </div>
    <div class="yt_ad2">
      <p>新人推荐 <a href="javascript:void(0);">更多 ></a></p>
      <a href="javascript:void(0);"><img src="../../assets/images/ad-002.png" alt=""></a>
    </div>
    <div class="yt_find clearFix">
      <div>
        <p>发现好货 <span>vip亲身试用</span></p>
        <a href="javascript:void(0);"><img src="../../assets/images/pd-008.png" alt=""></a>
      </div>
      <div>
        <p>发现好货 <span>十大权益</span></p>
        <a href="javascript:void(0);"><img src="../../assets/images/pd-009.png" alt=""></a>
      </div>
    </div>
    <div class="yt_ad3">
      <a href="javascript:void(0);"><img src="../../assets/images/ad-003.png" alt=""></a>
    </div>
    <div class="yt_mall">
      <p>众筹商城<a href="javascript:void(0);">更多 ></a></p>
      <a href="javascript:void(0);"><img src="../../assets/images/ad-004.png" alt=""></a>
      <span>众筹商城：这个眼罩会发光、会说话、会放音乐、竟然让睡不好觉的人快速入睡</span>
    </div>
    <div class="yt_today">
      <p>今日精选 <a href="javascript:void(0);">更多 ></a></p>
      <a href="javascript:void(0);" class="clearFix"><span>垃圾分类的专属，一个垃圾桶搞定，美观又实用</span><img src="../../assets/images/pd-010.png"
                                                                                            alt=""></a>
      <a href="javascript:void(0);" class="clearFix"><span>垃圾分类的专属，一个垃圾桶搞定，美观又实用</span><img src="../../assets/images/pd-011.png"
                                                                                            alt=""></a>
      <a href="javascript:void(0);" class="clearFix"><span>垃圾分类的专属，一个垃圾桶搞定，美观又实用</span><img src="../../assets/images/pd-012.png"
                                                                                            alt=""></a>
    </div>

    </div>
  </div>
</template>

<script>
  import swiper from '../subComponents/swiper.vue'
  import vpTop from '../subComponents/vpTop'

  export default {
    name: "home",
    components: {
      swiper, vpTop
    },
    data() {
      return {
        banner: [
          { img: "../../assets/images/pd-001.png", id:1},
          { img: "../../assets/images/pd-002.png", id:2},
          { img: "../../assets/images/pd-001.png", id:3},
          { img: "../../assets/images/pd-002.png", id:4},
        ]
      }
    },
    created() {
      // this.getBanner();
    },
    methods: {
      getBanner() {
        this.$axios.get('http://www.liulongbin.top:3005/api/getlunbo')
          .then(result => {
            if (result.data.status === 0) {
              this.banner = result.data.message
            }
          })
      }
    }
  }
</script>

<style lang="less">

  @import "../../less/index";

  .mui-grid-view.mui-grid-9 {
    background-color: #fff;
    img {
      width: 60px;
      height: 60px;
    }
    .mui-media-body {
      font-size: 13px;
    }
  }

  .mui-grid-view.mui-grid-9 .mui-table-view-cell {
    border: none;
  }
</style>
