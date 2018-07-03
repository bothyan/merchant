//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    searchfocus:false,
    orderArr:["","","",""]
  },
  onLoad: function () {
    
  },
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  searchfocus: function(){
    this.setData({
        searchfocus:true
    })
  },
  orders:function(e){
    var index = e.currentTarget.dataset.index;
    var order = this.data.orderArr;
    if(order[index] == ""){
        order[index] = "hover"
    }else{
        order[index] = ""
    }
    this.setData({
        orderArr:order
    });   
  },
  todetail:function(e){
    wx.navigateTo({
      url: 'detail'
    })
  },
  tochuzhi:function(e){
    wx.navigateTo({
      url: 'store'
    })
  }
})
