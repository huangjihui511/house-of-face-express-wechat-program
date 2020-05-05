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
    choosed: false,
    text: false,
    maxLen: false,
    paint: false,
    filter: false,
    joint: false,
    save: false,
    imageArr: '',
    r: 33,
    g: 33,
    b: 33,
    w: 10,
    colorArrF: ['black', 'whitesmoke', 'red', 'orange', 'yellow'],
    colorArrS: ['green', 'blue', 'cyan', 'purple', 'gray'],
    currentColor: 'black',
    fliterArr: ['模糊', '暗化', '淡化', '阴影', '灰度']
  },
  addImg2() {
    wx.reLaunch({url: '../team2/favorite_expression/index'})
  },
  addImag3(a){
    
    var that=this
    
    that.setData({
      choosed:true
    })
    if(a.indexOf("cloud://")>=0){
      wx.cloud.downloadFile({
        fileID: a,
        success(res) {
          console.log(res.tempFilePath)
          wx.getImageInfo({
            src: res.tempFilePath,
            success (res) {
              that.adjustScale(res.path)
              let ctx = wx.createCanvasContext('edit')
              ctx.drawImage(res.path, 0, 0, that.data.cWidth, that.data.cHeight)
              ctx.draw()
              that.setData({
                curImage: res.path
              })
            },
            fail(err){
              console.log(err)
            }
          })
        }
      })
    }
    else{
      wx.getImageInfo({
        src: a,
        success (res) {
          that.adjustScale(res.path)
          let ctx = wx.createCanvasContext('edit')
          ctx.drawImage(res.path, 0, 0, that.data.cWidth, that.data.cHeight)
          ctx.draw()
          that.setData({
            curImage: res.path
          })
        },
        fail(err){
          console.log(err)
        }
      })
    }
    
  },
  addImg() {
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album', 'camera'],
      success (res) {
        that.setData({
          choosed: true
        })
        wx.getImageInfo({
          src: res.tempFilePaths[0],
          success (res) {
            that.adjustScale(res.path)
            let ctx = wx.createCanvasContext('edit')
            ctx.drawImage(res.path, 0, 0, that.data.cWidth, that.data.cHeight)
            ctx.draw()
            that.setData({
              curImage: res.path
            })
            wx.showLoading({
              title: '检测图片中',
              duration: 5000
            })
            wx.getFileSystemManager().readFile({
              filePath: res.path,
              success: res => {
                wx.cloud.callFunction({
                  name: 'imgCheck',
                  data: {
                    value: res.data
                  },
                  success: res => {
                    wx.hideLoading()
                    if (res.result.errCode != 0) {
                      wx.showToast({
                        title: '图片违规！',
                      })
                      that.setData({
                        choosed: false
                      })
                    }
                  },
                  fail: err => {
                    console.log(err)
                    wx.hideLoading()
                    wx.showToast({
                      title: '图片检查失败！',
                    })
                  }
                })
              }
            })
          },
          fail(err){
            console.log(err)
          }
        })
      }
    })
  },

  addText() {
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
  },

  addLine() {
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
  },

  addFilter() {
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
  },

  addPhoto() {
    this.setData({
      text: false,
      paint: false,
      filter: false,
      joint: !this.data.joint,
      save: false
    })
    this.jointTap()
  },

  savePhoto() {
    this.setData({
      text: false,
      paint: false,
      filter: false,
      joint: false,
      save: !this.data.save
    })
  },

  adjustScale(path) {
    let that = this
    wx.getImageInfo({
      src: path,
      success (res) {
        let width = 0
        let height = 0
        console.log(res.path)
        console.log(res.width)
        console.log(res.height)
        if (res.width / (that.data.CVW - 10) > res.height / (that.data.CVH - 10)) {
          width = that.data.CVW - 10
          height = Math.trunc(res.height/res.width*width)
        } else {
          height = that.data.CVH - 10
          width = Math.trunc(res.width/res.height*height)
        }
        console.log(width)
        console.log(height)
        that.setData({
          cWidth: width,
          cHeight: height,
        })
      }
    })
  },

  onTabItemTap() {
    
  },

  crosswise() {
    wx.navigateTo({
      url: '/pages/photoCombine/photoCombine?dir=crosswise',
    })
    this.setData({
      joint: false
    })
  },

  lengthways() {
    wx.navigateTo({
      url: '/pages/photoCombine/photoCombine?dir=lengthways',
    })
    this.setData({
      joint: false
    })
  },

  jointTap() {
    let that = this
    wx.chooseImage({
      count: 8,
      success: function (res) {
        let tempFilePaths = res.tempFilePaths
        tempFilePaths.unshift(that.data.curImage)
        var imagesArrJson = JSON.stringify(tempFilePaths);
        that.setData({
          imageArr: imagesArrJson
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

  saveLocal() {
    let path = this.data.curImage
    wx.saveImageToPhotosAlbum({
      filePath: path,
      success (res) {
        wx.showToast({
          title: '保存成功',
        })
      }
    })
  },

  upLoad() {
    let path = this.data.curImage
    wx.navigateTo({
      url: '../team2/team2_load_for_team1/index?src=' + path,
    })
    // wx.cloud.uploadFile({
    //   cloudPath: 'test.jpg',
    //   filePath: path,
    //   success (res) {
    //     wx.showToast({
    //       title: '上传成功',
    //     })
    //   }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var _this=this
    
    console.log(this.options.src)
    if(this.options.src!=undefined){
      this.addImag3(this.options.src)
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
    
    /*wx.cloud.callFunction({
      name:"add_expression",
      data:{
        request:"sub_expression",
        data1:app.globalData.open_id,
        data2:this.options.src
      }
    })
    */
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