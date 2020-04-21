// pages/login/login.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    appName: "House of Chat Expression",
    appDes: "小程序UI组件库是基于WeUI封装的组件库，是一套同微信原生视觉体验一致的组件库，由微信官方设计团队和小程序团队为微信小程序量身设计，令用户的使用感知更加统一。",
    infos : [ {
      title: "function1",
      text: "小程序UI组件库是基于WeUI封装的组件库，是一套同微信原生视觉体验一致的组件库，由微信官方设计团队和小程序团队为微信小程序量身设计，令用户的使用感知更加统一。"
    }, {
      title: "function2",
      text: "小程序UI组件库是基于WeUI封装的组件库，是一套同微信原生视觉体验一致的组件库，由微信官方设计团队和小程序团队为微信小程序量身设计，令用户的使用感知更加统一。"
    }, {
      title: "function3",
      text: "小程序UI组件库是基于WeUI封装的组件库，是一套同微信原生视觉体验一致的组件库，由微信官方设计团队和小程序团队为微信小程序量身设计，令用户的使用感知更加统一。"
    },
    ], 
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  navigateToMainPage() {
    console.log("next page")
    wx.reLaunch({url: '../team2/favorite_expression/index'})
    //wx.navigateTo({url: '../index/index'})
  },
  login: function(e) {
    app.globalData.userInfo = e.detail.userInfo
      this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    console.log(e)
    this.navigateToMainPage()
  },

  nolog: function() {
    wx.showModal({
      content: '不登陆状态只保留浏览功能',
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    wx.cloud.callFunction({
      name:"login",
      success: res => {
        var open_id = res.result.openid
        console.log("open_id")
        console.log(open_id)
        console.log("现在因为open_id undefined,所以team2里页面错误，请将login/login.js第73行注释掉，才正确")
        app.globalData.open_id = open_id
        // app.setData({
        //   open_id:open_id
        // })
      }
    })
    
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      this.navigateToMainPage()
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        this.navigateToMainPage()
      }
      //this.navigateToMainPage()
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: (res) => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          this.navigateToMainPage()
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