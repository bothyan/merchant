//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    money:"",
    payarr:[true,false,false],
    showpop:false,
    userId:"",
    paytype:"WEICHAR",
    shopName:"",
    isChargeValid:true
  },
  onLoad: function (options) {
    console.log(options.id);
    this.setData({
      userId:options.id
    });
    this.getStoreConfig();
    this.getInfo();
  },
  getStoreConfig:function(){
    var that = this;
    app.getJson(app.urlMap.chargeConfig,"get",{},function(res){
      if(res.data.code == 0){
        that.setData({
          isChargeValid:res.data.data.chargeValid
        })
      }
    });
  },
  getInfo:function(){
    var that = this;
    app.getJson(app.urlMap.merchantInfo,"get",{},function(res){
      if(res.data.code == 0){
        that.setData({
          shopName:res.data.data.storeName
        })
      }
    });
  },
  money:function(e){
    this.setData({money:e.detail.value});
  },
  /*choosemoney:function(e){
    var money = e.currentTarget.dataset.money;
    this.setData({
        money:money
    })
  },*/
  toconfirm1:function(e){
    if(this.data.money == ""){
      wx.showToast({
        title: '储值金额不能为空',
        icon: 'none',
        duration: 1500
      })
      return
    }else{
      this.setData({
          showpop:true
      })
    }
  },
  toconfirm2:function(e){
    var that = this;
    that.setData({
        showpop:false
    })
    console.log(that.data.paytype)
    if(that.data.paytype == "WEICHAR" || that.data.paytype == "ALIPAY"){
      wx.scanCode({
        onlyFromCamera: true,
        success: (res) => {
          console.log(res.result);
          wx.showLoading({
            title: '支付中...',
          })
          app.getJson(app.urlMap.charge,"post",{
            userId:that.data.userId,
            amount:that.data.money*100,
            qrCode:res.result,
            channel:that.data.paytype
          },function(res){
            console.log(res);
            if(res.data.code == 0){
              wx.hideLoading()

            }else{
              wx.showToast({
                title: res.data.message,
                icon: 'none',
                duration: 1500
              })
            }
          });
        }
      })
    }else{
      wx.showLoading({
        title: '支付中...',
      })
      app.getJson(app.urlMap.charge,"post",{
        userId:that.data.userId,
        amount:that.data.money*100,
        channel:that.data.paytype,
        qrCode:""
      },function(res){
        console.log(res);
        if(res.data.code == 0){
          wx.hideLoading()
          wx.navigateTo({
            url: 'success?id='+res.data.data
          })
        }else{
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 1500
          })
        }
      });
    }
    
  },
  closepop:function(e){
    this.setData({
        showpop:false
    })
  },
  choosepay: function(e){
    var index = e.currentTarget.dataset.index;
    var type = e.currentTarget.dataset.type;
    var payarr = [false,false,false];
    payarr[index] = true
    this.setData({
        payarr:payarr,
        paytype:type
    })
  }
})
