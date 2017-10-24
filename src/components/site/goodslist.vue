<template>
  <div class="goodslist">
    <div class="section">
      <!-- 面包屑 -->
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/goods.html">购物商城</a>
      </div>
      <div class="wrapper">
        <div class="wrap-box">
          <!--类别菜单-->
          <div class="left-220" style="margin:0;">
            <div class="banner-nav">
              <ul>
                <!--此处声明下面可重复循环-->

                <li v-for="(catelist,index) in ginfo.catelist" :key="index">
                  <h3>
                    <i class="iconfont icon-arrow-right"></i>
                    <span v-text="catelist.title"></span>
                    <p>
                      <span v-for="(subcates,index) in catelist.subcates" :key="index">
                        {{ subcates.title }} &nbsp;</span>
                    </p>
                  </h3>
                  <div class="item-box">
                    <!--如有三级分类，此处可循环-->
                    <dl>
                      <dt>
                        <a href="javascript:;">{{ catelist.title }}</a>
                      </dt>
                      <dd>
                        <a href="javascript:;" v-for="(subcates,index) in catelist.subcates" :key="index">{{ subcates.title }}</a>
                      </dd>
                    </dl>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!--/类别菜单-->

          <!--幻灯片-->
          <div class="left-705">
            <div class="banner-img">
              <div id="focus-box" class="focus-box">
                <el-carousel :interval="2000" arrow="hover">
                  <el-carousel-item v-for="(sliderlist,index) in ginfo.sliderlist" :key="index">
                    <img :src="sliderlist.img_url" alt="">
                    <!-- <h3>{{ sliderlist.title }}</h3> -->
                  </el-carousel-item>
                </el-carousel>
              </div>
            </div>
          </div>
          <!--/幻灯片-->

          <!--推荐商品-->
          <div class="left-220">
            <ul class="side-img-list">

              <li v-for="(toplist,index) in ginfo.toplist" :key="index">
                <div class="img-box">
                  <label>1</label>
                  <img :src="toplist.img_url">
                </div>
                <div class="txt-box">
                  <a href="javascript:;" v-text="toplist.title"></a>
                  <span>{{ toplist.add_time | addTime("YYYY-MM-DD") }}</span>
                </div>
              </li>
            </ul>
          </div>
          <!--/推荐商品-->
        </div>
      </div>
      <!-- 手机数码 -->
      <div v-for="(glist,index) in glist" :key="index">
        <!--子类-->
        <div class="main-tit">
          <h2 v-text="glist.catetitle"></h2>
          <p>
            <a href="/goods/43.html" v-for="(level2catelist,index) in glist.level2catelist" :key="index">{{ level2catelist.subcatetitle }}</a>
            <a href="/goods/40.html">更多
              <i>+</i>
            </a>
          </p>
        </div>
        <!--/子类-->
        <div class="wrapper clearfix">
          <div class="wrap-box">
            <ul class="img-list">
              <li v-for="(datas,index) in glist.datas" :key="index">
                <a href="javascript:;">
                  <div class="img-box">
                    <img :src="datas.img_url">
                  </div>
                  <div class="info">
                    <h3 v-text="datas.artTitle"></h3>
                    <p class="price">
                      <b>¥{{ datas.sell_price }}</b>元</p>
                    <p>
                      <strong>库存 {{ datas.stock_quantity }}</strong>
                      <span>市场价：
                        <s>{{ datas.market_price }}</s>
                      </span>
                    </p>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        ginfo: {},
        glist:[],
      };
    },
    created() {
      this.getginfo();
      this.getglist();
    },
    methods: {
      //获取glist的数据
      getglist(){
        var url = '/site/goods/getgoodsgroup';
        this.$http.get(url)
        .then(res=>{
          if (res.data.status == 1) {
              this.$message.error(res.data.message);
              return;
            }
            this.glist = res.data.message;
            console.log(this.glist)
        });
      },
      //获取左侧菜单栏，轮播图，置顶商品数据
      getginfo() {
        var url = '/site/goods/gettopdata/goods';
        this.$http.get(url)
          .then(res => {
            if (res.data.status == 1) {
              this.$message.error(res.data.message);
              return;
            }
            this.ginfo = res.data.message;
            console.log(this.ginfo)
          });
      },
    }
  };

</script>
<style>
  .el-carousel__item {
    height: 341px;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    /* line-height: 400px; */
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

</style>
