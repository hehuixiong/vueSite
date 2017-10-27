<template>
  <div class="login">
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/login.html">会员登录</a>
      </div>
    </div>
    <div class="section">
      <div class="wrapper">
        <div class="bg-wrap">
          <div class="nav-tit">
            <a class="selected" href="javascript:;">账户登录</a>
            <i>|</i>
            <a href="/register.html">免费注册</a>
          </div>
          <div class="login-box">
            <div class="input-box">
              <input type="text" v-model="from.user_name"  placeholder="用户名/手机/邮箱" maxlength="50">
            </div>
            <div class="input-box">
              <input type="password" v-model="from.password" placeholder="输入登录密码" maxlength="16">
            </div>
            <div class="btn-box">
              <input type="button" @click="login" value="立即登录">
            </div>
            <div id="msgtips" class="tip-box"></div>
            <input id="turl" name="turl" type="hidden" value="http://localhost:8020/cart.html">
            <!--记住上一页网址-->
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
        from:{
          user_name:'',
          password:''
        }
      }
    },
    methods: {
      //登录
      login(){
        //发出请求
        var url = '/site/account/login';
        this.$http.post(url,this.from).then(res=>{
          if(res.data.status == 1){
            this.$message.error(res.data.message);
            return;
          }
          //获取localStorage中的name
          var pathName = localStorage.getItem('currerRouteName');
          //如果没有pathName就跳转到goodslist页面
          if(!pathName){
            this.$router.push({name:'goodslist'});
          }
          //有pathName的话就跳转到之前的页面
          this.$router.push({name:pathName});
        });
      },
    }
  }

</script>
<style scoped>


</style>
