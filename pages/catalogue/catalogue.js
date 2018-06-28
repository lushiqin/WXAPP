// pages/catalogue/catalogue.js
const config = require("../../config.js").interfaces
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  catalogue:function(options){
    var name = options.target.dataset.name
    var url = options.target.dataset.url
    wx.navigateTo({
      url: '../book/book?name='+name+'&url='+url,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.name,
    })
    var that = this
    wx.showLoading({
      title: '',
    })
    wx.request({
      url: options.url,
      success:res=>{
        wx.request({
          url: config.own_host + config.xsml,
          method: 'POST',
          data: {
            content:res.data
          },
          success: res => {
            that.setData({
              catalogue: res.data.ml
            })
            wx.hideLoading()
          },
          fail: function (e) {
            console.log(e)
          }
        })
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