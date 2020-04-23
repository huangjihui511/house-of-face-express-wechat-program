//index.js
//获取应用实例
const app = getApp()
const db = wx.cloud.database()
//var path = require('app.js')
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    imagePath: '',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    uploaduser: ''

  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  
 
//定义监听回调方法
//app 监听回调方法
  watchBack: value=> { //这里的value 就是 app.js 中 watch 方法中的 set, 返回整个 globalData
    this.setData({
      imagePath : value.imagePath
    });
  },
  onLoad: function (option) {
   // var app = getApp()
    console.log(option)
    this.setData({
      imagePath : option.url
    })

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    db.collection('expression').where({
      file_id: this.data.imagePath
    }).get().then(res=>{
      this.setData({
        uploaduser: res.data[0].open_id
      })
      console.log(this.data.uploaduser)
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  //下载图片
  download(e) {
    let fileUrl = e.currentTarget.dataset.fileid
    wx.cloud.downloadFile({
      fileID: fileUrl,
      success: res => {
        console.log('下载成功', res)
        this.saveImage(res.tempFilePath)
      },
      fail: res => {
        console.log('下载失败', res)
      }
    })
  },
  // 保存图片到相册
  saveImage(imgUrl){
    wx.saveImageToPhotosAlbum({
      filePath:imgUrl,
      success(res) {
        wx.showToast({                
          title: '下载成功',                
          icon: 'success',                
          duration: 1500,                
          mask: false,             
        })
      },
      fail(res) {
        console.log('保存失败', res)
      }
    })
  },
  //收藏图片
  storeImage(e){
    const _ = db.command
    var temp_image = {
      file_id: e.currentTarget.dataset.fileid
    }
    var user_openid = app.globalData.open_id
    console.log(user_openid)
    wx.cloud.callFunction({
      name: 'add_expression',
      data:{
        request: 'add_expression',
        data1: app.globalData.open_id,
        data2: e.currentTarget.dataset.fileid
      },
    }).then(res=> {
      wx.showToast({                
        title: '收藏成功',                
        icon: 'success',                
        duration: 1500,                
        mask: false,             
      })
    })
    /*db.collection('user').where({
      open_id: user_openid
    }).update({
      data:{
        expression_set: _.push(temp_image)
      }
    }).then(res=>{
      console.log(res.data)
      wx.showToast({                
        title: '收藏成功',                
        icon: 'success',                
        duration: 1500,                
        mask: false,             
      })
   	})*/
  },
  jump2userpage:function(e) {
    var app = getApp()
    console.log(e)
    // app.globalData.data = {'imagepath':imagepath}
    wx.navigateTo({
      url: '/pages/userpage/userpage?upload='+this.data.uploaduser
    })
  },
})
