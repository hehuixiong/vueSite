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
                <el-carousel indicator-position="outside">
                  <el-carousel-item v-for="(sliderlist,index) in ginfo.sliderlist" :key="index">
                    <img :src="sliderlist.img_url" alt="">
                    <h3>{{ item }}</h3>
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
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        ginfo: {},
      };
    },
    created() {
      this.getginfo();
    },
    methods: {
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
