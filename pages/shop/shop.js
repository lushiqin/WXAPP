// pages/shop/shop.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      "navleft":[
        { "name": "玄幻魔法", "url": "1" },
        { "name": "武侠修真", "url": "2" },
        { "name": "都市言情", "url": "3" },
        { "name": "历史军事", "url": "4" },
        { "name": "网游动漫", "url": "5" },
        { "name": "科幻小说", "url": "6" },
        { "name": "美文同人", "url": "7" },
        { "name": "恐怖灵异", "url": "8" },
        { "name": "其他类型", "url": "9" }
      ],
      "bookList":[
        {"name":"全民修真大时代这就是爱","url":"111"},
        { "name": "book1", "url": "111" },
        { "name": "book1", "url": "111" },
        { "name": "book1", "url": "111" },
        { "name": "book1", "url": "111" },
        { "name": "book1", "url": "111" },
        { "name": "book1", "url": "111" },
        { "name": "book1", "url": "111" },
        { "name": "book1", "url": "111" },
        { "name": "book1", "url": "111" },
        { "name": "book1", "url": "111" },
        { "name": "book1", "url": "111" },
        { "name": "book1", "url": "111" },
        { "name": "book1", "url": "111" },
        { "name": "book1", "url": "111" },
        { "name": "book1", "url": "111" },
        { "name": "book1", "url": "111" },
        { "name": "book1", "url": "111" },
        { "name": "book1", "url": "111" },
        { "name": "book1", "url": "111" },
        { "name": "book1", "url": "111" },
        { "name": "book1", "url": "111" },
        { "name": "book1", "url": "111" },
        { "name": "book1", "url": "111" },
        { "name": "book1", "url": "111" },
        { "name": "book1", "url": "111" },
        { "name": "book1", "url": "111" },
        { "name": "book1", "url": "111" },
        {"name":"book2","url":"222"}

      ]
  },




  navleft:function(options){
    console.log(options)
  },
  clickbook:function(options){
    console.log(options)
    wx.navigateTo({
      url: '../book/book',
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