// pages/add_des/add_des.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: null,
    imgid: null,
    desc: null,
    times: null
  },
  exit: function() {
    let pages = getCurrentPages()
    let prevPage = pages[ pages.length - 2 ]
    // prevPage.setData({
    //   state:"fail"
    // })
    
    prevPage.data.state = "fail"

    console.log("fail")

    wx.navigateBack({
      complete: (res) => {},
    })
  },

  submit: function () {
    let pages = getCurrentPages()
    let prevPage = pages[ pages.length - 2 ]
    // prevPage.setData({
    //   state:"fail"
    // })
    
    prevPage.data.state = "begin"
    console.log(this.data.desc)
    wx.cloud.callFunction({
      name: "add_des_tag",
      data: {
        id: this.data.imgid,
        request: "add_des",
        des:this.data.desc
      } 
    })
    wx.navigateBack()
    // 调用云函数的接口
  },
  bindinput: function(e) {
    console.log(e.detail.value)
    this.setData(
      {
        desc: e.detail.value
      }
    )
  },
   /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let pages = getCurrentPages()
    let prevPage = pages[ pages.length - 2 ]
    // prevPage.setData({
    //   state:"fail"
    // })
    
    prevPage.data.state = "fail"
    var temp_id = options.id
    this.setData({
      times:options.times
    })
    wx.cloud.callFunction({
      name: "add_des_tag",
      data: {
        id: temp_id,
        request: "get_url"
      },
      success: res => {
        console.log(options)
        console.log(res)
        this.setData({
          imgid: temp_id,
          imgurl: res.result.data[0].file_id // 最终替换为通过fileID得到url
        })
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