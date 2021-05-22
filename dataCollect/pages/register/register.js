// pages/register/register.js
const { sha1 } = require("../../utils/util.js");
let util = require("../../utils/util.js")
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    number: null,
    password1: null,
    password2: null,
    name: null,
    job: null,
    income: null,
    isnumber: false,
    ispassword: false,
    incomes:[
      {
        id: 1,
        value: "2000以下"
      },{
        id: 2,
        value: "2000-4000"
      },{
        id: 3,
        value: "4000-6000"
      },{
        id: 4,
        value: "6000-8000"
      },{
        id: 5,
        value: "8000-10000"
      },{
        id: 6,
        value: "10000以上"
      }
    ]
  },

  getAccount(event) {
    console.log('获取输入的手机号');
    this.setData({
      number: event.detail.value
    })
  },

  getPassword1(event) {
    console.log('第一个密码');
    this.setData({
      password1: event.detail.value
    })
  },

  getPassword2(event) {
    console.log('第二个密码');
    this.setData({
      password2: event.detail.value
    })
  },

  getName(event) {
    console.log('姓名');
    this.setData({
      name: event.detail.value
    })
  },

  getJob(event) {
    console.log('职业');
    this.setData({
      job: event.detail.value
    })
  },

  onIncomeChangeEvent(event) {
    console.log(event);
    this.setData({
      income: event.detail.value
    })
  },

  onSubmitUserEvent(event) {
    const that = this;
    if(that.data.number.length != 11){
      wx.showModal({
        title: "错误",
        content: "手机号格式有误"
      })
    }else{
      that.setData({
        isnumber: true
      })
    }
    if(that.data.password1 != that.data.password2 || that.data.password1 == "" || that.data.password2 == ""){
      wx.showModal({
        title: "错误",
        content: "两次密码不一致"
      })
    }else{
      that.setData({
        ispassword: true
      })
    }
    const number = that.data.number;
    const password = that.data.password1;
    const name = that.data.name;
    const job = that.data.job;
    const income = that.data.income;
    db.collection('users').add({
      data:{
        number: number,
        password: sha1(password),
        name: name,
        job: job,
        income: income
      },success(res){
        console.log('注册成功', res);
        wx.showToast({
          title: "注册成功"
        });
        setTimeout(function(){
          wx.navigateTo({
            url: '../login/login'
          })
        },1000)
      },
      fail(res){
        console.log('注册失败', res)
      }
    })
  }


})