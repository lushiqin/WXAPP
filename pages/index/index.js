//index.js
//获取应用实例
const app = getApp()
const config = require("../../config.js").interfaces
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    formId:""
  },
  //进入系统
  accountman: function() {
    console.log(this.data.formId)
    wx.switchTab({
      url: '../AccountMan/accountman',
    })
  },

  //跳转Tester页面
  tester:function(){
    wx.navigateTo({
      url: '../Tester/tester',
    })
  },
  //静默获取fromID
  saveUserFormId:function(res){
    var formId = res.detail.formId
    this.setData({
      formId:formId
    })
  },


  onLoad: function (options) {
    var token = ""   

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    //缓存token信息
    if (options.token) {
      token = options.token
    } else {
      token = wx.getStorageSync("token")
    }
    if (token) {
      wx.setStorageSync("token", token)
    }else{
      console.log("no token")
    }
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
