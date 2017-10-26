<template>
  <div class="goodsinfo">
    <!-- 导航栏 -->
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/goods.html">购物商城</a>
        <a href="/goods/42/1.html">商品详情</a>
      </div>
    </div>
    <!-- 商品详情 -->
    <div class="section" v-if="ginfo.goodsinfo">
      <div class="wrapper clearfix">
        <div class="wrap-box">
          <!--页面左边-->
          <div class="left-925">
            <div class="goods-box clearfix">
              <!--商品图片-->
              <div class="pic-box">
                <div class="magnifier" id="magnifier1">
                  <div class="magnifier-container">
                    <div class="images-cover"></div>
                    <!--当前图片显示容器-->
                    <div class="move-view"></div>
                    <!--跟随鼠标移动的盒子-->
                  </div>
                  <div class="magnifier-assembly">
                    <div class="magnifier-btn">
                      <span class="magnifier-btn-left">&lt;</span>
                      <span class="magnifier-btn-right">&gt;</span>
                    </div>
                    <!--按钮组-->
                    <div class="magnifier-line">
                      <ul class="clearfix animation03">
                        <li v-for="(imglist,index) in ginfo.imglist" :key="index">
                          <div class="small-img">
                            <img :src="imglist.original_path" />
                          </div>
                        </li>
                      </ul>
                    </div>
                    <!--缩略图-->
                  </div>
                  <div class="magnifier-view"></div>
                  <!--经过放大的图片显示容器-->
                </div>
              </div>
              <!--/商品图片-->

              <!--商品信息-->
              <div class="goods-spec">
                <h1>{{ ginfo.goodsinfo.title }}</h1>
                <p class="subtitle">送美诗特TA20无线话筒1套+自拍神器杆！ DTS解码数字功放 HDMI、光纤、同轴多组输入输出 USB、蓝牙播放功能</p>
                <div class="spec-box">
                  <dl>
                    <dt>货号</dt>
                    <dd id="commodityGoodsNo">{{ginfo.goodsinfo.goods_no}}</dd>
                  </dl>
                  <dl>
                    <dt>市场价</dt>
                    <dd>
                      <s id="commodityMarketPrice">¥{{ ginfo.goodsinfo.market_price }}</s>
                    </dd>
                  </dl>
                  <dl>
                    <dt>销售价</dt>
                    <dd>
                      <em class="price" id="commoditySellPrice">¥{{ ginfo.goodsinfo.sell_price }}</em>
                    </dd>
                  </dl>
                </div>

                <div class="spec-box">
                  <dl>
                    <dt>购买数量</dt>
                    <dd>
                      <div class="stock-box">
                        <el-input-number v-model="buyCount" :min="1"></el-input-number>
                      </div>
                      <div style="color:red" v-if="buyCount>ginfo.goodsinfo.stock_quantity"><Icon type="ios-minus-outline"></Icon> 您所填写的商品数量超过库存！</div>
                      <span class="stock-txt">
                        库存
                        <em id="commodityStockNum" v-text="ginfo.goodsinfo.stock_quantity"></em>件
                      </span>
                    </dd>
                  </dl>
                  <dl>
                    <dd>
                      <div class="btn-buy" id="buyButton" >
                        <el-button type="warning" :disabled="buyCount>ginfo.goodsinfo.stock_quantity">立即购买</el-button>
                        <el-button type="danger" @click="cartAdd" :disabled="buyCount>ginfo.goodsinfo.stock_quantity">加入购物车</el-button>
                      </div>
                    </dd>
                  </dl>
                </div>

              </div>
              <!--/商品信息-->
            </div>
            <div id="goodsTabs" class="goods-tab bg-wrap">
              <!--选项卡-->
              <Affix>
                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                  <ul>
                    <li @click="toogleContent(true)">
                      <a v-bind="{class:isContent?'selected':''}" href="javascript:;">商品介绍</a>
                    </li>
                    <!-- selected -->
                    <li @click="toogleContent(false)">
                      <a v-bind="{class:!isContent?'selected':''}" href="javascript:;" class="">商品评论</a>
                    </li>
                    <li>
                      <a href="javascript:;" class="">服务详情</a>
                    </li>
                  </ul>
                </div>
              </Affix>
              <!--/选项卡-->

              <!--选项内容-->
              <div class="tab-content entry" v-if="isContent">
                <p v-html="ginfo.goodsinfo.content"></p>
              </div>

              <div class="tab-content" v-if="!isContent">
                <!--网友评论-->
                <div class="comment-box">
                  <!--取得评论总数-->
                  <form id="commentForm" name="commentForm" class="form-box" url="/tools/submit_ajax.ashx?action=comment_add&amp;channel_id=2&amp;article_id=98">
                    <div class="avatar-box">
                      <i class="iconfont icon-user-full"></i>
                    </div>
                    <div class="conn-box">
                      <div class="editor">
                        <textarea id="txtContent" name="txtContent" v-model="txtContent" datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                        <span class="Validform_checktip"></span>
                      </div>
                      <div class="subcon">
                        <input type="button" value="提交评论" class="submit" @click="btnComment">
                        <span class="Validform_checktip"></span>
                      </div>
                    </div>
                  </form>
                  <ul id="commentList" class="list-box">
                    <p v-if="comment.length<=0" style="margin:5px 0 15px 69px;line-height:42px;text-align:center;border:1px solid #f7f7f7;">暂无评论，快来抢沙发吧！</p>
                    <li v-for="(comment,index) in comment" :key="index">
                      <div class="avatar-box">
                        <i class="iconfont icon-user-full"></i>
                      </div>
                      <div class="inner-box">
                        <div class="info">
                          <span v-text="comment.user_name"></span>
                          <span>{{ comment.add_time | addTime }}</span>
                        </div>
                        <p v-text="comment.content"></p>
                      </div>
                    </li>
                  </ul>
                  <!--放置页码-->
                  <div class="block" style="padding:10px;">
                    <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page.sync="currentPage" :page-sizes="[5, 10, 15, 20]"
                      :page-size="pageSize" layout="total,sizes, prev, pager, next,jumper" :total="totalcount">
                    </el-pagination>
                  </div>
                  <!--/放置页码-->
                </div>

                <!--/网友评论-->
              </div>

            </div>

          </div>
          <!--/页面左边-->

          <!--页面右边-->
          <div class="left-220">
            <div class="bg-wrap nobg">
              <div class="sidebar-box">
                <h4>推荐商品</h4>
                <ul class="side-img-list">
                  <li v-for="(hotgoodslist,index) in ginfo.hotgoodslist">
                    <router-link v-bind="{to:'/site/goodsinfo/'+hotgoodslist.id}">
                      <div class="img-box">
                        <img :src="hotgoodslist.img_url">
                      </div>
                      <div class="txt-box">
                        <a v-text="hotgoodslist.title"></a>
                        <span>{{ hotgoodslist.add_time | addTime("YYYY-MM-DD") }}</span>
                      </div>
                    </router-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!--/页面右边-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import '../../../statics/site/js/jqplugins/imgzoom/magnifier.js';
  import Affix from 'iview/src/components/affix';
  import {setItem} from '../../kits/localStorageKit.js';
  export default {
    components: {
      Affix,
    },
    data() {
      return {
        ginfo: {},
        num: 1, //计算器默认数量
        isContent: true, //控制
        comment: [],
        currentPage: 1, //当前页数
        pageSize: 10, //显示条数
        totalcount: 0, //总条数
        txtContent: '',
        buyCount:1,
      };
    },
    created() {
      this.getginfo();//调用商品详情的数据
      this.getComment();//调用评论的数据
    },
    //监听
    watch: {
      '$route': function () {
        this.getginfo();
        this.getComment();
        this.buyCount = 1;
      }
    },
    methods: {
      //点击加入购物车
      cartAdd(){
        this.$store.dispatch("chageBuyCount",this.buyCount);
        setItem({gid:this.$route.params.goodsid,bcount:this.buyCount});
      },
      //评论提交
      btnComment() {
        var goodsid = this.$route.params.goodsid;
        this.$http.post('/site/validate/comment/post/goods/' + goodsid, "commenttxt=" + this.txtContent)
          .then(res => {
            if (res.data.status == 1) {
              this.$message.error(res.data.message);
              return;
            }
            //提交之后重置为空
            this.txtContent = '';
            //重新获取
            this.getComment();
          });
      },
      /* 选择显示条数 */
      sizeChange(sizeIndex) {
        this.loading = true;
        this.pageSize = sizeIndex;
        this.currentPage = 1;
        this.getComment();
      },
      /* 页数 */
      currentChange(pageIndex) {
        this.loading = true;
        this.currentPage = pageIndex;
        this.getComment();
      },
      //评论数据渲染
      getComment() {
        var goodsid = this.$route.params.goodsid;
        var url = '/site/comment/getbypage/goods/' + goodsid + '?pageIndex=' + this.currentPage + '&pageSize=' + this.pageSize;
        this.$http.get(url)
          .then(res => {
            if (res.data.status == 1) {
              this.$message.error(res.data.message);
              return;
            }
            this.comment = res.data.message;
            this.totalcount = res.data.totalcount;
          });
      },
      //控制商品详细介绍跟评论
      toogleContent(toogle) {
        this.isContent = toogle;
      },
      //获取商品详情的数据
      getginfo() {
        var goodsid = this.$route.params.goodsid;
        var url = '/site/goods/getgoodsinfo/' + goodsid;
        this.$http.get(url)
          .then(res => {
            if (res.data.status == 1) {
              this.$message.error(res.data.message);
              return;
            }
            this.ginfo = res.data.message;
            //数据渲染好了之后在调用放大镜插件
            setTimeout(() => {
              $('#magnifier1').imgzoon({
                magnifier: '#magnifier1'
              });
            }, 100)
          });
      },
    }
  };

</script>
<style scoped>
  @import url('../../../statics/site/js/jqplugins/imgzoom/css/magnifier.css');
  .el-input-number {
    width: 130px;
  }

</style>
