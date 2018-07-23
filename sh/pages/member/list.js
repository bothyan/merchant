//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    searchfocus:false,
    orderArr:["","","",""],
    param:{
      pageSize:5,
      pageNo:1,
      createTimeOrder:"DESC",
      payAmountOrder:"DESC",
      payCountOrder:"DESC",
      payTimeOrder:"DESC"
    },
    list:[],
    summaryData:null,
    avtar:"../../images/temp/member.png",
    phone:"",
    total:0
  },
  onShow:function(e){
    
  },
  onLoad: function (options) {
    var params = options || {};
    if(params.phone){
      this.setData({
        phone:options.phone
      })
    }
    this.getList();
    this.getSummary();
  },
  onReachBottom:function(){
    var that = this;
    if(that.data.total>that.data.list.length){
      var param = that.data.param;
      param.pageNo = param.pageNo+1
      that.setData({
        param:param
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
  getList:function(e){
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    var param = JSON.parse(JSON.stringify(that.data.param));
    if(that.data.phone !== ""){
      param.phone = that.data.phone;
    }
    app.getJson(app.urlMap.queryUserList,"get",param,function(res){
      if(res.data.code == 0){
        var list = that.data.list.concat(res.data.data.list);
        that.setData({
          list:list,
          total:res.data.data.total
        })
      }
      wx.hideLoading()
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
    var param = that.data.param;
    param.pageNo = 1;
    that.setData({
      phone:e.detail.value,
      param:param
    })
    var param = JSON.parse(JSON.stringify(that.data.param));
    if(that.data.phone !== ""){
      param.phone = e.detail.value;
    }
    wx.showLoading({
      title: '加载中',
    })
    app.getJson(app.urlMap.queryUserList,"get",param,function(res){
      wx.hideLoading()
      if(res.data.code == 0){
        that.setData({
          list:res.data.data.list,
          total:res.data.data.total
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
    param.pageNo = 1;
    this.setData({
        orderArr:order,
        param:param,
        list:[]
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
