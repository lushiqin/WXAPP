//app.js
const config = require("/config.js").interfaces
App({
  onLaunch: function () {

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: config.own_host + config.getOpenId,
          data:{
            code:res.code
          },
          method:"POST",
          success:res =>{
            wx.setStorageSync("session_key", res.data['session_key'])
            wx.setStorageSync("openid", res.data['openid'])
          }
        })
      }
    })

  },
  globalData: {
    userInfo: null
  }
})