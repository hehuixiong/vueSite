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
            {{ values }}
            <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
              <tbody>
                <tr>
                  <th width="48" align="center">
                    <el-checkbox v-model="ischecked" @change="isAll"></el-checkbox>
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
                    <el-checkbox v-model="values[index]" @change="itemchange"></el-checkbox>
                  </td>
                  <td align="left" colspan="2">
                    <router-link to="">
                      <img width="60" height="60" :src="item.img_url" alt="" style="border: 1px solid #eee;float:left">
                      <p v-text="item.title" style="float:left;line-height:60px;padding-left:8px;"></p>
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
                    <el-button size="small" @click="deldata(item.id)">删除</el-button>
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
              <button class="button">继续购物</button>
              <button class="submit">立即结算</button>
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
    remoteItem
  } from '../../kits/localStorageKit.js';
  import myinput from '../subcom/myinputNumber.vue';
  export default {
    components:{
      myinput
    },
    data() {
      return {
        goodscar: [],
        ischecked: false,
        values: [], //用来初始化默认未选择数据，
        selectCount:0,//用来显示商品的件数
      };
    },
    created() {
      this.getcar();
    },
    //计算属性
    computed: {
      //计算当前用户选择的商品总数量
      selletmentAmount() {
        var trueArr = this.values.filter(function (item) {
          return item;
        });
        this.selectCount = trueArr.length;
        var selleAmount = 0;
        var newArr = [];
        this.values.forEach((item,index)=>{
        var obj = {};
        remoteItem(this.goodscar[index].id);
        setItem({gid:this.goodscar[index].id,bcount:this.goodscar[index].buycount});
          if(item){
            var goodsinfo = this.goodscar[index];
            selleAmount += (goodsinfo.sell_price * goodsinfo.buycount)
          }
        });
        return selleAmount;
      },
    },
    methods: {
      update(obj){
        this.goodscar.forEach(item=>{
          if(item.id == obj.gid){
            item.buycount = obj.count;
          }
          this.goodscar.push('');
          this.goodscar.pop();
        });
      },
      // 删除商品数据
      deldata(goodsid) {
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
        console.log(val)
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
          })

        });
      },
    }
  };

</script>
<style scoped>


</style>
