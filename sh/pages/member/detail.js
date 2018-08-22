//index.js
//获取应用实例
const app = getApp()
var util = require('../../utils/util.js');

Page({
  data: {
    userId:"",
    useInfos:null,
    realMember:false
  },
  onShow:function(options){
    
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
      userId:options.id
    });
    this.getDetails();
  },
  getDetails:function(){
    var that = this;
    app.getJson(app.urlMap.getUserInfo,"get",{userId:that.data.userId},function(res){
      if(res.data.code == 0){
        var data = res.data.data;
        if(data.realName){
          that.setData({
            realMember:true
          })  
        }
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
        wx.hideLoading()
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
    var realMember = that.data.realMember;
    var type = wx.getStorageSync('sh_accountType');
    if(type !== 2){
      wx.showToast({
        title: '没有权限储值',
        icon: 'none',
        duration: 1500
      })
    }else{
      if(realMember){
        wx.navigateTo({
          url: 'recharge?id='+that.data.userId
        }) 
      }else{
        wx.showToast({
          title: '用户会员卡未创建！',
          icon: 'none',
          duration: 1500
        })  
      }  
    }
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
