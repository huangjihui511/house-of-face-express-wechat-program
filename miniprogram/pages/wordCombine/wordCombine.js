// pages/wordFill/wordCombine.js
import CanvasDrag from '../../components/canvas-drag/canvas-drag';
var url
Page({

  /**
   * 页面的初始数据
   */
  data: {
    graph: {},
    cWidth: 0,
    cHeight: 0, 
    screenWidth:0,
    textToPrint:'',
    canAdd:true,
    colorArrF: ['black', 'whitesmoke', 'red', 'orange', 'yellow'],
    colorArrS: ['green', 'blue', 'cyan', 'purple', 'gray'],
    currentColor: 'black',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var pages = getCurrentPages()
    url = pages[pages.length-2].data.curImage
    console.log(url)
    let that = this
    wx.getImageInfo({
      src: url,
      success: function (res) {
        var rate = res.height / res.width
        let width = wx.getSystemInfoSync().windowWidth
        let height = Math.trunc(width * rate)
        // let width = 0
        // var height = wx.getSystemInfoSync().windowWidth * 600 / 750
        // if (res.width / 750 > res.height / 600) {
        //   width = wx.getSystemInfoSync().windowWidth
        //   height = Math.trunc(width * rate)
        // } else {
        //   width = height / rate
        // }
        that.setData({
          cWidth: width,
          cHeight: height,
          graph: {
            w: width,
            h: height,
            type: 'image',
            url: url,
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    let screenWidth = wx.getSystemInfoSync().windowWidth
    that.setData({
      screenWidth: screenWidth
    })
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
   * 文字输入完成
   */
  textFinish(e){
    var text = e.detail.value
    var that = this
    if(text.length > 0){
      that.setData({
        canAdd: false
      })
    }else{
      that.setData({
        canAdd: true
      })
    }
    that.setData({
      textToPrint:text
    })
  },

  /**
  * 添加文本
  */
  onAddText() {
    var that = this
    var obj = that.data;
    wx.showLoading({
      title: '检测文字中',
      duration: 5000
    })
    wx.cloud.callFunction({      
      name: 'textCheck',      
      data: ({        
        text: obj.textToPrint    
      }),
      success: res => {
        wx.hideLoading()
        if (res.result.errCode != 0) {
          wx.showToast({
            title: '文字违规',
          })
        } else {  
          that.setData({
            graph: {
              type: 'text',
              text: obj.textToPrint,
              color: that.data.currentColor
            }
          })
        }
      },
      fail: err => {
        console.log(err)
        wx.hideLoading()
        wx.showToast({
          title: '文字检查失败！',
        })
      }
    })
  },

  /**
   * 选择第一行的颜色
   */
  chooseColorF(e) {
    console.log(e)
    let indexNum = e.currentTarget.id
    var that = this
    that.setData({
      currentColor: indexNum
    })
    CanvasDrag.changFontColor(indexNum);
  },

  /**
   * 选择第二行的颜色
   */
  chooseColorS(e) {
    let indexNum = e.currentTarget.id
    var that = this
    that.setData({
      currentColor: indexNum
    })
    CanvasDrag.changFontColor(indexNum);
  },

  /**
     * 导出图片
     */
  onExport() {
    CanvasDrag.export()
      .then((filePath) => {
        console.log(filePath);
        var pages = getCurrentPages()
        pages[pages.length-2].setData({
          curImage: filePath
        })
        wx.showToast({
          title: '保存成功',
        })
      })
      .catch((e) => {
        console.error(e);
      })
  }
})