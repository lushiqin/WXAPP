// pages/shop/shop.js
const config = require("../../config.js").interfaces
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  navleft:function(options){
      var typeurl = options.target.dataset.url
      wx.showLoading({
        title: '',
      })
      var that = this
      wx.request({
        url: config.own_host + config.bqghomepage,
        method: "POST",
        data: {
          url: typeurl
        },
        success: res => {
          console.log(res.data)
          that.setData({
            nav: res.data.nav,
            hots: res.data.hots,
            spush: res.data.spush,
            novels: res.data.novels,
            news: res.data.news,
          })
          wx.hideLoading()
        },
        fail: function (e) {
          console.log(e)
          wx.hideLoading()
        }
      })
      
  },

  clickbook:function(options){
    var url = options.currentTarget.dataset.url
    var name = options.currentTarget.dataset.name
    wx.navigateTo({
      url: '../catalogue/catalogue?url='+url+"&name="+name,
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
      url: config.own_host+config.bqghomepage,
      method:"POST",
      data:{
        url:"/"
      },
      success:res=>{
        console.log(res.data)
        that.setData({
          nav: res.data.nav,
          hots: res.data.hots,
          spush: res.data.spush,
          novels: res.data.novels,      
          news: res.data.news,
        })
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