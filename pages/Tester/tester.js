// pages/Tester/tester.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    test:[
      {"name":"shop"},
      {"name":'shop'}
    ]
  },



  swiperChange:function(options){
    this.setData({
      test: [
        { "name": "shop" },
        { "name": 'shop' }
      ]
    })
  },

  jumpPage:function(options){
    var jumppage = options.target.dataset.name
    wx.navigateTo({
      url: '../'+jumppage+"/"+jumppage,
    })
  },
  book:function(options){
    wx.navigateTo({
      url: '../shop/shop',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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