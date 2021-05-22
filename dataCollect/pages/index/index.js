
var util = require("../../utils/util.js")
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: null,
    addr: null,
    situations:[
      {
        "id": 1,
        "name": "图书馆"
      },{
        "id": 2,
        "name": "宿舍"
      },{
        "id": 3,
        "name": "办公室"
      },{
        "id": 4,
        "name": "路上"
      },{
        "id": 5,
        "name": "餐厅"
      },{
        "id": 6,
        "name": "超市"
      },{
        "id": 7,
        "name": "健身房"
      },{
        "id": 8,
        "name": "网吧"
      },{
        "id": 9,
        "name": "公园"
      },{
        "id": 10,
        "name": "机场"
      },{
        "id": 11,
        "name": "车站"
      },{
        "id": 12,
        "name": "电影院"
      }
    ],
    requests: [
      {
        "id": 1,
        "name": "吃饭"
      },{
        "id": 2,
        "name": "睡觉"
      },{
        "id": 3,
        "name": "学习"
      },{
        "id": 4,
        "name": "运动"
      },{
        "id": 5,
        "name": "购物"
      },{
        "id": 6,
        "name": "玩游戏"
      },{
        "id": 7,
        "name": "休息"
      },{
        "id": 8,
        "name": "听歌"
      },{
        "id": 9,
        "name": "看电影"
      },{
        "id": 10,
        "name": "办公"
      }
    ]
    //situation:"",
    //request:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    checkPermission(this);

   /**
    * 设置时间
    */
   let TIME = util.formatTime(new Date());
   this.setData({
     time: TIME
   });

  
  },

  /**
   * 提交数据到服务器 
   */
  onSubmitEvent: function(event){
    console.log(event);
    let user = wx.getStorageSync('user');
    const time = this.data.time;
    const addr = this.data.addr;
    const situation = event.detail.value.situation;
    const request = event.detail.value.request;

    db.collection('bishe').add({
      data:{
        time: time,
        addr: addr,
        situation: situation,
        request: request,
        name: user.name,
        job: user.job,
        income: user.income,
        number: user.number
      },success(res){
        wx.showToast({
          title: '提交成功',
        });
        setTimeout(function(){
          wx.navigateTo({
            url: '../exit/exit',
          })
        },1500)
      },fail(res){
        console.log("提交失败", res);
        wx.showModal({
          title: "错误",
          content: "上传失败，请检查网络"
        })
      }
    });
  },

  onSituChangeEvent: function(event){
    console.log(event);
  },

  onRequChangeEvent: function(event){
    console.log(event);
  }

})

function checkPermission(that) {
  console.log("-------------checkPermission----------");
  console.log(that)
  wx.getSetting({
    success:function(res){
      console.log(res)
      if (!res.authSetting['scope.userLocation']){
        console.log("-------------不满足scope.userLocation权限----------");
        //申请授权
        wx.authorize({
          scope: 'scope.userLocation',
          success(){
            //已经同意
          }
        })
      }
      //设置地点
      wx.getLocation({
        type: 'wgs84',
        success (res){
          console.log("获取地理位置成功",res)
          that.setData({
            addr: "latitude:" + res.latitude + ", longitude:" + res.longitude
          })
        },
        fail(error){
          console("获取地理位置失败", error)
        }
      })
    }
  })
}

