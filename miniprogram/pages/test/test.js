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
        that.setData({
          des_list: res.result.data,
          des_time: res.result.data.length
        })
        console.log(this.data.des_list)
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
        that.setData({
          tag_list: res.result.data,
          tag_time: res.result.data.length
        })
        console.log(this.data.tag_list)
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
    console.log(this.data.des_time)
    // if (this.data.des_time != 1) {
    //   this.setData({
    //     des_time: this.data.des_time - 1
    //   })
    //   wx.navigateTo({
    //     url: '../add_des/add_des',
    //   })
    // }
    if (this.data.tag_time != 1) {
      this.setData({
        tag_time: this.data.tag_time - 1
      })
      wx.navigateTo({
        url: '../add_tag/add_tag',
      })
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