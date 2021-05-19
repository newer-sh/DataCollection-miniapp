App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    wx.cloud.init({
      traceUser: true,
      env: "bishe-dev-0gb2h6va957f73bf"
    });
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  }
})

/**
 * 权限校验
 * @param {*} obj 
 */
function checkPermission(obj) {
  console.log("-------------checkPermission----------");
  wx.getSetting({
    success:function(res){
      if (!res.authSetting['scope.userLocation']){
        console.log("-------------不满足scope.userLocation权限----------");
        //申请授权
        wx.authorize({
          scope: 'scope.userLocation',
          success(){
            
          }
        })
      }
    }
  })
}