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
import login from './components/site/login.vue';
import shopping from './components/site/shopping.vue';

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
        name: 'car', //购物车页面
        path: 'car',
        component: car
      },
      {
        name: 'login', //登录页面
        path: 'login',
        component: login
      },
      {
        name: 'shopping', //结算页面
        path: 'shopping',
        component: shopping,
        meta: {
          islogin: true
        },
      },
    ]
  }]
})

//全局守卫---router
router.beforeEach((to, from, next) => {
  //判断，如果不是登录页面就进行保存name，是登录页面就不需要保存
  if (to.name !== 'login') {
    localStorage.setItem('currerRouteName', to.name);//保存name到localStorage中
  }
  //判断，如果路由规则中，带有islogin==true的话，就进行登录验证，否则不需要验证
  if (to.meta.islogin) {
    //通过请求后台接口，返回的数据如果是logined则代表已经登录过，否则就是没有登录过，直接跳转到登录页面即可
    axios.get('/site/account/islogin').then(res => {
      if (res.data.code == 'logined') {
        next();
      }else{
        //没有登录过，直接跳转到登录页面
        router.push({
          name: 'login'
        });
      }
      
    });
  } else {
    //不需要进行验证-直接跳转
    next();
  }
});


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


//设置vuex的一系列方法------------
var state = {
  buyCount: 0
}

var actions = {
  chageBuyCount({commit}, parmsBuyCount) {
    commit("chageBuyCount", parmsBuyCount);
  }
}

var mutations = {
  chageBuyCount(state, parmsBuyCount) {
    state.buyCount += parmsBuyCount;
  }
}

import {getItem} from './kits/localStorageKit.js';
var getters = {
  getCount(state) {
    if (state.buyCount < 0) {
      return state.buyCount
    }
    var goodsObj = getItem();
    var sunBuyCount = 0;
    for (var key in goodsObj) {
      sunBuyCount += goodsObj[key]
    }
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
