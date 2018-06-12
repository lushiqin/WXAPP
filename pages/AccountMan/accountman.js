// pages/AccountMan/accountman.js
const config = require("../../config.js").interfaces

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  //返回首页
  index:function(){
    wx.redirectTo({
      url: '../index/index',
    })
  },
  //切换账号
  switchUser:function(){
    wx.redirectTo({
      url: '../Login/login',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //判断是否有token
    if(wx.getStorageSync("token")){
      wx.showModal({
        title: '使用此token登陆',
        content: wx.getStorageSync("token"),
        showCancel:false,
        success:function(res){
          if(res.confirm){
            //获取用户详细信息
            wx.request({
              url: config.sltk_host + config.userInfo,
              header: {
                token: wx.getStorageSync("token")
              },
              success: res => {
                if (res.statusCode == "200") {
                  that.setData({
                    data: res.data.data
                  })
                } else {
                  wx.showModal({
                    title: '',
                    content: res.data.message
                  })
                }

              },
              fail: function (e) {
                wx.showModal({
                  title: '',
                  content: e.errMsg,
                })
              }
            })
          }
        }
      })
    }else{
      wx.redirectTo({
        url: '../Login/login',
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})