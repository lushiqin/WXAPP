//index.js
//获取应用实例
const app = getApp()
const config = require("../../config.js").interfaces
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hidden:false
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
      },
      fail: function (e) {
        wx.showToast({
          title: "网络异常",
        })
      }
    })
  },


  onLoad: function (options) {
    var that = this 
    //判断是否有session_key和openid
    if (wx.getStorageSync("session_key") && wx.getStorageSync("openid")){
 
    }else{
      wx.showModal({
        title: '',
        content: '重新获取openid',
        showCancel:true,
        success:function(res){
          if(res.confirm){
            // 登录
            wx.login({
              success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                wx.request({
                  url: config.own_host + config.getOpenId,
                  data: {
                    code: res.code
                  },
                  method: "POST",
                  success: res => {
                    wx.setStorageSync("session_key", res.data['session_key'])
                    wx.setStorageSync("openid", res.data['openid'])
                    if (wx.getStorageSync("openid") && wx.getStorageSync("session_key")){
                      that.setData({
                        hidden:false
                      })
                    }
                  }
                })
              }
            })

          }
        }
      })
      this.setData({
        hidden:true
      })
    }
    wx.showLoading({
      title: '获取token中',
    })
    //判断token信息
    if (options.token) {
      wx.setStorageSync("token", options.token)
      wx.showToast({
        title: '获取到上个页面返回的token',
      })
    } else if (wx.getStorageSync("token")) {
      wx.showToast({
        title: '获取到缓存中的token',
      })
    } else {
      wx.showToast({
        title: 'token不存在',
      })
    }
    wx.hideLoading()
  }
  
})
