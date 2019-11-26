<template>
  <div>
    <vp-top :title="'分类'"></vp-top>

    <div class="lt_content">
      <div class="lt_wrap">
        <div class="cate_left">
          <ul>
            <li v-for="(item,index) in productTypeList" @click="changeType(item,index)" :class="{'now':position==index}">
              <a>{{item.producttypeName}}</a></li>

          </ul>
        </div>
        <div class="cate_right">
          <div class="hot">
            <h3>新品推荐</h3>
            <ul class="clearFix">
              <li @click="toProductDetail(item.id)" v-for="item in productListByCreateTime">
                <a>
                  <img :src="item.productImg" alt=""/>
                  <p>{{item.productName}}</p>
                </a>
              </li>
            </ul>
            <p v-show="productListByCreateTime.length==0" class="noProduct">暂无商品</p>
          </div>
          <div class="hot">
            <h3>热销商品</h3>
            <ul class="clearFix">
              <li @click="toProductDetail(item.id)" v-for="item in productListByOrderCount">
                <a>
                  <img :src="item.productImg" alt=""/>
                  <p>{{item.productName}}</p>
                </a>
              </li>
            </ul>
            <p v-show="productListByOrderCount.length==0" class="noProduct">暂无商品</p>
          </div>

          <div class="hot">
            <h3>热门商品</h3>
            <ul class="clearFix">
              <li @click="toProductDetail(item.id)" v-for="item in productListByViewNum">
                <a>
                  <img :src="item.productImg" alt=""/>
                  <p>{{item.productName}}</p>
                </a>
              </li>
            </ul>
            <p v-show="productListByViewNum.length==0" class="noProduct">暂无商品</p>

          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import vpTop from '../subComponents/vpTop'

  export default {
    name: 'category',
    components:{
      vpTop
    },
    data() {
      return {
        productTypeList: [],  // 商品分类列表
        productListByCreateTime: [],  // 商品分类列表
        productListByViewNum: [],  // 热门商品列表
        productListByOrderCount: [],  // 热销商品列表
        bannerImg: '',   // 分类的图片
        position: 0   //  默认让第一个分类显示点击样式
      }
    },
    methods: {
      //1.一级分类
      getAllProductType() {
        this.$axios.post("/getAllProducttype",{
          model: {},
          orderParams: [
            'viewNum desc'
          ],
          pageNum: 0,
          pageSize: 1000  // 默认1000 商品分类不会太多
        }).then((res) => {
          console.log(res)
          this.productTypeList = res.data.content.list
          this.getProductListByTypeId(this.productTypeList[0].id) //默认展示第一个商品分类的商品
          // this.bannerImg = res.data.content.list[0].typeImg // 默认banner图显示第一个分类的图片
        }).catch((err) => {
          this.$mui.toast('获取商品分类信息失败')
        })
      },
      getProductListByTypeId: function (typeId) {
        // 获取新品推荐商品
        this.$axios({
          url: "/getAllProduct",
          method: 'post',
          data: {
            model: {
              'typeId': typeId
            },
            orderParams: [
              'createTime desc'
            ],
            pageNum: 0,
            pageSize: 6
          }

        }).then((res) => {
          this.productListByCreateTime = res.data.content.list
          // that.productTypeList = res.data.content.list
          // that.bannerImg = res.data.content.list[0].typeImg
        }).catch(function (err) {
          this.$mui.toast('获取商品列表信息失败')
        })

        //获取热门商品
        this.$axios({
          url: "/getAllProduct",
          method: 'post',
          data: {
            model: {
              'typeId': typeId
            },
            orderParams: [
              'viewNum desc'
            ],
            pageNum: 0,
            pageSize: 6
          }
        }).then((res) => {
          this.productListByViewNum = res.data.content.list
        }).catch(function (err) {
          this.$mui.toast('获取商品列表信息失败')
        })

        //获取热销商品
        this.$axios({
          url: "/getAllProduct",
          method: 'post',
          data: {
            model: {
              'typeId': typeId
            },
            orderParams: [
              'orderCount desc'
            ],
            pageNum: 0,
            pageSize: 6
          }

        }).then((res) => {
          this.productListByOrderCount = res.data.content.list
        }).catch(function (err) {
          this.$mui.toast('获取商品列表信息失败')
        })

      },
      changeType: function (item, index) {
        // 后台刷新该分类点击量
        this.addProducttypeViewNum(item.id)
        //修改banner图
        this.bannerImg = item.typeImg
        //修改被点击的分类的active样式
        this.position = index
        //根据商品分类id  查询获取相应的商品列表
        this.getProductListByTypeId(item.id)

      },

      addProducttypeViewNum: function (typeId) {  //  刷新分类的浏览量
        this.$axios('/addProducttypeViewNum/' + typeId)
      },
      toProductDetail: function (productId) { // 跳转到商品详情页面
        console.log('proId:' + productId)
        this.$router.push({path: '/productDetail', query: {proId: productId}})
      }
    },
    mounted: function () {
      this.getAllProductType()
    }

  }
</script>

<style lang="less" scoped>

  .lt_content .cate_left {
    width: 90px;
    height: 100%;
    float: left;
    overflow: hidden;
    ul {
      width: 100%;
      li {
        height: 50px;
        width: 100%;
        line-height: 50px;
        text-align: center;
        background: #f3f4f5;
        border-bottom: 1px solid #ccc;
        border-right: 1px solid #ccc;
        border-top: 1px solid #ccc;
        &.now {
          border-right: none;
          border-bottom: none;
          background: #fff;
          a {
            color: orange;
          }
        }
        a {
          display: block;
          font-size: 14px;
          color: #333;

        }
      }
    }
  }

  /*二级分类*/
  .cate_right {
    overflow: hidden;
    .hot{
      margin: 10px 0;
      overflow: hidden;
      h3{
        text-align: center;
        font-size: 14px;
        line-height: 26px;
        border-radius: 20px;
        box-shadow: 1px 1px 2px 2px #eee;
        margin-bottom: 10px;
      }
      p{
        text-align: center;
      }
      ul {
        width: 100%;
        li {
          float: left;
          width: 33.33%;
          a {
            display: block;
            text-align: center;
            img {
              width: 60px;
            }
            p{
              font-size: 12px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
        }
      }

    }

  }


</style>
