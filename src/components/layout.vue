<template>
  <div class="layout">
    <div id="header" class="header">
      <div class="head-top">
        <div class="section">
          <div class="left-box">
            <span>vue2.0单页应用</span>
            <a target="_blank" href="#"></a>
            <a target="_blank" href="#"></a>
          </div>
          <div id="menu" class="right-box">
            <a href="/login.html">登录</a>
            <a href="/register.html">注册</a>
            <strong>|</strong>
            <!-- <a href="/content/contact.html"><i class="iconfont icon-phone"></i>联系我们</a> -->
            <router-link to="/site/car" v-bind="{style:this.$store.getters.getCount>0?'background:#fabd00;color:#fff':''}">
              <i class="iconfont icon-cart"></i>购物车<span id="shoppingCartCount">({{ this.$store.getters.getCount }})</span>
            </router-link>
          </div>
        </div>
      </div>
      <div class="head-nav">
        <div class="section">
          <!-- <div class="logo">
            <a href="/index.html"><img width="230px" height="70px" src="/templates/main/images/logo.png" /></a>
          </div>-->
          <div id="menu2" class="nav-box menuhd">
            <ul>
              <li class="index">
                <router-link to="/site/goodslist0">首页</router-link>
              </li>
              <li class="news">
                <router-link to="/site/goodslist1">学员问题汇总</router-link>
              </li>
              <li class="photo">
                <router-link to="/site/goodslist2">重点难专区</router-link>
              </li>
              <li class="video">
                <router-link to="/site/goodslist3">前端常用功能</router-link>
              </li>
              <li class="down">
                <router-link to="/site/goodslist4">资源下载</router-link>
              </li>
              <li>
                <router-link to="/site/goodslist">购物商城</router-link>
              </li>
            </ul>
          </div>
          <div class="search-box">
            <div class="input-box">
              <input id="keywords" name="keywords" type="text" onkeydown="if(event.keyCode==13){SiteSearch('/search.html', '#keywords');return false};"
                placeholder="输入关健字" x-webkit-speech="">
            </div>
            <a href="javascript:;" onclick="SiteSearch('/search.html', '#keywords');">
              <i class="iconfont icon-search"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
    <footer>底部</footer>
  </div>
</template>
<script>
  $(function () {
    $("#menu2 li a").wrapInner('<span class="out"></span>');
    $("#menu2 li a").each(function () {
      $('<span class="over">' + $(this).text() + '</span>').appendTo(this);
    });

    $("#menu2 li a").hover(function () {
      $(".out", this).stop().animate({
        'top': '48px'
      }, 300); // move down - hide
      $(".over", this).stop().animate({
        'top': '0px'
      }, 300); // move down - show

    }, function () {
      $(".out", this).stop().animate({
        'top': '0px'
      }, 300); // move up - show
      $(".over", this).stop().animate({
        'top': '-48px'
      }, 300); // move up - hide
    });

  });
  // import {getItem} from '../kits/localStorageKit.js';
  export default {
    data() {
      return {
      };
    },
    mounted() {
    },
    methods: {
      
    }
  };

</script>
<style>
  /* 为了解决统一导入elemenui的样式,所以要放到layout.vue */
  /* 导入样式的格式  @import url() */

  @import url('../../statics/elementuiCss/index.css');
  .right-box a,.right-box strong{
    float: left;
  }
  .right-box a:last-child{
    padding: 0 10px;
  }
</style>
