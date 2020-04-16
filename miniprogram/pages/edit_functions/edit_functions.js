// pages/edit_functions/edit_functions.js
const app = getApp()

const SW = 750
const SH = Math.trunc(SW * wx.getSystemInfoSync().windowHeight / wx.getSystemInfoSync().windowWidth)

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cWidth: 0,
    cHeight: 0, // canvas的完整高度
    textToPrint:'',
    btnInfo: [
      {
        type: 'text',
        background: 'url("../../images/text.png") white no-repeat; background-size: 20px 20px;background-position: 2px 2px;'
      },
      {
        type: 'paint',
        background: 'url("../../images/paint.png") white no-repeat; background-size: 20px 20px;background-position: 2px 2px;'
      },
      {
        type: 'fliter',
        background: 'url("../../images/fliter.png") white no-repeat; background-size: 20px 20px;background-position: 2px 2px;'
      },
      {
        type: 'save',
        background: 'url("../../images/save.png") white no-repeat; background-size: 20px 20px;background-position: 2px 2px;'
      },
    ],
    text: false,
    maxLen: false,
    paint: false,
    r: 33,
    g: 33,
    b: 33,
    w: 10,
    colorArrF: ['black', 'whitesmoke', 'red', 'orange', 'yellow'],
    colorArrS: ['green', 'blue', 'cyan', 'purple', 'gray'],
    currentColor: 'black',
  },

  onTabItemTap() {
    let that = this
    wx.getSystemInfo({
      success (res) {
        that.setData({
          cWidth: res.windowWidth,
          cHeight: Math.trunc((SH - 100) / SH * res.windowHeight),
        })
      }
    })
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album', 'camera'],
      success (res) {
        console.log(res.tempFilePaths[0])
        wx.getImageInfo({
          src: res.tempFilePaths[0],
          success (res) {
            console.log(res.path)
            let width = 0
            let height = 0
            let ctx = wx.createCanvasContext('edit')
            if (res.width > res.height) {
              width = that.data.cWidth-10
              height = Math.trunc(res.height/res.width*width)
              ctx.drawImage(res.path, 5, (that.data.cHeight-height)/2, width, height)
            } else {
              height = that.data.cHeight-10
              width = Math.trunc(res.width/res.height*height)
              ctx.drawImage(res.path, (that.data.cWidth-width)/2, 5, width, height)
            }
            ctx.draw()
            console.log(width)
            console.log(height)
          },
          fail(err){
            console.log(err)
          }
        })
      }
    })
  },

  onAddText() {
  },

    /**
   * 选择第一行的颜色
   */
  chooseColorF(e) {
    console.log(e)
    let indexNum = e.currentTarget.id
    console.log(indexNum)
    var that = this
    that.setData({
      currentColor: indexNum
    })
    console.log(this.data.currentColor)
  },

  /**
   * 选择第二行的颜色
   */
  chooseColorS(e) {
    let indexNum = e.currentTarget.id
    this.setData({
      currentColor: indexNum
    })
    CanvasDrag.changFontColor(indexNum);
  },

  touchStart: function() {
    this.setData({
      text: false,
      paint: false,
    })
  },

  tapBtn: function(e) {
    let btnType = e.target.dataset.type
    switch (btnType) {
      case 'text':
        this.setData({
          text: !this.data.text,
          paint: false
        })
        break;
      case 'paint':
        this.setData({
          text: false,
          paint: !this.data.paint,
        })
    }
  },

  changeColor: function(e) {
    let temp = {}
    temp[e.target.dataset.color] = e.detail.value
    this.setData({
      ...temp,
    })
  },

  changeWidth: function(e) {
    this.setData({
      w: e.detail.value,
    })
  },

  textFinish(e) {
    let text = e.detail.value
    if(text.length > 0){
      this.setData({
        maxLen: true
      })
    } else {
      this.setData({
        maxLen: false
      })
    }
    this.setData({
      textToPrint: text
    })
  },

  onAddText() {
  },

  chooseColor(e) {
    console.log(e)
    let indexNum = e.currentTarget.id
    this.setData({
      currentColor: indexNum
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