// pages/edit_functions/edit_functions.js
const app = getApp()
const RATE = wx.getSystemInfoSync().windowWidth / 750

Page({

  /**
   * 页面的初始数据
   */
  data: {
    CVW: wx.getSystemInfoSync().windowWidth,
    CVH: Math.trunc(wx.getSystemInfoSync().windowHeight - 89),
    cWidth: 0,
    cHeight: 0, // canvas的完整高度
    curImage: '',
    textToPrint:'',
    btnInfo: [
      {
        type: 'text',
        background: 'url("../../images/text.png") white no-repeat; background-size: 20px 20px;background-position: 2px 2px;'
        //修改图标
        //background: 'background-size: 20px 20px;background-position: 2px 2px;',
        //icon_path:"../../images/pen.png"
      },
      {
        type: 'paint',
        background: 'url("../../images/paint.png") white no-repeat; background-size: 20px 20px;background-position: 2px 2px;'
        //修改图标
        //background: 'background-size: 20px 20px;background-position: 2px 2px;',
        //icon_path:"../../images/filter.png"
      },
      {
        type: 'filter',
        background: 'url("../../images/fliter.png") white no-repeat; background-size: 20px 20px;background-position: 2px 2px;'
        //修改图标
        //background: 'background-size: 20px 20px;background-position: 2px 2px;',
        //icon_path:"../../images/search.png"
      },
      {
        type: 'joint',
        background: 'url("../../images/joint.png") white no-repeat; background-size: 20px 20px;background-position: 2px 2px;'
        //修改图标
        //background: 'background-size: 20px 20px;background-position: 2px 2px;',
        //icon_path:"../../images/cut.png"
      },
      {
        type: 'save',
        background: 'url("../../images/save.png") white no-repeat; background-size: 20px 20px;background-position: 2px 2px;'
        //修改图标
        //background: 'background-size: 20px 20px;background-position: 2px 2px;',
        //icon_path:"../../images/pic.png"
      },
    ],
    text: false,
    maxLen: false,
    paint: false,
    filter: false,
    joint: false,
    save: false,
    r: 33,
    g: 33,
    b: 33,
    w: 10,
    colorArrF: ['black', 'whitesmoke', 'red', 'orange', 'yellow'],
    colorArrS: ['green', 'blue', 'cyan', 'purple', 'gray'],
    currentColor: 'black',
    fliterArr: ['模糊', '暗化', '淡化', '阴影', '灰度']
  },

  onTabItemTap() {
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album', 'camera'],
      success (res) {
        wx.getImageInfo({
          src: res.tempFilePaths[0],
          success (res) {
            let width = 0
            let height = 0
            if (res.width / (that.data.CVW - 10) > res.height / (that.data.CVH - 10)) {
              width = that.data.CVW - 10
              height = Math.trunc(res.height/res.width*width)
            } else {
              height = that.data.CVH - 10
              width = Math.trunc(res.width/res.height*height)
            }
            that.setData({
              cWidth: width,
              cHeight: height,
              curImage: res.path
            })
            let ctx = wx.createCanvasContext('edit')
            ctx.drawImage(res.path, 0, 0, width, height)
            ctx.draw()
          },
          fail(err){
            console.log(err)
          }
        })
      }
    })
  },

  tapBtn: function(e) {
    let btnType = e.target.dataset.type
    switch (btnType) {
      case 'text':
        this.setData({
          text: !this.data.text,
          paint: false,
          filter: false,
          joint: false,
          save: false
        })
        wx.navigateTo({
          url: '../wordCombine/wordCombine',
        })
        break;
      case 'paint':
        this.setData({
          text: false,
          paint: !this.data.paint,
          filter: false,
          joint: false,
          save: false
        })
        wx.navigateTo({
          url: '../paint/paint?image=' + this.data.curImage,
        })
        break
      case 'filter':
        this.setData({
          text: false,
          paint: false,
          filter: !this.data.filter,
          joint: false,
          save:false
        })
        wx.navigateTo({
          url: '../fliter/fliter',
        })
        break
      case 'joint':
        this.setData({
          text: false,
          paint: false,
          filter: false,
          joint: !this.data.joint,
          save: false
        })
        this.jointTap()
        break
      case 'save':
        this.setData({
          text: false,
          paint: false,
          filter: false,
          joint: false,
          save: !this.data.save
        })
        break
    }
  },

  jointTap() {
    let that = this
    wx.chooseImage({
      count: 8,
      success: function (res) {
        let tempFilePaths = res.tempFilePaths
        tempFilePaths.unshift(that.data.curImage)
        var imagesArrJson = JSON.stringify(tempFilePaths);
        wx.navigateTo({
          url: '/pages/photoCombine/photoCombine?imageUrls=' + imagesArrJson,
        })
      },
    })
  },

  touchStart: function() {
    this.setData({
      text: false,
      paint: false,
      filter: false,
      joint: false,
      save: false
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