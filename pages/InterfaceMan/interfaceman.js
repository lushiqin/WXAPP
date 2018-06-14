// pages/InterfaceMan/interfaceman.js
const config = require("../../config.js").interfaces
Page({

  /**
   * 页面的初始数据
   */
  data: {
      hidden:true
  },

  //新增接口数据
  addinterface:function(e){
    var interfaceName = e.detail.value.interfaceName
    var interfaceUrl = e.detail.value.interfaceUrl
    var methodType = e.detail.value.methodType
    var data = e.detail.value.data
    if(interfaceName && interfaceUrl){
      wx.request({
        url: config.own_host + config.addInterface,
        data: {
          interfaceName: interfaceName,
          interfaceUrl: interfaceUrl,
          methodType:methodType,
          data:data
        },
        method: "POST",
        success: res => {
          console.log(res.data)
        }
      })
    }else{
      wx.showModal({
        title: '',
        content: '请输入对应接口信息',
      })
    }

  },

  //选择服务器
  checkHost:function(e){
    this.setData({
      host:e.target.dataset.hosturl
    })
  },

  dointerface:function(e){
    //自定义接口请求
    var host = this.data.host
    var data = e.detail.value
    var url = e.detail.value.interfaceurl
    //将接口从请求数据中移除
    delete data.interfaceurl
    var methodtype = this.data.methodtype
    wx.request({
      url: host+url,
      method:methodtype,
      header:{
        token:wx.getStorageSync("token")
      },
      data:data,
      dataType:"json",
      success:res=>{
          wx.request({
            url: config.own_host + config.sendmsg,
            method:"POST",
            data:{
              openid: wx.getStorageSync("openid"),
              userId: wx.getStorageSync("userId"),
              k1:url,
              k2:data,
              k3:res.data,
              k5:res.statusCode
            },
            success:res=>{
                console.log(res.data)
            },
            fail:function(e){

            }
          })

      },
      fail:function(e){
        console.log(e)
        wx.showModal({
          title: '请求错误',
          content: "--" + e.errMsg+"--",
        })
      }
    })

    //保存formid
    wx.request({
      url: config.own_host + config.addFromId,
      method: "POST",
      data: {
        formId: e.detail.formId,
        userId: wx.getStorageSync("userId")
      },
      success: res => {
      },
      fail: function (e) {
        wx.showModal({
          title: '',
          content: '--' + e + "--",
        })
      }
    })
  },
  //关闭蒙层
  closemodal:function(){
    this.setData({
      hidden:true
    })
  },

//请求接口
  reqInter:function(e){
    this.setData({
      interdata:e.detail.target.dataset.interdata,
      interfacename:e.detail.target.dataset.interfacename,
      interfaceurl:e.detail.target.dataset.interfaceurl,
      methodtype:e.detail.target.dataset.methodtype,
      hidden:false
    })
    //保存formid
    wx.request({
      url: config.own_host + config.addFromId,
      method:"POST",
      data:{
        formId:e.detail.formId,
        userId:wx.getStorageSync("userId")
      },
      success:res=>{
      },
      fail:function(e){
        wx.showModal({
          title: '',
          content: '--'+e+"--",
        })
      }
    })

  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: config.own_host+config.secAllInterface,
      success:res=>{
        that.setData({
          data:res.data
        })
      }
    })

    wx.request({
      url: config.own_host + config.secAllHost,
      method:"POST",
      success:function(res){
        that.setData({
          hostList:res.data
        })
      },
      fail:function(res){
        console.log(res)
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