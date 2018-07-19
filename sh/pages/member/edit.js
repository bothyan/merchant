//index.js
//获取应用实例
const app = getApp()
var util = require('../../utils/util.js');

Page({
  data: {
    sexArray: ['男', '女'],
    sexIndex: 0,
    userId:"",
    useInfos:null,
    date:""
  },
  onLoad: function (options) {
    console.log(options.id);
    this.setData({
      userId:options.id || 12
    });
    this.getDetails();
  },
  getDetails:function(){
    var that = this;
    app.getJson(app.urlMap.getUserInfo,"get",{userId:that.data.userId},function(res){
      console.log(res);
      if(res.data.code == 0){
        var data = res.data.data;
        data.birthday = util.formatDate(data.birthday)
        that.setData({
          useInfos:data,
          sexIndex:data.sex - 1
        })
      }
    });
  },
  changeName:function(e){
    var useInfos = this.data.useInfos;
    useInfos.name = e.detail.value;
    this.setData({useInfos:useInfos});
  },
  changePhone:function(e){
    var useInfos = this.data.useInfos;
    useInfos.phone = e.detail.value;
    this.setData({useInfos:useInfos});
  },
  bindSexChange:function(e){
    this.setData({
      sexIndex: e.detail.value
    })
  },
  bindDateChange: function(e) {
    var useInfos = this.data.useInfos;
    useInfos.birthday = e.detail.value;
    this.setData({useInfos:useInfos});
  },
  sava:function(){
    var param = {};
    var that = this;
    var useInfos = this.data.useInfos;
    param.userId = this.data.userId;
    param.realName = useInfos.name;
    param.sex = parseInt(this.data.sexIndex) + 1;
    param.phone = useInfos.phone;
    param.birthday = useInfos.birthday;

    console.log(param);

    if(param.realName == "" || param.realName == "null"){
      wx.showToast({
        title: '姓名不能为空',
        icon: 'none',
        duration: 1500
      })
      return
    }

    if(param.sex < 1){
      wx.showToast({
        title: '性别不能为空',
        icon: 'none',
        duration: 1500
      })
      return
    }

    if(param.phone == "" || param.phone == "null"){
      wx.showToast({
        title: '电话不能为空',
        icon: 'none',
        duration: 1500
      })
      return
    }

    if(!(/^1[34578]\d{9}$/.test(param.phone))){ 
      wx.showToast({
        title: '手机号格式不对',
        icon: 'none',
        duration: 1500
      })
      return
    } 


    if(param.birthday == ""){
      wx.showToast({
        title: '生日不能为空',
        icon: 'none',
        duration: 1500
      })
      return
    }

    app.getJson(app.urlMap.updateUserInfo,"post",param,function(res){
      console.log(res);
      if(res.data.code == 0){
        var data = res.data.data;
        wx.showToast({
          title: '修改成功',
          icon: 'success',
          duration: 1500
        })
        wx.navigateTo({
          url: 'detail?id='+that.data.userId
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
})
