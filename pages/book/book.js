// pages/book/book.js
const config = require("../../config.js").interfaces
const WxParse = require("../wxParse/wxParse.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  lastc:function(options){
    wx.pageScrollTo({
      scrollTop: 0,
    })
    var url = options.target.dataset.lastc
    wx.showLoading({
      title: '',
    })
    var that = this
    wx.request({
      url: config.own_host + config.bqgdetails,
      method: 'POST',
      data: {
        url: url
      },
      success: res => {
        var chapname = res.data.chapname
        var lastchapter = res.data.lastchapter
        var nextchapter = res.data.nextchapter
        var article = res.data.contentbody
        wx.setNavigationBarTitle({
          title: chapname,
        })
        that.setData({
          lastchapter: lastchapter,
          nextchapter: nextchapter
        })
        WxParse.wxParse('article', 'html', article, that, 5);
        wx.hideLoading()
      },
      fail: function (e) {
        console.log(e)
        wx.hideLoading()
      }
    })
  },
  nextc:function(options){
    wx.pageScrollTo({
      scrollTop: 0,
    })
    var url = options.target.dataset.nextc
    wx.showLoading({
      title: '',
    })
    var that = this
    wx.request({
      url: config.own_host + config.bqgdetails,
      method: 'POST',
      data: {
        url: url
      },
      success: res => {
        var chapname = res.data.chapname
        var lastchapter = res.data.lastchapter
        var nextchapter = res.data.nextchapter
        var article = res.data.contentbody
        wx.setNavigationBarTitle({
          title: chapname,
        })
        that.setData({
          lastchapter: lastchapter,
          nextchapter: nextchapter
        })
        WxParse.wxParse('article', 'html', article, that, 5);
        wx.hideLoading()
      },
      fail: function (e) {
        console.log(e)
        wx.hideLoading()
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      wx.showLoading({
        title: '',
      })
      var that = this
      wx.request({
        url: config.own_host + config.bqgdetails,
        method:'POST',
        data:{
          url:options.url
        },
        success:res =>{
          var chapname = res.data.chapname
          var lastchapter = res.data.lastchapter
          var nextchapter = res.data.nextchapter
          var article = res.data.contentbody
          wx.setNavigationBarTitle({
            title: chapname,
          })
          that.setData({
            lastchapter: lastchapter,
            nextchapter: nextchapter
          })
          WxParse.wxParse('article', 'html', article, that, 5);
          wx.hideLoading()
        },
        fail:function(e){
          console.log(e)
          wx.hideLoading()
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