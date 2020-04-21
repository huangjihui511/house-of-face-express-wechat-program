// miniprogram/pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    des_list: null,
    tag_list: null,
    des_time: null,
    tag_time: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.cloud.callFunction({
      name:"add_des_tag",
      data:{
        request:"get_des"
      },
      success: res => {
        console.log("succ")
        // that.setData({
        //   des_list: res.result.data,
        //   des_time: res.result.data.length
        // })
        this.data.des_list = res.result.data
        this.data.des_time = res.result.data.length
        console.log("destime")
        console.log(this.data.des_time)
        this.onShow()
      },
      fail: err => {
        console.log("error")
        // handle error
      }
    })
    wx.cloud.callFunction({
      name:"add_des_tag",
      data:{
        request:"get_tag"
      },
      success: res => {
        console.log("succ")
        // that.setData({
        //   tag_list: res.result.data,
        //   tag_time: res.result.data.length
        // })
        console.log(res)
        this.data.tag_list = res.result.data
        this.data.tag_time = res.result.data.length
        console.log(this.data.tag_time)
        this.onShow()
      },
      fail: err => {
        console.log("error")
        // handle error
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
    console.log("onshow")
    console.log(this.data.des_time)
    while(this.data.des_time == null || this.data.tag_time == null){
      return
    }
    if (this.data.des_time != 0) {
      this.data.des_time -= 1
      wx.navigateTo({
        url: '../add_des/add_des?id=' + this.data.des_list[this.data.des_time].id,
      })
      return
    }
    if (this.data.tag_time != 0) {
      this.data.tag_time -= 1
      wx.navigateTo({
        url: '../add_tag/add_tag?id=' + this.data.tag_list[this.data.tag_time].id,
      })
      return
    }
    wx.navigateBack({
      complete: (res) => {},
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