// pages/book/book.js
const config = require("../../config.js").interfaces
const WxParse = require("../wxParse/wxParse.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.name,
    })
      wx.showLoading({
        title: '',
      })
      var that = this
      wx.request({
        url: config.own_host+config.xszj,
        method:'POST',
        data:{
          url:options.url
        },
        success:res =>{
          var article = res.data
          WxParse.wxParse('article', 'html', article, that, 5);
          wx.hideLoading()
        },
        fail:function(e){
          console.log(e)
        }
      })
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