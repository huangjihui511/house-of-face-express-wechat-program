// miniprogram/pages/notify/notify.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    infos:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  confirm: function () {
    wx.navigateBack({
      complete: (res) => {},
    })
    // wx.reLaunch({url: '../team2/favorite_expression/index'})
  },
  onLoad: function (options) {
    wx.cloud.callFunction({
      name:"get_notificatoin",
      success : res => {
        console.log(res)
        var list = res.result.data
        this.setData({
          infos:list
        })
        console.log(app.globalData.notification_num)
        console.log(res.result.data.length)
        if (wx.getStorageSync("notification_num")== res.result.data.length) {
          // this.confirm()
        }
        wx.setStorageSync('notification_num',res.result.data.length )
        // app.globalData.notification_num = res.result.data.length
      },
      fail: err => {
        console.log(err)
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