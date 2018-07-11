//index.js
//获取应用实例
const app = getApp()
var util = require('../../utils/util.js');
Page({
  data: {
    balanceChargeAmount:0,
    balancePayAmount:0,
    list:[]
  },
  onLoad: function () {
    this.getData();
  },
  getData:function(){
    var that = this;
    app.getJson(app.urlMap.balancesummary,"get",{
    },function(res){
        console.log(res);
        if(res.data.code == 0){
            var data = res.data.data;
            that.setData({
              balanceChargeAmount: data.balanceChargeAmount,
              balancePayAmount:data.balanceChargeAmount
            })
        }     
    });

    app.getJson(app.urlMap.chargeList,"get",{
        pageSize:10,
        pageNo:1
    },function(res){
        if(res.data.code == 0){
            var data = res.data.data;
            data.list.map(function(item,key){
                item.ctime = util.formatTime(new Date(item.ctime))
                return item;
              });
            that.setData({
              list: data.list
            })
        }
    });
  }
})
