//index.js
//获取应用实例
const app = getApp()
var util = require('../../utils/util.js');

Page({
  data: {
    userId:"",
    useInfos:null
  },
  onLoad: function (options) {
    this.setData({
      userId:options.id
    });
    this.getDetails();
  },
  getDetails:function(){
    var that = this;
    app.getJson(app.urlMap.getUserInfo,"get",{userId:that.data.userId},function(res){
      console.log(res);
      if(res.data.code == 0){
        var data = res.data.data;
        data.birthday = util.formatDate(data.birthday)
        data.lastPayTime = util.formatTime(data.lastPayTime)
        if(data.payCount>0){
          data.payAverage = parseFloat(data.payAmount/data.payCount).toFixed(2);
        }else{
          data.payAverage = 0;
        }
        that.setData({
          useInfos:data
        })
      }
    });
  },
  toedit: function() {
    var that = this;
    wx.navigateTo({
      url: 'edit?id='+that.data.userId
    })
  },
  tocoupon: function(){
    /*wx.navigateTo({
      url: 'coupon'
    })*/
  },
  tochuzhi:function(e){
    var that = this;
    wx.navigateTo({
      url: 'recharge?id='+that.data.userId
    })
  },
  toconsumption:function(e){
    var that = this;
    wx.navigateTo({
      url: 'consumehistory?id='+that.data.userId
    })
  },
  tostored:function(){
    var that = this;
    wx.navigateTo({
      url: 'storedhistory?id='+that.data.userId
    })
  }
})
