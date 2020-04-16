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
  imageSrc : null,
  label_list:[
    {title:"label1",selected:false},
    {title:"label2",selected:false},
    {title:"label3",selected:false},
    {title:"label4",selected:false},
    {title:"label5",selected:false},
    {title:"label6",selected:false},
    {title:"label7",selected:false},
  ],
  labels:[],
  image_src:"",
  time:"",
},
checkboxChange(e){
  console.log('checkboxChange e:',e);
  let string = "label_list["+e.currentTarget.dataset.index+"].selected"
      this.setData({
          [string]: !this.data.label_list[e.currentTarget.dataset.index].selected
      })
      let detailValue = this.data.label_list.filter(it => it.selected).map(it => it.title)
      let flags="labels"
      console.log('所有选中的值为：', detailValue)
      this.setData({
        [flags]: detailValue
    })
},
chooseImage: function chooseImage(e) {
  var _this = this;
  console.log("choose")
  

  wx.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success(res) {
      console.log('chooseImage success, temp path is', res.tempFilePaths[0])
      const tempFilePaths = res.tempFilePaths
      let src="image_src"
      _this.setData({
        [src]:res.tempFilePaths[0]
      })
      var timestamp =new Date();
      let cu_time="time"
      _this.setData({
        [cu_time]:timestamp
      })
      console.log("上传时间"+_this.data.time)
      console.log("图片地址"+_this.data.image_src)
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
submitted: function submitted(e) {
  var that = this;
  if(this.data.image_src==""){
    wx.showToast({
      title: '提交失败',
      icon: 'loading',
      duration: 1000,
      success(data) {
        setTimeout(function () {
          wx.redirectTo({
            url: 'index',
          })
        }, 1000) //延迟时间
      }
    })
  }
  else{
    //传回参数
    console.log(this.data.image_src)
    console.log(this.data.labels)
    console.log(this.data.time)
    wx.showToast({
      title: '成功提交',
      icon: 'success',
      duration: 1000,
      success(data) {
        setTimeout(function () {
          wx.redirectTo({
            url: 'index',
          })
        }, 1000) //延迟时间
      }
    })
  }
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