// pages/Login/login.js
const config = require("../../config.js").interfaces
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  //获取验证码进行登陆
  toLogin:function(e){
    //获取验证码
    wx.setStorageSync("phone", e.detail.value.phone)
    var phone = wx.getStorageSync("phone")
    wx.request({
      url: config.sltk_host + config.getcodeinterface,
      method:"GET",
      data:{
        phone:phone
      },
      success:function(res){
        //判断是否有图形验证码
        if(res.data.data.numCode){
          //使用图形验证码重新获取验证码
          wx.request({
            url: config.sltk_host+config.getcodeinterface,
            method: "GET",
            data: {
              phone:phone,
              numCode:res.data.data.numCode
            },
            success:function(res){
              //登陆系统
              wx.request({
                url: config.sltk_host+config.logininterface,
                method:"POST",
                data:{
                  phone:phone,
                  phoneCode: res.data.data.phoneCodeTest,
                  deviceNum:"ios",
                  deviceName:"iphone x",
                  loginAddress:"sz"
                },
                success:function(e){
                  //判断是否登陆成功取到token
                  if (e.data.data.token){
                    wx.showToast({
                      title: '获取成功',
                      success:function(){
                        wx.showLoading({
                          title: '',
                        })
                        //将token存到缓存中
                        wx.setStorageSync("token", e.data.data.token)
                        //保存用户信息
                        wx.request({
                          url: config.own_hose + config.addUser,
                          method: "POST",
                          data: {
                            name: "Test"+phone,
                            phone: phone,
                          },
                          success: res => {
                            wx.showModal({
                              title: '',
                              content: res.data,
                              showCancel:false,
                              success:function(res){
                                if(res.confirm){
                                  //跳转到账号管理页面
                                  setTimeout(function () {
                                    wx.hideLoading()
                                    wx.switchTab({
                                      url: '../AccountMan/accountman',
                                    })
                                  }, 2000)
                                }
                              }
                            })
                          }
                        })

                      }
                    })
                  }else{
                    wx.showToast({
                      title: '登陆失败',
                    })
                  }
                }
              })
            }
          })
        }else{
          //没有图形验证码
            wx.request({
                url: config.sltk_host+config.logininterface,
                method:"POST",
                data:{
                  phone:phone,
                  phoneCode: res.data.data.phoneCodeTest,
                },
                success:function(e){
                  //判断是否登陆成功获取到token
                  if (e.data.data.token) {
                    wx.showLoading({
                      title: '',
                    })
                    //保存token信息
                    wx.setStorageSync("token", e.data.data.token)
                    //保存用户信息
                    wx.request({
                      url: config.own_host+config.addUser,
                      method:"POST",
                      data:{
                        name:"Test"+phone,
                        phone:phone
                      },
                      success:res=>{
                        wx.showModal({
                          title: '',
                          content: res.data,
                          showCancel:false,
                          success:function(res){
                            if(res.confirm){
                              setTimeout(function () {
                                wx.hideLoading()
                                wx.switchTab({
                                  url: '../AccountMan/accountman',
                                })
                              }, 2000)
                            }
                          }
                        })
                      }
                    })
                  } else {
                    wx.showToast({
                      title: '登陆失败',
                    })
                  }
                }
              })
        }
      }
    })
  },


  //直接获取token信息
  getToken:function(e){
    wx.setStorageSync("phone", e.detail.value.phone)
    var phone = wx.getStorageSync("phone")
    wx.request({
      url: config.sl_host+config.maketoken,
      method:"GET",
      data:{
        phone:phone
      },
      success:function(res){
        if(res.data.token){
          wx.showLoading({
            title: '',
          })
          //保存token
          wx.setStorageSync("token", res.data.token)
          //保存用户信息
          wx.request({
            url: config.own_host + config.addUser,
            method: "POST",
            data: {
              name: phone,
              phone: phone
            },
            success: res => {
              wx.showModal({
                title: '',
                content: res.data,
                showCancel:false,
                success:function(res){
                  if(res.confirm){
                    setTimeout(function () {
                      wx.hideLoading()
                      wx.switchTab({
                        url: '../AccountMan/accountman',
                      })
                    }, 2000)
                  }
                }
              })
            }
          })
        }else{
          wx.showToast({
            title: '获取失败',
          })
        }
      }
    })
  },

  //切换账号
  switchPhone:function(e){
    var phone = e.currentTarget.dataset.phone
    wx.request({
      url: config.own_host+config.secOneInfo,
      method:'POST',
      data:{
        phone:phone
      },
      success:res=>{
        console.log(res.data)
        if(res.data.data.token){
          wx.showModal({
            title: '切换账号',
            content: '是否切换用户',
            success: function (res) {
              if (res.confirm) {
                //更新token信息
                wx.removeStorageSync("token")
                wx.removeStorageSync("phone")
                wx.setStorageSync("token", res.data.data.token)
                wx.setStorageSync("phone", phone)
                //跳转用户管理页面
                setTimeout(function () {
                  wx.hideLoading()
                  wx.switchTab({
                    url: '../AccountMan/accountman',
                  })
                }, 2000)
              }
            }
          })
        }
      }
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //进入时
    wx.removeStorageSync("token")
    wx.removeStorageSync("phone")
    wx.request({
      url: config.own_host+config.secAllUser,
      method:"GET",
      success:function(res){
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