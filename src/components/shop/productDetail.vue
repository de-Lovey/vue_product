<template>

  <div>
    <header class="mui-bar mui-bar-nav">

      <a class="mui-icon mui-pull-left" href="javascript:history.back(-1)">
        <</a> <h1 class="mui-title">商品详情</h1>
    </header>
    <div class="mui-card" style="padding-top: 45px;">
      <img :src="product.productImg" />
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p align="left" style="color: #000000;" class="realPrice">
            {{product.productName}}
          </p>
          <p align="left" class="realPrice">￥{{product.normalPrice-product.discount}}
            <span v-if="product.isInDiscount==1" class="discountLogo">折扣商品</span>
            <span v-if="product.isInKill==1" class="discountLogo">秒杀商品</span>
          </p>
          <p align="left" class="huaxian normalPrice">￥{{product.normalPrice}}</p>
          <p align="left" style="color: #333;">
            {{product.miaoshu}}
          </p>
          <!-- 按钮组 -->
          <div class="add_btn" @click="addProToCar">加入购物车</div>
        </div>
      </div>
      <div class="mui-card-footer">
        <a class="mui-card-link">快递：{{product.deliveryPrice}}</a>
        <a class="mui-card-link">销量：{{product.orderCount}}</a>
        <a class="mui-card-link">{{product.deliveryPlace}}</a>
      </div>
      <div class="mui-card-footer">
        <a class="mui-card-link">宝贝评论(1999)</a>
        <a class="mui-card-link">></a>
      </div>
    </div>




  </div>

</template>

<script>
  export default {
    name: 'productDetail',
    data() {
      return {
        product: {},
        userInfo: {}
      }
    },
    methods: {
      getProductById: function(proId) {

        this.$axios('/getProductById/' + proId).then(res => {
          console.log(res)
          this.product = res.data.content

        })
      },
      addProToCar: function() {
        var proId = this.product.id //获取对应的id
        var shoppingcarData= this.product //当前商品对象数据

        delete shoppingcarData.id   //  删除id
        delete shoppingcarData.createTime //删除时间

        shoppingcarData.userId = this.userInfo.id //用户的id
        shoppingcarData.productId = proId  //当前商品的id
        console.log(shoppingcarData)
        this.$axios.post('/addShoppingcar', shoppingcarData).then(res => {
          if(res.data.code==200){
            this.$mui.toast('购车添加成功')
          }else{
            this.$mui.toast('添加失败')
          }

        })

      },
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
          console.log(res.data.content.list[0])
          that.userInfo = res.data.content.list[0]
        }).catch(function(err) {
          that.$mui.toast('获取用户信息失败')
          console.log(err)
        })
      }
    },
    mounted() {
      console.log(this.$route.query.proId)
      this.getProductById(this.$route.query.proId)
      this.getUserInfo()
    }

  }
</script>

<style scoped="scoped">

  .huaxian {
    text-decoration: line-through;
  }

  .normalPrice {
    color: darkgray;
  }

  .realPrice {
    color: orangered;
    font-size: 20px;
    font-weight: bold;
  }

  .discountLogo {
    font-size: 10px;
    padding-left: 10px;
    padding-right: 10px;
    /* border: 2px solid inherit; */
    border-radius: 14px;
    background-color: moccasin;
  }

  .mui-card {
    margin: 0px;
    background-color: inherit;
    border: 0px solid;
    box-shadow: none;
  }

  .mui-card img {
    width: 100%;
  }

  .mui-card-footer a {
    color: darkgray;
  }

  .add_btn{
    width: 130px;
    height: 36px;
    text-align: center;
    line-height: 40px;
    border-radius: 5px;
    background: orange;
    font-size: 15px;
    color: #fff;
  }


</style>
