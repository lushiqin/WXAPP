// pages/Login/login.js
const config = require("../../config.js").interfaceList
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
    wx.request({
      url: config.host + config.getcodeinterface,
      method:"GET",
      data:{
        phone:phone
      },
      success:function(res){
        //判断是否有图形验证码
        if(res.data.data.numCode){
          //使用图形验证码重新获取验证码
          wx.request({
            url: config.host+config.getcodeinterface,
            method: "GET",
            data: {
              phone:phone,
              numCode:res.data.data.numCode
            },
            success:function(res){
              //登陆系统
              wx.request({
                url: config.host+config.logininterface,
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
                        wx.setStorageSync("token", e.data.data.token)
                        wx.switchTab({
                          url: '../AccountMan/accountman',
                        })
                        wx.request({
                          url: config.myhost + config.addUser,
                          method: "POST",
                          data: {
                            name: phone,
                            phone: phone,
                            token: e.data.data.token,
                            status: "1"
                          },
                          success: res => {
                            console.log(res.data)
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
                url: config.host+config.logininterface,
                method:"POST",
                data:{
                  phone:phone,
                  phoneCode: res.data.data.phoneCodeTest,
                },
                success:function(e){
                  //判断是否登陆成功获取到token
                  if (e.data.data.token) {
                    wx.showToast({
                      title: '获取成功',
                      success:function(){
                        wx.setStorageSync("token", e.data.data.token)
                        setTimeout(function () {
                          wx.switchTab({
                            url: '../AccountMan/accountman',
                          })
                        }, 2000)
                      }
                    })
                    
                    wx.request({
                      url: config.myhost+config.addUser,
                      method:"POST",
                      data:{
                        name:phone,
                        phone:phone,
                        token:e.data.data.token,
                        status:"1"
                      },
                      success:res=>{
                        console.log(res.data)
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
    var phone = e.detail.value.phone
    wx.request({
      url: config.slhost+config.maketoken,
      method:"GET",
      data:{
        phone:phone
      },
      success:function(res){
        if(res.data.token){
          wx.showToast({
            title: '获取成功',
          })
          wx.setStorageSync("token", res.data.token)
          wx.request({
            url: config.myhost + config.addUser,
            method: "POST",
            data: {
              name: phone,
              phone: phone,
              token: res.data.token,
              status: "1"
            },
            success: res => {
              console.log(res.data)
            }
          })
          setTimeout(function(){
            wx.switchTab({
              url: '../AccountMan/accountman',
            })
          },2000)

        }else{
          wx.showToast({
            title: '获取失败',
          })
        }
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.removeStorageSync("token")
    wx.request({
      url: config.myhost+config.getUsers,
      method:"GET",
      success:function(res){
        console.log(res.data)
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