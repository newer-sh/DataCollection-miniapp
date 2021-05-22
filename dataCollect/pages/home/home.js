// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginOK: false,
    name:null
  },
/*
  onload: function(options) {
    let user = wx.getStorageSync('user')
    if (user && user.name) {
      this.setData({
      loginOK: true,
      name: user.name
     })
    } else {
    this.setData({
      loginOK: false
    })
   }
   console.log("loginOK", this.data.loginOK)
  }, */

  onShow() {
    let user = wx.getStorageSync('user')
    if (user && user.name) {
     this.setData({
      loginOK: true,
      name: user.name
     })
    } else {
     this.setData({
      loginOK: false
     })
    }
    },

  //去登陆页
  onTapLogin() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  //去注册页
  onTapRegister() {
    wx.navigateTo({
      url: '/pages/register/register',
    })
  },

  //去主界面
  toIndex(){
    wx.navigateTo({
      url: '/pages/index/index'
    })
  },

  //退出登陆
  tuichu() {
    wx.setStorageSync('user', null)
    let user = wx.getStorageSync('user')
    if (user && user.name) {
      this.setData({
        loginOK: true,
        name: user.name
      })
    } else {
      this.setData({
        loginOK: false
      })
    }
  }
})
