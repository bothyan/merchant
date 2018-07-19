//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    searchfocus:false,
    orderArr:["","","",""],
    param:{
      pageSize:10,
      pageNo:1,
      createTimeOrder:"DESC",
      payAmountOrder:"DESC",
      payCountOrder:"DESC",
      payTimeOrder:"DESC"
    },
    list:[],
    summaryData:null,
    avtar:"../../images/temp/member.png",
    phone:""
  },
  onLoad: function (options) {
    if(options.phone){
      this.setData({
        phone:options.phone
      })
    }
    this.getList();
    this.getSummary();
  },
  getList:function(e){
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    var param = JSON.parse(JSON.stringify(that.data.param));
    if(that.data.phone !== ""){
      param.phone = that.data.phone;
    }
    app.getJson(app.urlMap.queryUserList,"get",param,function(res){
      if(res.data.code == 0){
        console.log(res.data.data.list);
        wx.hideLoading()
        that.setData({
          list:res.data.data.list
        })
      }
    });
  },
  getSummary:function(){
    var that = this;
    app.getJson(app.urlMap.userSummary,"get",{},function(res){  
      if(res.data.code == 0){
        that.setData({
          summaryData:res.data.data
        })
      }
    });
  },
  searchfocus: function(){
    this.setData({
        searchfocus:true
    })
  },
  changephone:function(e){
    /*this.setData({
      phone:e.detail.value
    })*/
  },
  tosearch:function(e){
    var that = this;
    var param = JSON.parse(JSON.stringify(that.data.param));
    that.setData({
      phone:e.detail.value
    })
    if(that.data.phone !== ""){
      param.phone = e.detail.value;
    }
    wx.showLoading({
      title: '加载中',
    })
    app.getJson(app.urlMap.queryUserList,"get",param,function(res){
      console.log(res);
      if(res.data.code == 0){
        wx.hideLoading()
        that.setData({
          list:res.data.data.list
        })
      }
    });
  },
  orders:function(e){
    var index = e.currentTarget.dataset.index;
    var order = this.data.orderArr;
    var param = this.data.param;
    var arr = ["createTimeOrder","payAmountOrder","payCountOrder","payTimeOrder"];
    if(order[index] == ""){
        order[index] = "hover"
        param[arr[index]] = "ASC"
    }else{
        order[index] = ""
        param[arr[index]] = "DESC"
    }
    this.setData({
        orderArr:order,
        param:param
    });   
    this.getList();
  },
  todetail:function(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'detail?id='+id
    })
  },
  tochuzhi:function(e){
    wx.navigateTo({
      url: 'store'
    })
  }
})
