// miniprogram/pages/fliter/fliter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fliterArr: ['灰度', '黑白', '反相', '像素'],
    cWidth: 0,
    cHeight: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var pages = getCurrentPages()
    var url = pages[pages.length-2].data.curImage
    let that = this
    wx.getImageInfo({
      src: url,
      success: function (res) {
        console.log(res.path)
        let width = wx.getSystemInfoSync().windowWidth
        var rate = res.height / res.width
        var height = 600 * width / 750
        console.log(width)
        console.log(height)
        console.log(res.width)
        console.log(res.height)
        if (res.width / res.height > 750 / 600) {
          console.log(1)
          height = Math.trunc(width * rate)
        } else {
          console.log(2)
          width = Math.trunc(height / rate)
        }
        console.log(width)
        console.log(height)
        that.setData({
          cWidth: width,
          cHeight: height,
        })
        let ctx = wx.createCanvasContext('fliter')
        ctx.drawImage(res.path, 0, 0, width, height)
        ctx.draw(false, wx.canvasToTempFilePath({
          canvasId: 'fliter',
          success (res) {
            console.log(1111111)
            console.log(res.tempFilePath)
          }
        }))
      }
    })
  },

  slcFilter: function (e) {
    switch (e.target.dataset) {
      case '灰度':
        break
      case '黑白':
        break
      case '反相':
        break
      case '模糊':
        break
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