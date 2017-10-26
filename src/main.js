//导入vue
import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false
//导入vue-router路由
import VueRouter from 'vue-router';
Vue.use(VueRouter);
//导入elementui饿了么框架
import ElementUi from 'element-ui';
Vue.use(ElementUi)
//导入iview
import iview from 'iview';
Vue.use(iview)
//导入vuex
import vuex from 'vuex';
Vue.use(vuex);
//iview的css样式
import 'iview/dist/styles/iview.css';
//导入css样式
import '../statics/site/css/style.css';

//导入axios的使用
import axios from 'axios';
//绑定到Vue原型中，将来每次组件都可以使用，this.$http去调用即可
Vue.prototype.$http = axios;
//设定axios的基本url请求前缀
axios.defaults.baseURL = 'http://157.122.54.189:9095';
//设定axios的参数使得axios发出的ajax请求能够自动带上cookie
axios.defaults.withCredentials = true;

//导入layout模块
import layout from './components/layout.vue';
import goodslist from './components/site/goodslist.vue';
import goodsinfo from './components/site/goodsinfo.vue';
import car from './components/site/car.vue';

//定义路由规则
var router = new VueRouter({
  routes: [{
    name: 'default', //自动 跳转到指定页面
    path: '/',
    redirect: '/site'
  }, {
    name: 'layout', //主页面
    path: '/site',
    component: layout,
    children: [{
        name: 'goodslist', //购物商城页面
        path: 'goodslist',
        component: goodslist
      },
      {
        name: 'goodsinfo', //商城详情页面
        path: 'goodsinfo/:goodsid',
        component: goodsinfo
      },
      {
        name: 'car', //商城详情页面
        path: 'car',
        component: car
      },
    ]
  }]
})
//共有过滤器
Vue.filter("addTime", function (input, gs) {
  var date = new Date(input);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  var d = date.getDate();
  var h = date.getHours();
  var mi = date.getMinutes();
  var s = date.getSeconds();
  if (gs == "YYYY-MM-DD") {
    return y + "-" + m + "-" + d;
  } else {
    return y + "-" + m + "-" + d + " | " + h + ":" + mi + ":" + s;
  }
})





var state = {
  buyCount: 0
}

var actions = {
  chageBuyCount({
    commit
  }, parmsBuyCount) {
    commit("chageBuyCount", parmsBuyCount);
  }
}

var mutations = {
  chageBuyCount(state, parmsBuyCount) {
    state.buyCount += parmsBuyCount;
  }
}

import {
  getItem
} from './kits/localStorageKit.js';
var getters = {
  getCount(state) {
    if (state.buyCount < 0) {
      return state.buyCount
    }
    var goodsObj = getItem();
    console.log(goodsObj)
    var sunBuyCount = 0;
    for (var key in goodsObj) {
      sunBuyCount += goodsObj[key]
    }
    console.log(sunBuyCount)
    return sunBuyCount;
  }
}

var store = new vuex.Store({
  state,
  actions,
  mutations,
  getters
})




/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: create => create(App)
})
