//index.js
//获取应用实例
const app = getApp()
var util = require('../../utils/util.js');
Page({
  data: {
    balanceChargeAmount:0,
    balancePayAmount:0,
    list:[],
    pageSize:10,
    pageNo:1,
    total:0
  },
  onLoad: function () {
    this.getInfoData();
    this.getList();
  },
  onReachBottom:function(){
    var that = this;
    if(that.data.total>that.data.list.length){
      var pageNo = that.data.pageNo;
      that.setData({
        pageNo:pageNo+1
      })
      that.getList();
    }else{
      wx.showToast({
        title: '已经到低了',
        icon: 'none',
        duration: 1000
      })
    }
  },
  getInfoData:function(){
    var that = this;
    app.getJson(app.urlMap.balancesummary,"get",{
    },function(res){
        console.log(res);
        if(res.data.code == 0){
            var data = res.data.data;
            that.setData({
              balanceChargeAmount: data.balanceChargeAmount,
              balancePayAmount:data.balancePayAmount
            })
        }     
    });
  },
  getList:function(){
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    app.getJson(app.urlMap.chargeList,"get",{
        pageSize:that.data.pageSize,
        pageNo:that.data.pageNo,
    },function(res){
        if(res.data.code == 0){
            var data = res.data.data;
            data.list.map(function(item,key){
                item.ctime = util.formatTime(item.ctime)
                return item;
              });
            var list = that.data.list.concat(data.list)
            that.setData({
              list: list,
              total:data.total
            })
            wx.hideLoading()
        }
    });
  }
})
