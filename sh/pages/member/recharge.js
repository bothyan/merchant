//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    money:"",
    payarr:[true,false,false],
    showpop:false
  },
  onLoad: function () {
    
  },
  money:function(e){

  },
  choosemoney:function(e){
    var money = e.currentTarget.dataset.money;
    this.setData({
        money:money
    })
  },
  toconfirm1:function(e){
    this.setData({
        showpop:true
    })
  },
  toconfirm2:function(e){
    this.setData({
        showpop:false
    })

    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        wx.showModal({
          title: '扫码内容',
          content: res.result,
          success: function(res) {
            
          }
        })
      }
    })
  },
  closepop:function(e){
    this.setData({
        showpop:false
    })
  },
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  choosepay: function(e){
    var index = e.currentTarget.dataset.index;
    var payarr = [false,false,false];
    payarr[index] = true
    this.setData({
        payarr:payarr
    })
  }
})
