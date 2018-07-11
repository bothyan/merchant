//index.js
//获取应用实例
const app = getApp()

Page({
  data: {

  },
  onLoad: function () {
    this.getData();
  },
  getData:function(){
    app.getJson(app.urlMap.userCard,"get",{
    },function(res){
      console.log(res);
    });
  }
})
