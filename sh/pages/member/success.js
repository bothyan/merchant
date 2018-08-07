//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    id:"",
    infos:null
  },
  onLoad: function (options) {
    //console.log(options.id);
    this.setData({
      id:options.id //|| "WBSC1510673537888888881531659602598"
    });
    this.getOrderDetail();
  },
  getOrderDetail:function(){
    var that = this;
    app.getJson(app.urlMap.chargeInfo,"get",{
        orderId:that.data.id
    },function(res){
        console.log(res);
      if(res.data.code == 0){
        that.setData({
            infos:res.data.data
        })
      }
    });
  },
  toconfirm: function() {
    wx.switchTab({
      url: '../index/index'
    })
  },
})
