// pages/edit_functions/edit_functions.js
import CanvasDrag from '../../components/canvas-drag/canvas-drag';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cWidth: 0,
    cHeight: 0, // canvas的完整高度
    textToPrint:'',
    graph: {},
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
          cHeight: res.windowHeight/2,
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
            var rate = res.height/res.width
            console.log(res.path)
            that.setData({
              graph: {
                w: 200,
                h: 200*rate,
                type: 'image',
                url: res.path,
              }
            })
          //   let width = 0
          //   let height = 0
          //   //let ctx = wx.createCanvasContext('edit')
          //   if (res.width > res.height) {
          //     width = that.data.cWidth-10
          //     height = Math.trunc(res.height/res.width*width)
          //     //ctx.drawImage(res.path, 5, (that.data.cHeight-height)/2, width, height)
          //   } else {
          //     height = that.data.cHeight-10
          //     width = Math.trunc(res.width/res.height*height)
          //     //ctx.drawImage(res.path, (that.data.cWidth-width)/2, 5, width, height)
          //   }
          //  //ctx.draw()
          //   console.log(width)
          //   console.log(height)
          //   that.setData({
          //     graph: {
          //       w: width,
          //       h: height,
          //       type: 'image',
          //       url: res.path
          //     }
          //   })
          },
          fail(err){
            console.log(err)
          }
        })
      }
    })
  },

  onAddText() {
    var that = this
    var obj = that.data;
    that.setData({
      graph: {
        type: 'text',
        text: obj.textToPrint,
      }
    });
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
    let that = this
    if(text.length > 0){
      that.setData({
        maxLen: true
      })
    } else {
      that.setData({
        maxLen: false
      })
    }
    that.setData({
      textToPrint: text
    })
  },

  onAddText() {
    this.setData({
      graph: {
        type: 'text',
        text: this.data.textToPrint,
      }
    })
  },

  chooseColor(e) {
    console.log(e)
    let indexNum = e.currentTarget.id
    this.setData({
      currentColor: indexNum
    })
    CanvasDrag.changFontColor(indexNum)
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