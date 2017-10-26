
const key = 'buyGoodsCount';

//存储
export function setItem(goodsinfo){
  var goodsObj = getItem();
  if(goodsObj[goodsinfo.gid]){
    goodsObj[goodsinfo.gid]  += goodsinfo.bcount;
  }else{
    goodsObj[goodsinfo.gid] = goodsinfo.bcount;
  }
  localStorage.setItem(key,JSON.stringify(goodsObj))
}
//获取
export function getItem(){
  var gstr = localStorage.getItem(key);
  var obj = JSON.parse(gstr)
  if(!obj){
    localStorage.setItem(key,JSON.stringify({}));
    return {};
  }
  return obj;
}
//删除
export function remoteItem(gid){
  var goodsObj = getItem();
  delete goodsObj[gid];
  localStorage.setItem(key,JSON.stringify(goodsObj))
}