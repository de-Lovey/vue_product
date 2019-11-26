<template>

  <div class="cart_container">
    <header class="mui-bar mui-bar-nav">
      <a class="mui-icon mui-pull-left" href="javascript:history.back(-1)">
      </a>
      <h1 class="mui-title">购物车({{shoppingcarList.length}})</h1>
    </header>


    <!--内容-->
    <div class="wrapper" v-if="shoppingcarList.length">
      <!--区域滚动的结构-->
      <div id="refreshContainer" class="mui-scroll-wrapper">
        <div class="mui-scroll">

          <!--content-->
          <ul id="OA_task_2" class="mui-table-view">

            <li v-for="item in shoppingcarList" data-product class="mui-table-view-cell">
              <div class="mui-slider-right mui-disabled">
                <a @click="removeCarProById(item.id)" class="mui-btn mui-btn-red ">删除</a>
              </div>
              <div class="mui-slider-handle">
                <div class="mui-table-cell">

                  <a href="javascript:;" class="mui-navigate-right mui-slider-handle">

                    <img style="margin-bottom:30px;" class="mui-media-object mui-pull-left" :src="item.productImg">
                    <div class="mui-media-body">
                      <p class="name">{{item.productName}} {{item.miaoshu}} </p>
                      <p class="info">
                        <span class="price">{{item.normalPrice}}</span>
                        <span class="oldPrice">¥888.1</span>
                        <span class="number">x{{item.productNum}}双</span>
                      </p>
                    </div>

                    <input @change="calTotalPrice()" type="checkbox" v-model="checkedProd" :value="item.id"/>

                    <span class="right">
                      <span @click="minus(item)">-</span>
                      <span>{{item.productNum}}</span>
                      <span @click="plus(item)">+</span>
                    </span>

                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>


    <!-- 推荐商品 -->
    <div v-show="shoppingcarList.length==0" class="carProList">
      <div class="carEmpty" style="margin-top: 50%;"><p>购物车竟然是空的</p>
        <p>在忙，也要记得买点什么犒赏自己~</p>
        <span @click="$router.push('/category')" style="border: 1px solid gray; padding: 7px; border-radius: 5px;">去逛逛</span>
      </div>

      <h5>>>你可能喜欢 </h5>
    </div>

    <ul v-show="shoppingcarList.length==0" id="tuijian" class="mui-table-view mui-grid-view tuijian"
        style="margin-bottom: 20%;">
      <li @click="toProductDetail(item.id)" v-for="item in productListByOrderCount" id="tuijianPro"
          class="mui-table-view-cell mui-media mui-col-xs-6">
        <a>
          <img class="mui-media-object" :src="item.productImg">
          <div align="left" class="mui-media-body">{{item.productName}}</div>
          <div align="left" class="mui-media-body">{{item.miaoshu}}</div>
          <div align="left" class="mui-media-body"><span style="color: orangered;">￥{{item.normalPrice}}</span>&nbsp;&nbsp;&nbsp;销量:{{item.orderCount}}
          </div>
        </a></li>
    </ul>


    <div class="cart_order">
      <!--<span class="left">-->
      <!--<input type="checkbox" @change="checkAll"/><span>全选</span>-->
      <!--</span>-->
      订单总额：¥
      <span id="cartAmount">{{totalPrice}}</span>
      <a href="javascript:;" @click="prePay">结算({{checkedProd.length}})</a>
    </div>


  </div>

</template>

<script>
  export default {
    name: '',
    data() {
      return {
        shoppingcarList: [],
        totalPrice: 0,
        checkedProd: [],
        productListByOrderCount: []    // 热销商品
      }
    },
    created(){
      console.log(1);

    },
    mounted: function () {
      this.getShoppingcarListByUserId(this.$userInfo.id);

    },
    methods: {
      getShoppingcarListByUserId: function (userId) {
        //先判断是否登录过
        if (!this.$getCookie("userName")) {
          this.$router.push({
            path: "/login"
          });
          return this.$mui.toast('请先登录');
        }

        var data = {
          model: {
            userId: userId
          },
          orderParams: [
            'createTime desc'
          ],
          pageNum: 0,
          pageSize: 5 // 默认5 商品分类不会太多
        }
        this.$axios.post("/getAllShoppingcar", data).then(
          res => {
            console.log(res)
            if (res.data.code == 200) {
              this.shoppingcarList = res.data.content.list
              if (this.shoppingcarList.length == 0) {  // 如果购物车为空 就去请求热销商品
                this.getProductByOrderCount()
              }
            } else {
              this.$mui.toast('获取购物车信息失败')
            }
          })
      },
      minus: function (item) {
        if (item.productNum > 1) {
          item.productNum--
        }
        // 判断商品是否被选中
        for (var i = 0; i < this.checkedProd.length; i++) {
          if (this.checkedProd[i] == item.id) {
            this.calTotalPrice()
          }
        }
      },
      plus: function (item) {
        if (item.productNum < item.deserveNum) {
          item.productNum++
        }
        // 判断商品是否被选中
        for (var i = 0; i < this.checkedProd.length; i++) {
          if (this.checkedProd[i] == item.id) {
            this.calTotalPrice()
          }
        }
      },
      //选择计算价格
      calTotalPrice: function () {
        console.log(this.checkedProd)
        this.totalPrice = 0
        // debugger
        for (var i = 0; i < this.checkedProd.length; i++) {

          var tempProId = this.checkedProd[i]
          for (var j = 0; j < this.shoppingcarList.length; j++) {
            if (tempProId == this.shoppingcarList[j].id) {
              var normalPrice = this.shoppingcarList[j].normalPrice
              var discount = this.shoppingcarList[j].discount
              var killDiscount = this.shoppingcarList[j].killDiscount
              var item = this.shoppingcarList[j]
              this.totalPrice += (normalPrice - (item.isInDiscount == 2 ? discount : 0) - (item.isInKill == 2 ? killDiscount :
                0)) * item.productNum

            }
          }
        }
      },
      //全选
      // checkAll: function () {
      //   var _this = this
      //   if (this.checkedProd.length == this.shoppingcarList.length) {
      //     // 实现反选
      //     this.checkedProd = []
      //   } else {
      //     // 实现全选
      //     this.checkedProd = []
      //     this.shoppingcarList.forEach(function (item) {
      //       _this.checkedProd.push(item.id)
      //     })
      //   }
      //   this.calTotalPrice()
      // },
      getProductByOrderCount: function () {
        var that = this
        //获取热销商品
        this.$axios({
          url: "/getAllProduct",
          method: 'post',
          data: {
            model: {},
            orderParams: [
              'orderCount desc'
            ],
            pageNum: 0,
            pageSize: 8
          }
        }).then(function (res) {
          console.log(res)
          that.productListByOrderCount = res.data.content.list
          // that.productTypeList = res.data.content.list
          // that.bannerImg = res.data.content.list[0].typeImg
        }).catch(function (err) {
          that.$mui.toast('获取商品列表信息失败')
          console.log(err)
        })
      },
      toProductDetail: function (productId) { // 跳转到商品详情页面
        console.log('proId:' + productId)
        this.$router.push({path: '/productDetail', query: {proId: productId}})
      },
      removeCarProById: function (id) {
        var temp = this.shoppingcarList
        this.shoppingcarList = []
        this.$axios("/removeShoppingcarById/" + id).then(
          res => {

            console.log(res);
            if (res.data.code == 200) {
              this.$mui.toast('移除成功')
              this.getShoppingcarListByUserId(this.$userInfo.id);
              this.calTotalPrice();

            } else {
              this.$mui.toast('移除失败')
              this.shoppingcarList = temp
            }
          }
        )
      },
      prePay: function () {

        var temp = []
        // debugger
        for (var i = 0; i < this.shoppingcarList.length; i++) {
          var carProId = this.shoppingcarList[i].id
          for (var j = 0; j < this.checkedProd.length; j++) {
            if (carProId == this.checkedProd[j]) {
              var shoppingcar = this.shoppingcarList[i]
              delete shoppingcar.createTime
              temp.push(shoppingcar)
            }
          }
        }
        console.log(temp)
        this.pay(temp)
      },
      pay: function (arr) {
        console.log(arr);
        this.$axios.post('/pay', arr).then(res => {
          if (res.data.code == 200) {

            console.log(res.data.content)
            this.$router.push({path: '/user/pay', query: {orderId: res.data.content.id}})
          }
        })
      }
    },


  }
</script>

<style scoped="scoped">
  /* 购物车样式 */
  .carProList {
    padding: 20px;
    text-align: center;

  }

  .carProList h5 {
    background-color: #efeff4;
    color: orangered;
    margin-top: 20%;
    text-align: center;
    line-height: 30px;
  }

  .carProduct {
    list-style: none;
    width: 100%;
    height: 100px;
    margin-top: 10px;
    background-color: white;
  }

  .cart_container {
    /*padding: 44px 0 0px;*/
  }

  html,
  body {
    height: 100%;
  }

  .wrapper {
    width: 100%;
    height: 100%;
    position: absolute;
    overflow: hidden;
  }

  .right {
    float: right;
    margin-right: 10px;
  }

  /*==============================================*/
  [data-product] input,
  [data-product] .novalidate {
    position: absolute;
    left: 20px;
    bottom: 10px;
    font-size: 12px;
  }

  [data-product] .name {
    height: 40px;
    line-height: 20px;
    width: 100%;
    overflow: hidden;
    white-space: normal;
    color: #666;
  }

  [data-product] .name {
    height: 40px;
    line-height: 20px;
    width: 100%;
    overflow: hidden;
    white-space: normal;
    color: #666;
  }

  [data-product] .price {
    color: #ff3300;
  }

  [data-product] .oldPrice {
    font-size: 12px;
    color: #ccc;
    text-decoration: line-through;
  }

  [data-product] .size {
    font-size: 12px;
  }

  [data-product] .number {
    float: right;
    margin-right: 20px;
    font-size: 12px;
  }



  .cart_order {
    height: 30px;
    line-height: 30px;
    border-top: 1px solid #ccc;
    position: fixed;
    left: 0;
    bottom: 50px;
    background: #fff;
    width: 100%;
    z-index: 999;
    padding-left: 20px;
    font-size: 14px;
    color: #ff3300;
    font-weight: 600;
  }

  .cart_order a {
    width: 100px;
    text-align: center;
    background: #ff3300;
    display: block;
    float: right;
    color: #fff;
  }
</style>
