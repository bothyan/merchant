//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    payCharge:null
    //selectArr:[false,false,false,false,false]
  },
  onLoad: function () {
    this.getStoreConfig();
  },
  getStoreConfig:function(){
    var that = this;
    /*if(app.shoreConfig){

    }else{
      app.getStoreConfig(function(res){
        that.setData({
          payCharge:res.chargeValid
        })
      })
    }*/
    app.getJson(app.urlMap.chargeConfig,"get",{},function(res){
      if(res.data.code == 0){
        that.setData({
          payCharge:res.data.data.chargeValid
        })
      }
    });
  },
  changes:function(e){
    /*var index = e.currentTarget.dataset.index;
    var selectArr = this.data.selectArr;
    selectArr[index] = !selectArr[index];*/
    var that = this
    this.setData({
        payCharge:!this.data.payCharge
    });   
    app.getJson(app.urlMap.updateConfig,"post",{
      isPayValid:that.data.payCharge,
      isChargeValid:that.data.payCharge
    },function(res){
      if(res.data.code == 0){
        app.getStoreConfig();
      }
    });
  }
})
