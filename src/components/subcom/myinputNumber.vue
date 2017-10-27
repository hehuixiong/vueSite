<template>
  <div class="mycom">
    <el-button @click='substrict' :disabled="count<=1">-</el-button>
    <el-button>{{count}}</el-button>
    <el-button @click='add'>+</el-button>
  </div>
</template>

<script>
  import {setItem,remoteItem} from '../../kits/localStorageKit.js';
  export default {
    data() {
      return {
        count:1
      }
    },
    props:['options'],
    created(){
      this.count = this.options.count;
    },
    methods: {
      substrict(){
        this.count --;
        this.send();
      },
      add(){
        this.count ++;
        this.send();
      },
      send(){
        this.$store.dispatch("chageBuyCount",this.count);
        this.$emit('update',{gid:this.options.gid,count:this.count});
        remoteItem(this.options.gid);
        setItem({gid:this.options.gid,bcount:this.count});
      },
    }
  }

</script>
<style scoped>
.mycom  {
  width: 140px;
}
.mycom .el-button {
  width: 30px;
  padding: 2px;
  height: 30px;
  margin-left: 0px;
}
.mycom .el-button:nth-child(2){
  width: 40px;
}
</style>
