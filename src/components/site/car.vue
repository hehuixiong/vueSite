<template>
  <div class="car">
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/cart.html">购物车</a>
      </div>
    </div>
    <div class="section">
      <div class="wrapper">
        <div class="bg-wrap" style="padding-bottom:20px">
          <!--购物车头部-->
          <div class="cart-head clearfix">
            <h2>
              <i class="iconfont icon-cart"></i>我的购物车</h2>
            <div class="cart-setp">
              <ul>
                <li class="first active">
                  <div class="progress">
                    <span>1</span>
                    放进购物车
                  </div>
                </li>
                <li>
                  <div class="progress">
                    <span>2</span>
                    填写订单信息
                  </div>
                </li>
                <li class="last">
                  <div class="progress">
                    <span>3</span>
                    支付/确认订单
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!--购物车头部-->
          <!--商品列表-->
          <div class="cart-box">
            <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
              <tbody>
                <tr>
                  <th width="48" align="center">
                    <el-checkbox v-model="ischecked" @change="isAll">全选</el-checkbox>
                    <!-- <a v-model="ischecked" @click="isAll">全选</a> -->
                  </th>
                  <th align="left" colspan="2">商品信息</th>
                  <th width="84" align="left">单价</th>
                  <th width="104" align="center">数量</th>
                  <th width="104" align="left">小计</th>
                  <th width="54" align="center">操作</th>
                </tr>
                <tr v-if="goodscar.length<=0">
                  <td colspan="10">
                    <div class="msg-tips">
                      <div class="icon warning">
                        <i class="iconfont icon-tip"></i>
                      </div>
                      <div class="info">
                        <strong>购物车没有商品！</strong>
                        <p>您的购物车为空，
                          <a href="/index.html">马上去购物</a>吧！</p>
                      </div>
                    </div>
                  </td>
                </tr>

                <tr v-for="(item,index) in goodscar" :key="item.id">
                  <td width="48" align="center">
                    <el-checkbox v-model="values[index]" @change="itemchange(values[index])"></el-checkbox>
                  </td>
                  <td align="left" colspan="2">
                    <router-link to="">
                      <img width="30" :src="item.img_url" alt="" style="border: 1px solid #eee;float:left">
                      <p v-text="item.title" style="float:left;line-height:30px;padding-left:8px;"></p>
                    </router-link>
                  </td>
                  <td width="84" align="left">
                    {{ item.sell_price }}
                  </td>
                  <td width="104" align="center">
                    <myinput @update='update' :options='{gid:item.id,count:item.buycount}'></myinput>
                  </td>
                  <td width="104" align="left" style="color:#34ad2a">{{ item.sell_price * item.buycount }}.00</td>
                  <td width="54" align="center">
                    <el-button size="mini" type="success" @click="deldata(item.id)">删除</el-button>
                  </td>
                </tr>

                <tr>
                  <th align="right" colspan="8" style="color:#34ad2a">
                    已选择商品
                    <b class="red" id="totalQuantity">{{ selectCount }}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                    <span class="red">￥</span>
                    <b class="red" id="totalAmount" style="font-size:20px">{{selletmentAmount}}</b>元
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
          <!--/商品列表-->
          <!--购物车底部-->
          <div class="cart-foot clearfix">
            <div class="right-box">
              <router-link to="">
                <button class="button">继续购物</button>
              </router-link>
              <button class="submit" @click="toShopping">立即结算</button>
            </div>
          </div>
          <!--购物车底部-->
        </div>
      </div>
    </div>
  </div>

</template>
<script>
  import {
    setItem,
    getItem,
    remoteItem,
    updageItem
  } from '../../kits/localStorageKit.js';
  import myinput from '../subcom/myinputNumber.vue';
  export default {
    components: {
      myinput
    },
    data() {
      return {
        goodscar: [], //用来存储接口返回的数据
        ischecked: false,
        values: [], //用来初始化默认未选择数据，
        selectCount: 0, //用来显示商品的件数
        istrue: false,
      };
    },
    created() {
      this.getcar(); //调用接口返回的数据
    },
    //计算属性
    computed: {
      //计算当前用户选择的商品总数量
      selletmentAmount() {
        var trueArr = this.values.filter(function (item) {
          return item;
        });
        this.selectCount = trueArr.length; //返回true的长度，代表选择的件数
        var selleAmount = 0; //用来存储总额
        this.values.forEach((item, index) => {
          // remoteItem(this.goodscar[index].id);//把之前的数据先清除
          //重新设置新的数据
          if (item) {
            var goodsinfo = this.goodscar[index]; //获取数据
            selleAmount += (goodsinfo.sell_price * goodsinfo.buycount) //把接口的数据中的数量*单价
          }
        });
        return selleAmount; //最后把总额返回
      },
    },
    methods: {
      //点击立即结算要处理的逻辑代码

      toShopping() {
        var buycountObj = {};//格式{"88":1}
        this.values.forEach((item, index) => {
          if (item) {
            buycountObj[this.goodscar[index].id] = this.goodscar[index].buycount;
            localStorage.setItem("newBuyCount",JSON.stringify(buycountObj));
            this.$router.push({name:'shopping'});
            return;
          }else{
            this.$message.error("请选择你要购买的商品");
          }
          
        })
        //步骤1：点击的时候需要带下商品的id
        // var ids = '';
        // var idArr = [];
        // //
        // this.values.forEach((item, index) => {
        //   if (item) {
        //     idArr.push(this.goodscar[index].id);
        //     ids = idArr.join(',');
        //     this.$router.push({
        //       name: 'shopping',
        //       params: {
        //         ids: ids
        //       }
        //     });
        //     return;
        //   }
        //   this.$message.success('请选择商品再下单');
        // });
      },
      update(obj) {
        this.goodscar.forEach(item => {
          if (item.id == obj.gid) {
            item.buycount = obj.count;
          }
          this.$store.dispatch("chageBuyCount", obj.count); //更新购物车的数值
          remoteItem(obj.gid); //先把其清除
          setItem({
            gid: obj.gid,
            bcount: obj.count
          }); //再把其设置
          this.goodscar.push(''); //让数组的长度动一动
          this.goodscar.pop();
        });
      },
      // 删除商品数据
      deldata(goodsid) {
        this.$store.dispatch("chageBuyCount");
        // 1.0 删除this.list中这个商品数据
        var index = -1;
        index = this.goodscar.findIndex(function (item) {
          return item.id == goodsid
        });
        this.goodscar.splice(index, 1);
        // 2.0 删除 this.values中的这个商品对应的索引下面的数据
        this.values.splice(index, 1);
        // 3.0 删除localStorage中的这个商品数据
        remoteItem(goodsid);
      },
      //点击单个选中与未选中的时候触发
      itemchange(val) {
        // if (!val) {
        //   this.values.forEach(item => {
        //     if (!item) {
        //       this.ischecked = false;
        //     }
        //   })
        // }
      },
      //点击全选功能
      isAll() {
        for (var i = 0; i < this.values.length; i++) {
          this.values[i] = this.ischecked;
        }
        this.values.push(false);
        this.values.pop();
      },
      //获取购物车的数据
      getcar() {
        var goodsObj = getItem();
        var idArr = [];
        for (var key in goodsObj) {
          idArr.push(key);
        }
        var ids = idArr.join(",");
        var url = '/site/comment/getshopcargoods/';
        this.$http.get(url + ids).then(res => {
          this.goodscar = res.data.message;

          //获取localStorage中的购物车对象
          var goodsObj = getItem();
          this.goodscar.forEach((item, index) => {
            this.values[index] = false;
            //将当前商品的数量赋值给接口中返回的buycount属性
            item.buycount = goodsObj[item.id];
            this.count = goodsObj[item.id];
          })
        });
      },
    }
  };

</script>
<style scoped>


</style>
