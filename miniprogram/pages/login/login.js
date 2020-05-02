// pages/login/login.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    appName: "潮流斗图",
    appDes: "小程序UI组件库是基于WeUI封装的组件库，是一套同微信原生视觉体验一致的组件库，由微信官方设计团队和小程序团队为微信小程序量身设计，令用户的使用感知更加统一。",
    infos : [ {
      title: "自己制作",
      text: "我们提供了丰富的功能，让您可以使用自己的图片或者表情进行二次创作。"
    }, {
      title: "云端储存",
      text: "所有的表情和标签数据都会保存在云端，让你无需担心数据的丢失。"
    }, {
      title: "商店平台",
      text: "通过我们的商店界面，你可以发现自己喜欢的表情和自己喜欢的作者。"
    },
    ], 
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  navigateToMainPage() {
    console.log("next page")
    // wx.navigateTo({
    //   url: '../notify/notify',
    // })
    wx.reLaunch({url: '../shop/shop'})
    //wx.navigateTo({url: '../index/index'})
  },
  login: function(e) {
    if (e.detail.userInfo) {
      console.log("valid")
    
      app.globalData.userInfo = e.detail.userInfo
      console.log("e.detail.userInfo")
      console.log(e.detail.userInfo)
        this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      console.log(e)
      this.navigateToMainPage()
    }
    return
  },

  nolog: function() {
    wx.showModal({
      content: '不登部分功能无法使用',
      confirmText: '确定',
      cancelText: '取消',
      success: res => {
        console.log(res)
        if (res.confirm) {
          console.log('用户点击确定')
          this.navigateToMainPage()
        }  else if (res.cancel) {
          console.log('用户点击取消')
        }
      },
      fail: res => {
        console.log("失败")
      }
    })
    console.log('往下执行')
  },
  async user(res){
      var open_id = res.result.openid
      console.log("open_id")
      console.log(open_id)
      app.globalData.open_id = open_id
      var res = await wx.cloud.callFunction({
        name:"add_expression",
        data:{
          request:"find_user",
          data1:app.globalData.open_id,
        },
      })
      console.log(res)
      if(res.result.data.length==0){
        console.log("需要注册到数据库")
        var res = await wx.cloud.callFunction({
          name:"add_expression",
          data:{
            request:"add_user",
            data1:app.globalData.open_id,
          },
        })
      }
      // app.setData({
      //   open_id:open_id
      // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var _this=this
    wx.cloud.callFunction({
      name:"login",
      success: res => _this.user(res)
    })
    
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      // this.navigateToMainPage()
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        //this.navigateToMainPage()
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: (res) => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          //this.navigateToMainPage()
        }
      })
    }
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
    wx.cloud.callFunction({
      name:"get_notificatoin",
      success : res => {
        console.log(res)
        var list = res.result.data
        
        console.log(wx.getStorageSync("notification_num"))
        console.log(res.result.data.length)
        if (wx.getStorageSync("notification_num") != res.result.data.length) {
          console.log("go to notify")
          wx.navigateTo({
            url: '../notify/notify',
          })
          wx.setStorageSync('notification_num',res.result.data.length )
          return
        }
      },
      fail: err => {
        console.log(err)
      }
    })
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