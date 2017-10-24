// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import ElementUi from 'element-ui';
Vue.use(ElementUi)

//导入css样式
import '../statics/site/css/style.css';

//导入layout模块
import layout from './components/layout.vue';
import goodslist from './components/site/goodslist.vue';
import goodsinfo from './components/site/goodsinfo.vue';

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
    ]
  }]
})

//导入axios的使用
import axios from 'axios';
//绑定到Vue原型中，将来每次组件都可以使用，this.$http去调用即可
Vue.prototype.$http = axios;
//设定axios的基本url请求前缀
axios.defaults.baseURL = 'http://157.122.54.189:9095';
//设定axios的参数使得axios发出的ajax请求能够自动带上cookie
axios.defaults.withCredentials = true;

//判断用户是否登录过，如果没有登录过，跳转到login页面
// router.beforeEach((to, from, next) => {
//   if (to.name == "login") {
//     next();
//   } else {
//     axios.get("/admin/account/islogin").then(res => {
//       if (res.data.code == "logined") {
//         next();
//       } else {
//         router.push({
//           name: "login"
//         });
//       }
//     });
//   }
// })
//过滤器
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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: create => create(App)
})
//ithhx908