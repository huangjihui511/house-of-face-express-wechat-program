// pages/contect/contect.js
Page({

  /**
   * 页面的初始数据
   */
data: {
  title: '上传图片',
  maxCount: 10,
  currentFiles: [],
  showPreview: false,
  previewImageUrls: [],
  files: [],
  imageSrc : null
},
chooseImage: function chooseImage(e) {
  var _this = this;
  console.log("choose")
  wx.chooseImage({
    count: 5,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success(res) {
      console.log('chooseImage success, temp path is', res.tempFilePaths[0])
      
      const tempFilePaths = res.tempFilePaths
      wx.showToast({
        title: '上传成功',
        icon: 'success',
        duration: 1000
      })
      
    },

    fail({errMsg}) {
      console.log('chooseImage fail, err is', errMsg)
      wx.showToast({
        title: '上传失败',
        icon: 'loading',
        duration: 1000
      })
    }
  });
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