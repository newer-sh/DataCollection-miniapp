// pages/login/login.js
let util = require("../../utils/util.js")
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    number: null,
    password: null
  },

  getNumber(event) {
    this.setData({
      number: event.detail.value
    })
  },

  getPassword(event){
    this.setData({
      password: event.detail.value
    })
  },

  login(){
    let number = this.data.number;
    let password = this.data.password;
    db.collection('users').where({
      number: number
    }).get({
      success(res){
        console.log("获取数据成功", res)
        if(res.data.length){
          let user = res.data[0];
          console.log("user", user);
          if(util.sha1(password) == user.password){
            console.log("登陆成功");
            wx.showToast({
              title: '登陆成功'
            });
            wx.setStorageSync('user', user)
            setTimeout(function(){
              wx.navigateTo({
                url: '../index/index'
              })
            },1500)
          }
        }else{
          console.log("登陆失败")
          wx.showModal({
            title: "错误",
            content: "手机号或密码错误"
          })
        }
      },fail(res){
        console.log("获取数据失败",res)
      }
    })
  }
})