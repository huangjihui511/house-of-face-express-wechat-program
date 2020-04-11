// pages/add_tag/add_tag.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: null,
    imgid: null,
    tags: [],
    selectedTags: []
  },

  add_tag:function (e) {
    if (true) {
      this.setData(
        {
          selectedTags: this.selectedTags + e
        }
      )
      console.log(this.selectedTags)
      console.log(e)
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      imgid:app.globalData.fileID,
      imgurl:app.globalData.tempUrl, // 最终替换为通过fileID得到url
      tags: ["tag1", "tag2", "tag3", "tag4"] // 最终替换为通过fileID得到url
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