// pages/photoCombine/photoCombine.js
const ctx = wx.createCanvasContext('photoCombine')
const ctxw = wx.createCanvasContext('photoCombinew')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height:0,
    width: 0,
    heightForCanvas:0,
    widthForCanvas:0,
    crosswise: false,
    downNum: 0,
    filePath: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    var obj = this.data
    var pages = getCurrentPages()
    var imagesArr = JSON.parse(pages[pages.length - 2].data.imageArr)
    
    if (options.dir == 'crosswise') {
      this.setData({
        crosswise: true,
        height:300
      })
      for(var i = 0; i < imagesArr.length; i++){
        var imageUrl = imagesArr[i]
        wx.getImageInfo({
          src: imageUrl,
          success: function (res) {
            obj.downNum = obj.downNum + 1
            console.log(res)
            let width = res.width / res.height * 300
            ctxw.drawImage(res.path, obj.widthForCanvas, 0, width, 300)
            obj.widthForCanvas = obj.widthForCanvas + width
            that.setData({
              width: obj.widthForCanvas
            })
            if (obj.downNum == imagesArr.length){
              ctxw.draw()
              console.log(res.path)
            }
          }
        })
      }
    } else {
      for(var i = 0; i < imagesArr.length; i++) {
        var imageUrl = imagesArr[i]
        wx.getImageInfo({
          src: imageUrl,
          success: function (res) {
            var width = res.width
            var height = res.height
            obj.downNum = obj.downNum + 1
            console.log(res)
            let sw = wx.getSystemInfoSync().windowWidth
            if(width > sw){
              width = sw
              height = height / res.width * width
            }
            ctx.drawImage(res.path, (sw-width)/2.0, obj.heightForCanvas, width, height)
            obj.heightForCanvas = obj.heightForCanvas + height
            that.setData({
              height: obj.heightForCanvas
            })
            if (obj.downNum == imagesArr.length){
              ctx.draw()
            }
          }
        })
      }
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

  },

  /**
   * 点击保存图片
   */
  toSavePic(){
    let id = this.data.crosswise ? 'photoCombinew' : 'photoCombine'
    wx.canvasToTempFilePath({
      canvasId: id,
      success(res) {
        var pages = getCurrentPages()
        pages[pages.length-2].adjustScale(res.tempFilePath)
        pages[pages.length-2].setData({
          curImage: res.tempFilePath
        })
        wx.showToast({
          title: '保存成功',
          icon: 'success'
        })
      }
    })
  }

})