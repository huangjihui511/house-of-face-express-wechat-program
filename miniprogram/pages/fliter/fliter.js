// miniprogram/pages/fliter/fliter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fliterArr: [
      {
        type: '灰度',
        background: 'url("https://i.niupic.com/images/2020/04/25/7vvW.png") white no-repeat; background-size: 20px 20px;background-position-x: center;background-position-y: center;'
      },
      {
        type: '黑白',
        background: 'url("https://i.niupic.com/images/2020/04/25/7vvV.png") white no-repeat; background-size: 20px 20px;background-position-x: center;background-position-y: center;'
      },
      {
        type: '反相',
        background: 'url("https://i.niupic.com/images/2020/04/25/7vvU.png") white no-repeat; background-size: 20px 20px;background-position-x: center;background-position-y: center;'
      },
      {
        type: '像素',
        background: 'url("https://i.niupic.com/images/2020/04/25/7vvT.png") white no-repeat; background-size: 20px 20px;background-position-x: center;background-position-y: center;'
      }
    ],
    cWidth: 0,
    cHeight: 600
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
        if (res.width / res.height > 750 / 600) {
          height = Math.trunc(width * rate)
        } else {
          width = Math.trunc(height / rate)
        }
        that.setData({
          cWidth: width,
          cHeight: height,
        })
        let ctx = wx.createCanvasContext('fliter')
        ctx.drawImage(res.path, 0, 0, width, height)
        ctx.draw(false, wx.canvasToTempFilePath({
          canvasId: 'fliter',
          success (res) {
            console.log(res.tempFilePath)
          }
        }))
      }
    })
  },

  filter(type) {
    let that = this
    wx.canvasGetImageData({
      canvasId: 'fliter',
      x: 0,
      y: 0,
      width: that.data.cWidth,
      height: that.data.cHeight,
      success(result) {
        let data = result.data;
        switch (type) {
          case 'hd':
            for (let i = 0; i < result.width * result.height;i++){
              //********************只有这里有区别****************************
                let R = data[i * 4 + 0];
                let G = data[i * 4 + 1];
                let B = data[i * 4 + 2];
                let grey = R * 0.3 + G * 0.59 + B * 0.11;
                data[i * 4 + 0] = grey;
                data[i * 4 + 1] = grey;
                data[i * 4 + 2] = grey;
              //********************只有这里有区别****************************
              }
            break
          case 'hb':
            for (let i = 0; i < result.width * result.height;i++){
              //********************只有这里有区别****************************
                let R = data[i * 4 + 0];
                let G = data[i * 4 + 1];
                let B = data[i * 4 + 2];
                let grey = R * 0.3 + G * 0.59 + B * 0.11;
                if (grey > 125){
                  grey=255;
                } else { 
                  grey = 0;
                } 
                data[i * 4 + 0] = grey;
                data[i * 4 + 1] = grey;
                data[i * 4 + 2] = grey;
              //********************只有这里有区别****************************
              }
            break
          case 'fx':
            for (let i = 0; i < result.width * result.height;i++){
              //********************只有这里有区别****************************
                let R = data[i * 4 + 0];
                let G = data[i * 4 + 1];
                let B = data[i * 4 + 2];
                data[i * 4 + 0] = 255-R;
                data[i * 4 + 1] = 255-G;
                data[i * 4 + 2] = 255-B;
              //********************只有这里有区别****************************
              }
            break
          case 'xs':
            const size = 10;
            const totalnum = size*size;
            for(let i=0;i<result.height;i+=size){
              for(let j=0;j<result.width;j+=size){
                var totalR=0,totalG=0,totalB=0;
                for(let dx=0;dx<size;dx++){
                  for(let dy=0;dy<size;dy++){
                    var x = i+dx;
                    var y = j+dy;
                    var p = x * result.width + y;
                    totalR += data[p * 4 + 0];
                    totalG += data[p * 4 + 1];
                    totalB += data[p * 4 + 2];
                  }
                }
                var p = i * result.width + j;
                var resR = totalR / totalnum;
                var resG = totalG / totalnum;
                var resB = totalB / totalnum;
                for (let dx = 0; dx < size; dx++){
                  for (let dy = 0; dy < size; dy++) {
                    var x = i + dx;
                    var y = j + dy;
                    var p = x * result.width + y;
                    data[p * 4 + 0] = resR;
                    data[p * 4 + 1] = resG;
                    data[p * 4 + 2] = resB;
                  }
                }
              }
            }
            break
        }
        wx.canvasPutImageData({
          canvasId: 'fliterOut',
          x: 0,
          y: 0,
          width: that.data.cWidth,
          height: that.data.cHeight,
          data: data,
          success(res) { 
            console.log(res)
          }
        })
      }
    })
  },

  tapBtn: function(e) {
    let btnType = e.target.dataset.type
    switch (btnType) {
      case '灰度':
        this.filter('hd')
        break
      case '黑白':
        this.filter('hb')
        break
      case '反相':
        this.filter('fx')
        break
      case '像素':
        this.filter('xs')
        break
    }
  },

  onExport() {
    wx.canvasToTempFilePath({
      canvasId: 'fliterOut',
      success(res) {
        var pages = getCurrentPages()
        pages[pages.length-2].setData({
          curImage: res.tempFilePath
        })
        wx.showToast({
          title: '保存成功',
        })
      }
    })
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