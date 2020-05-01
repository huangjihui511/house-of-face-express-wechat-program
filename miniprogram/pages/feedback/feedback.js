// miniprogram/pages/feedback/feedback.js
const app = getApp()
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    feedback_function:null,
    feedback_usage:null,
    feedback_other:null,
    score:5
  },
  set_score: function(e) {
    var score = parseInt(e.detail.value)
    console.log(score)
    this.data.score = score
  },
  bindinput_function: function(e) {
    console.log(e.detail.value)
    this.setData(
      {
        feedback_function: e.detail.value
      }
    )
  },
  bindinput_usage: function(e) {
    console.log(e.detail.value)
    this.setData(
      {
        feedback_usage: e.detail.value
      }
    )
  },
  bindinput_other: function(e) {
    console.log(e.detail.value)
    this.setData(
      {
        feedback_other: e.detail.value
      }
    )
  },
  submit: function(e) {
    console.log(e)
    var time = util.formatTime(new Date());
    console.log(time)
    if (this.data.feedback_function == null && 
      this.data.feedback_usage  == null &&
      this.data.feedback_other == null) {
        wx.showModal({
          title: '反馈失败（不能提交空反馈）',
          confirmText: '确定',
          success: res=> {
            wx.navigateBack({
              complete: (res) => {},
            })
          }
        })
        return 
      }
    wx.cloud.callFunction({
      name:"add_feedback",
      data: {
        function_advise:this.data.feedback_function,
        usage_advise:this.data.feedback_usage,
        other_advise:this.data.feedback_other,
        score: this.data.score,
        time:time
      },
      success: res=> {
        console.log("succ")
        wx.showModal({
          title: '反馈成功',
          confirmText: '确定',
          success: res=> {
            wx.navigateBack({
              complete: (res) => {},
            })
          }
        })
      },
      fail: err => {
        wx.showModal({
          title: '反馈失败',
          confirmText: '确定',
          success: res=> {
            wx.navigateBack({
              complete: (res) => {},
            })
          }
        })
      }
    })
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