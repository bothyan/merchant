//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    searchfocus:false,
    orderArr:["desc","","",""],
    param:{
      pageSize:10,
      pageNo:1,
      createTimeOrder:"DESC",
      payAmountOrder:"",
      payCountOrder:"",
      payTimeOrder:""
    },
    list:[],
    summaryData:null,
    avtar:"../../images/temp/member.png",
    phone:"",
    total:0,
    tag:1
  },
  onShow:function(e){
    /*this.getList();
    this.getSummary();*/
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
        console.log(list)
        that.setData({
          list:list,
          total:res.data.data.total,
          tag:0
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
   /* this.setData({
        searchfocus:true
    })*/
  },
  changephone:function(e){
    this.setData({
      phone:e.detail.value
    })
  },
  tosearch:function(){
    var that = this;
    var param = that.data.param;
    param.pageNo = 1;
    that.setData({
      phone:that.data.phone,
      param:param
    })
    var param = JSON.parse(JSON.stringify(that.data.param));
    if(that.data.phone !== ""){
      param.phone = that.data.phone;
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
    var tag = this.data.tag;
    if(tag == 1){
      return
    }
    var index = e.currentTarget.dataset.index;
    var order = this.data.orderArr;
    var orderreset = ["","","",""];
    var param = {
      pageSize:10,
      pageNo:1,
      createTimeOrder:"",
      payAmountOrder:"",
      payCountOrder:"",
      payTimeOrder:""
    };
    var arr = ["createTimeOrder","payAmountOrder","payCountOrder","payTimeOrder"];
    if(order[index] == ""){
        orderreset[index] = "desc"
        param[arr[index]] = "DESC"
    }
    if(order[index] == "desc"){
        orderreset[index] = "asc"
        param[arr[index]] = "ASC"
    }
    if(order[index] == "asc"){
        orderreset[index] = "desc"
        param[arr[index]] = "DESC"
    }
    this.setData({
        orderArr:orderreset,
        param:param,
        list:[],
        tag:1
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
    var type = wx.getStorageSync('sh_accountType');
    if(type !== 2){
      wx.showToast({
        title: '没有权限储值',
        icon: 'none',
        duration: 1500
      })
    }else{
      wx.navigateTo({
        url: 'store'
      })  
    }
    
  }
})
