// pages/draw/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src:"../../images/2.jpg"
  },
  two2one() {
    let that = this
    var imgs = ["../../images/1.jpg","../../images/code.jpg"]
    const ctx = wx.createCanvasContext("myCanvas", that)
    var imgH1,imgW1,imgH2,imgW2,imgPath1,imgPath2
    wx.getImageInfo({
      src: imgs[0],
      success: function(res) {
        imgW1 = res.width
        imgH1 = res.height
        imgPath1 = res.path
        wx.getImageInfo({
          src: imgs[1],
          success: function(res) {
            imgW2 = res.width
            imgH2 = res.height
            imgPath2 = res.path
            that.setData({
              canvasHeight: imgH1+imgH2/imgW2*imgW1,
              canvasWidth: imgW1
            })
            ctx.drawImage(imgPath1, 0, 0, imgW1, imgH1)
            ctx.drawImage(imgPath2, 0, imgH1, imgW1, imgH2/imgW2*imgW1)
            ctx.draw()
            console.log(ctx)
            setTimeout(() => {wx.canvasToTempFilePath({
              canvasId: 'myCanvas',
              success: function(res) {
                console.log("合成的带有小程序码的图片success》》》", res.tempFilePath)
                let tempFilePath = res.tempFilePath
              }
            })
          },1500)
        }
      })
      }
    })
    
    
    
          /*wx.getImageInfo({
            src: imgs[1], 
            success: function(res) {
              console.log(" 绘制二维码》》》", res)
              ctx.drawImage(res.path, -100, imgH - 100, 100, 100)
              ctx.draw()

              wx.showLoading({
                title: '正在保存',
                mask: true

              })

              setTimeout(() => {
                wx.canvasToTempFilePath({
                  canvasId: 'myCanvas',
                  success: function(res) {
                    console.log("合成的带有小程序码的图片success》》》", res)
                    let tempFilePath = res.tempFilePath
                    // 保存到相册
                    wx.saveImageToPhotosAlbum({
                      filePath: tempFilePath,
                      success(res) {


                        wx.hideLoading()
                        wx.showModal({
                          title: '温馨提示',
                          content: '图片保存成功，可在相册中查看',
                          showCancel: false,
                          success(res) {
                            wx.clear
                            if (res.confirm) {
                              that.setData({
                                isShow: true
                              })
                            }
                          }
                        })

                      },

                      fail(res) {
                        wx.hideLoading()
                        wx.showModal({
                          title: '温馨提示',
                          content: '图片保存失败，请重试',
                          showCancel: false
                        })
                      }
                    })

                    console.log("合成的带有小程序码的图片的信息》》》", res)
                  },
                  fail: function(res) {
                    console.log("生成的图拍呢 失败 fail fail fail ", res)
                    wx.hideLoading()
                    wx.showModal({
                      title: '温馨提示',
                      content: '小程序码图片合成失败，请重试',
                      showCancel: false
                    })
                  }
                }, that)
              },1500)
            },
            fail(res) {
              wx.hideLoading()
              wx.showModal({
                title: '温馨提示',
                content: '二维码获取失败，请重试',
                showCancel: false
              })
            }
          })

        },
        fail(res) {
          wx.hideLoading()
          console.log(res)
          wx.showModal({
            title: '温馨提示',
            content: '图片信息获取失败，请重试',
            showCancel: false
          })
        }*/
      }

  ,

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