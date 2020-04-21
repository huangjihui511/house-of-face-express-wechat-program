//app.js
App({
  globalData: {
    imagePath:'',
    userInfo: null,
    userCoin:777,
    fileID: null,
    tempUrl: "http://t7.baidu.com/it/u=3616242789,1098670747&fm=79&app=86&f=JPEG?w=900&h=1350",
    data:{}
  },
  
  //app 全局属性监听
 watch: function (method) {
  var obj = this.globalData;
  Object.defineProperty(obj, "data", { //这里的 data 对应 上面 globalData 中的 data
  configurable: true,
  enumerable: true,
  set: function (value) { //动态赋值，传递对象，为 globalData 中对应变量赋值
  this.imagePath = value.imagePath;
  method(value);
  },
  get: function () { //获取全局变量值，直接返回全部
  return this.globalData;
  }
  })
  },
  onLaunch: function () {
      if (!wx.cloud) {
        console.error('请使用 2.2.3 或以上的基础库以使用云能力')
      } else {
        wx.cloud.init({
          // env 参数说明：
          //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
          //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
          //   如不填则使用默认环境（第一个创建的环境）
          env: 'alpha-project-bvqxh',
          traceUser: true,
        })
      }
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
})
//imagePath:'',
//module.exports.imagePath = this.imagePath;