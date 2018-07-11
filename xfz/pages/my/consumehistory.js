//index.js
//获取应用实例
const app = getApp()
var util = require('../../utils/util.js');
Page({
  data: {
    payCount:0,
    payAmount:0,
    list:[]
  },
  onLoad: function () {
    this.getData();
  },
  getData:function(){
    var that = this;
    app.getJson(app.urlMap.paySummary,"get",{
    },function(res){
        if(res.data.code == 0){
            var data = res.data.data;
            console.log(data);
            that.setData({
              payCount: data.payCount,
              payAmount: data.payAmount
            })
        }     
    });

    app.getJson(app.urlMap.orderList,"get",{
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
