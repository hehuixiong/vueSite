<template>
  <div class="shopping">
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/cart.html">购物车</a>
      </div>
    </div>

    <div class="section">
      <div class="wrapper">
        <div class="bg-wrap">
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
                <li class="active">
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
          <!--/购物车头部-->
          <!-- 收货信息 -->
          <div class="cart-box">
            <h2 class="slide-tit">
              <span>1、收货地址</span>
            </h2>

            <el-form :model="myform" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-row>
                <el-col :span="12" :offset="4">
                  <div class="form-box address-info">
                    <!-- 收货人姓名 -->
                    <el-form-item label="收货人" prop="accept_name">
                      <el-input v-model="myform.accept_name"></el-input>
                    </el-form-item>
                    <!-- 省市区三级联动 -->
                    <el-form-item label="收货地区">
                      <v-distpicker @selected="onSelected"></v-distpicker>
                    </el-form-item>
                    <!-- 详细地址 -->
                    <el-form-item label="详细地址" prop="address">
                      <el-input v-model="myform.address"></el-input>
                    </el-form-item>
                    <!-- 手机号码 -->
                    <el-form-item label="手机号码" prop="mobile">
                      <el-input v-model="myform.mobile"></el-input>
                    </el-form-item>
                    <!-- 联系电话 -->
                    <el-form-item label="联系电话">
                      <el-input></el-input>
                    </el-form-item>
                    <!-- 电子邮箱 -->
                    <el-form-item label="电子邮箱" prop="email">
                      <el-input v-model="myform.email"></el-input>
                    </el-form-item>
                    <!-- 邮箱编码 -->
                    <el-form-item label="邮箱编码" prop="post_code">
                      <el-input v-model="myform.post_code"></el-input>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <h2 class="slide-tit">
                <span>2、支付方式</span>
              </h2>
              <div class="item-box clearfix">
                <!--取得一个DataTable-->
                <el-radio class="radio" v-model="myform.payment_id" :label="myform.payment_id">在线支付</el-radio>
              </div>
              <h2 class="slide-tit">
                <span>3、配送方式</span>
              </h2>
              <div class="item-box clearfix">
                <!--取得一个DataTable-->
                <el-radio-group v-model="myform.express_id" @change="isexpress_fee">
                  <el-radio :label="item.id" v-for="(item,index) in express" :key="index">{{ item.title }} (运费价格：{{item.express_fee}}元)&nbsp;&nbsp;&nbsp;&nbsp;</el-radio>
                </el-radio-group>
              </div>
              <h2 class="slide-tit">
                <span>4、商品清单</span>
              </h2>
              <div class="line15"></div>
              <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                <tbody>
                  <tr>
                    <th colspan="2" align="left">商品信息</th>
                    <th width="84" align="left">单价</th>
                    <th width="84" align="center">购买数量</th>
                    <th width="104" align="left">金额(元)</th>
                  </tr>
                  <tr v-for="item in goodsData" :key="item.id">
                    <td width="68">
                      <router-link v-bind="{to:'/site/goodsinfo/'+item.id}">
                        <img width="60" :src="item.img_url" alt="">
                      </router-link>
                    </td>
                    <td>
                      <router-link v-bind="{to:'/site/goodsinfo/'+item.id}">
                        {{ item.title }}
                      </router-link>
                    </td>
                    <td>
                      <span class="red">
                        ￥{{ item.sell_price }}.00
                      </span>
                    </td>
                    <td align="center">{{ item.buycount }}</td>
                    <td>
                      <span class="red">
                        ￥{{ item.sell_price * item.buycount }}.00
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="line15"></div>
              <h2 class="slide-tit">
                <span>5、结算信息</span>
              </h2>
              <div class="buy-foot clearfix">
                <div class="left-box">
                  <dl>
                    <dt>订单备注(100字符以内)</dt>
                    <dd>
                      <textarea name="message" v-model="myform.message" class="input" style="height:35px;"></textarea>
                    </dd>
                  </dl>
                </div>
                <div class="right-box">
                  <p>
                    商品
                    <label class="price">{{ goodsData.length }}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                    <label id="goodsAmount" class="price">{{ myform.goodsAmount }}.00</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                  </p>
                  <p>
                    运费：￥
                    <label id="expressFee" class="price">{{ myform.expressMoment }}.00</label> 元
                  </p>
                  <p class="txt-box">
                    应付总金额：￥
                    <label id="totalAmount" class="price">{{ totalAmount }}.00</label>
                  </p>
                  <p class="btn-box">
                    <a class="btn button" href="/cart.html">返回购物车</a>
                    <input id="btnSubmit" name="btnSubmit" type="button" value="确认提交" class="btn submit" @click="submitForm('ruleForm')">
                  </p>
                </div>
              </div>
            </el-form>
          </div>
          <!-- /收货信息 -->
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
  import VDistpicker from 'v-distpicker';
  import {
    getItem
  } from '../../kits/localStorageKit.js';
  export default {
    components: {
      VDistpicker //三级联动插件
    },
    data() {
      //验证手机号码的正则表达式
      var checkMobile = (rule, value, callback) => {
        var reg = /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/;
        if (!reg.test(value)) {
          return callback(new Error('手机号码格式错误'));
        }
        callback();
      }
      return {
        express: [], //快递信息
        goodsData: [ //根据商品id字符串，获取商品数据
          /*
            id: 88,
            title: "苹果Apple iPhone 6 Plus 16G 4G手机（联通三网版）",
            img_url: "http://139.199.192.48:6060/upload/201504/20/thumb_201504200059017695.jpg",
            sell_price: 5780,
            buycount: 1,
            totalamount: 5780
          */
        ],
        // 我的表单
        myform: {
          accept_name: '', //收货人
          address: '', //收货地址
          mobile: '', //手机号码
          email: '', //邮箱email
          post_code: '', //邮编
          payment_id: 6, //支付方式id
          express_id: 1, //运送方式-默认是第一个
          message: '', //订单备注信息
          cargoodsobj: JSON.parse(localStorage.getItem("newBuyCount")), //购买商品对象{'88':1,'89',2}//把取出来的对象赋值给需要传给后台的cargoodsobj中，这样就可以直接传过去了
          goodsAmount: 0, //商品总额
          expressMoment: 20, //快递费
          goodsids: 0, //商品的ids
          area: {}, //三级联动
        },
        // 表单验证
        rules: {
          accept_name: [{
            required: true,
            message: '请输入收货人',
            trigger: 'blur'
          }, ],
          address: [{
            required: true,
            message: '请输入详细地址',
            trigger: 'blur'
          }, ],
          mobile: [{
            validator: checkMobile,
            trigger: 'blur'
          }, ],
        },
      }
    },
    created() {
      this.getPlaceData();
      this.getExpress();
    },
    // 计算属性
    computed: {
      totalAmount() {
        //总价加上运费
        return this.myform.goodsAmount + this.myform.expressMoment;
      }
    },
    methods: {
      //运费价格
      isexpress_fee(expressid) {
        var newArr = this.express.filter(function (item) {
          return item.id == expressid
        });
        this.myform.expressMoment = newArr[0].express_fee;
      },
      //下单操作
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //发送请求post
            this.$http.post('/site/validate/order/setorder', this.myform).then(res => {
              if (res.data.status == 1) {
                this.$message.error(res.data.message);
                return;
              }
              this.$message.success("下单成功");
              setTimeout(()=>{
                this.$router.push({name:'pay',params:{orderid:res.data.message.orderid}});
              },1000);
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      //获取快递运送方式
      getExpress() {
        var url = '/site/validate/order/getexpresslist';
        this.$http.get(url).then(res => {
          this.express = res.data.message;
        });
      },
      //获取商品信息的数据
      getPlaceData() {
        //把存在localStorage中的newBuyCount取出来，取出来的是一个对象
        var goodsObj = JSON.parse(localStorage.getItem("newBuyCount"));
        var idsArr = [];
        for (var key in goodsObj) {
          //把localStorage取出来的对象追加到一个新的数组中--['88','89']-这种格式
          idsArr.push(key)
        }
        this.myform.goodsids = idsArr.join(","); //最后把数组中的值分割出来 88,89
        var url = '/site/validate/order/getgoodslist/' + this.myform.goodsids;
        this.$http.get(url).then(res => {
          if (res.data.status == 1) {
            this.$message.error(res.data.message);
            return;
          }
          //赋值
          this.goodsData = res.data.message;
          //商品总金额
          // this.myform.goodsAmount = (res.data.message.sell_price * res.data.message.buycount)
          var goodsObj = getItem();
          this.goodsData.forEach(item => {
            item.buycount = goodsObj[item.id]
            this.myform.goodsAmount += (item.buycount * item.sell_price);
            // console.log(item.buycount * item.sell_price)
          })
        })
      },
      //三级联动-把数据传给myform中的area
      onSelected(area) {
        this.myform.area = area;
      },
    }
  }

</script>
<style scoped>


</style>
