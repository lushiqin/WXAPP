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
    var phone = e.detail.value.phone
    if(phone){
      wx.request({
        url: config.sltk_host + config.getcodeinterface,
        method: "GET",
        data: {
          phone: phone
        },
        success: function (res) {
          //判断是否有图形验证码
          if (res.data.data.numCode) {
            //使用图形验证码重新获取验证码
            wx.request({
              url: config.sltk_host + config.getcodeinterface,
              method: "GET",
              data: {
                phone: phone,
                numCode: res.data.data.numCode
              },
              success: function (res) {
                //登陆系统
                wx.request({
                  url: config.sltk_host + config.logininterface,
                  method: "POST",
                  data: {
                    phone: phone,
                    phoneCode: res.data.data.phoneCodeTest,
                    deviceNum: "ios",
                    deviceName: "iphone x",
                    loginAddress: "sz"
                  },
                  success: function (e) {
                    //判断是否登陆成功取到token
                    if (e.data.data.token.accessToken) {
                      wx.showToast({
                        title: '获取成功',
                        success: function () {
                          wx.showLoading({
                            title: '保存用户信息',
                          })
                          //保存用户信息
                          wx.request({
                            url: config.own_host + config.addUser,
                            method: "POST",
                            data: {
                              name: "Test" + phone,
                              phone: phone,
                              token: e.data.data.token.accessToken
                            },
                            success: res => {
                              wx.hideLoading()
                              wx.showModal({
                                title: '',
                                content: "进入系统",
                                showCancel: false,
                                success: function (res) {
                                  if (res.confirm) {
                                    //跳转到账号管理页面
                                    setTimeout(function () {
                                      wx.hideLoading()
                                      wx.redirectTo({
                                        url: '../index/index?' + "token=" + e.data.data.token.accessToken,
                                      })
                                    }, 200)
                                  }
                                }
                              })
                            },
                            fail: function (e) {
                              wx.showModal({
                                title: '',
                                content: "1+++" + e + "+++",
                              })
                            }
                          })

                        }
                      })
                    } else {
                      wx.showToast({
                        title: '登陆失败',
                      })
                    }
                  },
                  fail: function (e) {
                    wx.showModal({
                      title: '',
                      content: "2+++" + e + "+++",
                    })
                  }
                })
              },
              fail: function (e) {
                wx.showModal({
                  title: '',
                  content: "3+++" + e + "+++",
                })
              }
            })
          } else {
            //没有图形验证码
            var phoneCode = res.data.data.phoneCodeTest
            wx.request({
              url: config.sltk_host + config.logininterface,
              method: "POST",
              data: {
                phone: phone,
                phoneCode: phoneCode,
                deviceNum: "ios",
                deviceName: "iphone x",
                loginAddress: "sz"
              },
              success: function (e) {
                //判断是否登陆成功获取到token
                if (e.data.data.token.accessToken) {
                  wx.showLoading({
                    title: '',
                  })
                  //保存用户信息
                  wx.request({
                    url: config.own_host + config.addUser,
                    method: "POST",
                    data: {
                      name: "Test" + phone,
                      phone: phone,
                      token: e.data.data.token.accessToken
                    },
                    success: res => {
                      wx.hideLoading()
                      wx.showModal({
                        title: '',
                        content: "进入系统",
                        showCancel: false,
                        success: function (res) {
                          if (res.confirm) {
                            setTimeout(function () {
                              wx.hideLoading()
                              wx.redirectTo({
                                url: '../index/index?' + "token=" + e.data.data.token.accessToken,
                              })
                            }, 200)
                          }
                        }
                      })
                    },
                    fail: function (e) {
                      wx.showModal({
                        title: '',
                        content: "4+++" + e + "+++",
                      })
                    }
                  })
                } else {
                  wx.showToast({
                    title: '登陆失败',
                  })
                }
              },
              fail: function (e) {
                wx.showModal({
                  title: '',
                  content: "5+++" + e + "+++",
                })
              }
            })
          }
        }
      })
    }else{
      wx.showModal({
        title: '',
        content: '请输入正确的手机号码',
      })
    }
  },


  //直接获取token信息
  getToken:function(e){
    var phone = e.detail.value.phone
    if(phone){
      wx.request({
        url: config.sl_host + config.maketoken,
        method: "GET",
        data: {
          phone: phone
        },
        success: function (res) {
          var token = res.data.token
          if (res.data.token) {
            wx.showLoading({
              title: '',
            })
            //保存用户信息
            wx.request({
              url: config.own_host + config.addUser,
              method: "POST",
              data: {
                name: "Test" + phone,
                phone: phone,
                token: token
              },
              success: res => {
                wx.hideLoading()
                wx.showModal({
                  title: '',
                  content: "进入系统",
                  showCancel: false,
                  success: function (res) {
                    if (res.confirm) {
                      setTimeout(function () {
                        wx.redirectTo({
                          url: '../index/index?' + "token=" + token,
                        })
                      }, 200)
                    }
                  }
                })
              },
              fail: function (e) {
                wx.showModal({
                  title: '',
                  content: "6+++" + e + "+++",
                })
              }
            })
          } else {
            wx.showToast({
              title: '获取失败',
            })
          }
        },
        fail: function (e) {
          wx.showModal({
            title: '',
            content: "7+++" + e + "+++",
          })
        }
      })
    }else{
      wx.showModal({
        title: '',
        content: '请输入正确的手机号码',
      })
    }
  },

  //切换账号
  switchPhone:function(e){
    var token = e.detail.target.dataset.token
    wx.showModal({
      title: '切换账号',
      content: '是否切换用户',
      success: function (res) {
        if (res.confirm) {
          //跳转用户管理页面
          setTimeout(function () {
            wx.redirectTo({
              url: '../index/index?' + "token=" + token,
            })
          }, 200)
        }
      }
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: config.own_host+config.secAllUser,
      method:"GET",
      dataType:"json",
      success:function(res){
        that.setData({
          data:res.data.data.users
        })
      },
      fail:function(e){
        wx.showModal({
          title: '',
          content: "9+++"+e+"+++",
        })
      }
    })
    wx.removeStorageSync("token")
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