// pages/edit_functions/edit_functions.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgPath: null,
    addIconList: [
      {
        icon: "star",
        color: 'black',
        size: 25,
        name: '从收藏中添加'
      }
    ],
    existIconList: [
      {
        icon: "add2",
        color: 'black',
        size: 25,
        name: '添加到收藏'
      },
      {
        icon: "delete",
        color: 'black',
        size: 25,
        name: '删除'
      }
    ],
    iconList: [
      {
        icon: "add-friends",
        color: 'black',
        size: 25,
        name: ''
      },
      {
        icon: "add",
        color: 'black',
        size: 25,
        name: ''
      },
      {
        icon: "add2",
        color: 'black',
        size: 25,
        name: ''
      },
      {
        icon: "album",
        color: 'black',
        size: 25,
        name: ''
      },
      {
        icon: "arrow",
        color: 'black',
        size: 12,
        name: ''
      },
      {
        icon: "at",
        color: 'black',
        size: 25,
        name: ''
      },
      {
        icon: "back",
        color: 'black',
        size: 12,
        name: ''
      },
      {
        icon: "back2",
        color: 'black',
        size: 25,
        name: ''
      },
      {
        icon: "bellring-off",
        color: 'black',
        size: 25,
        name: ''
      },
      {
        icon: "bellring-on",
        color: 'black',
        size: 25,
        name: ''
      },
      {
        icon: "camera",
        color: 'black',
        size: 25,
        name: ''
      },
      {
        icon: "cellphone",
        color: 'black',
        size: 25,
        name: ''
      },
      {
        icon: "clip",
        color: 'black',
        size: 25,
        name: ''
      },
      {
        icon: "close",
        color: 'black',
        size: 25,
        name: ''
      }]
  },

  handle: function (e) {
    console.log(e.currentTarget.dataset.index)
    var name = e.currentTarget.dataset.index
    if (name == "从收藏中添加") {
      this.setData({
        imgPath: app.globalData.tempUrl
      })
    }
    if (name == "删除") {
      this.setData({
        imgPath: null
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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