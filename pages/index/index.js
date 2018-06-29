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
    //保存formid
    wx.request({
      url: config.own_host + config.addFromId,
      method: "POST",
      data: {
        formId: formId,
        openId: wx.getStorageSync("openid")
      },
      success: res => {
        wx.showToast({
          title: '保存formID',
        })
      },
      fail: function (e) {
        wx.showToast({
          title: "保存formID失败",
        })
      }
    })
  },


  onLoad: function (options) {
    var token = ""   
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
  }
  
})
