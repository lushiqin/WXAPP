//index.js
//获取应用实例
const app = getApp()
const config = require("../../config.js").interfaces
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //进入系统
  accountman: function() {
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
    console.log("saveUserFormId", formId)
  },


  onLoad: function () {
    console.log("phone",wx.getStorageSync("phone"))
    wx.request({
      url: config.own_host + config.secOneUser,
      method:"POST",
      data:{
        phone: wx.getStorageSync("phone")
      },
      success:res=>{
        console.log(res.data)
      }
    })
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
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
