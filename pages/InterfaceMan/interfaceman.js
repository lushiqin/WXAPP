// pages/InterfaceMan/interfaceman.js
const config = require("../../config.js").interfaceList
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  //新增接口数据
  addinterface:function(e){
      var interName = e.detail.value.interName
      var interUrl = e.detail.value.interUrl
      wx.request({
        url: config.myhost+config.addInter,
        data:{
          interName:interName,
          interUrl:interUrl
        },
        method:"POST",
        success:res=>{
          console.log(res.data)
        }
      })
  },



//请求接口
  reqInter:function(e){
    console.log(e)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: config.myhost+config.secInter,
      success:res=>{
        that.setData({
          data:res.data
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