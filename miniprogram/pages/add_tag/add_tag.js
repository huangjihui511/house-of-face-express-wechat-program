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
    printTags: []
  },

  add_tag:function (e) {
    
    var name = e.currentTarget.dataset.index
    var index = this.data.tags.indexOf(name)
    var newType = "primary"
    if (this.data.printTags[index].type == newType) {
      newType = "default"
    }
    this.setData({
      ["printTags[" + index + "].type"]: newType
    })
  },
  submit: function () {
    var markedTags = []
    for ( var i = 0; i <this.data.tags.length; i++){
      if (this.data.printTags[i].type != "default") {
        markedTags.pop(this.data.printTags[i].name)
      }
    }
    var result = {
      //id: this.data.imgid,
      id: 1,
      tags: markedTags,
      request: "add_tag"
    }
    var that = this
    wx.cloud.callFunction({
      name: "add_des_tag",
      data: result,
      success:res => {
        console.log("suc")
      },
      fail: err => {
        console.log(err)
        // handle error
      }
    })
    wx.navigateBack()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      imgid:app.globalData.fileID,
      imgurl:app.globalData.tempUrl, // 最终替换为通过fileID得到url
      tags: ["tag1", "tag2", "tag3", "tag4", "tag5", "tag6", "tag7", "tag8"] // 最终替换为通过fileID得到url
    })
    for ( var i = 0; i <this.data.tags.length; i++){
      this.data.printTags.push({
        name: this.data.tags[i],
        type: "default"
      })
    }
    this.setData({
      printTags: this.data.printTags
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