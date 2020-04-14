//index.js
//获取应用实例
const app = getApp()
const db = wx.cloud.database()

Page({
  data: {
    images: [
      {
        fileID : "cloud://ybw17373380-bu509.7962-ybw17373380-bu509-1301775711/test.jpg"
      },
      {
        fileID : "cloud://ybw17373380-bu509.7962-ybw17373380-bu509-1301775711/test1.jpg"
      },
      {
        fileID : "cloud://ybw17373380-bu509.7962-ybw17373380-bu509-1301775711/test2.jpg"
      }
    ],
    user_coin:0,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    image_url: '',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    focus: false,
      inputValue: '',
      toSearch: '/images/timg.jfif',
      testButton: '',
      showPicList: ["/images/test.jpg","/images/test1.jpg"]
  },
  
  shop_image_pagejump:function(e) {
    var app = getApp()
    // app.globalData.data = {'imagepath':imagepath}
    wx.navigateTo({
      url: '/pages/index/index?url='+ e.currentTarget.dataset.fileid
    })
  },
  bindConfirmClick: function(e) {
    var value = e.detail.value

    this.setData(
      {
        inputValue:value
      }
    );
    this.getShowPicList();
  },
  
  confirm: function() {
    var v = this.data.inputValue
    this.setData({toSearch:v})
    wx.cloud.callFunction({    
      name: 'login'  
    }).then(res=>{        
      db.collection('images').where({         
        _openid: res.result.openid      
      }).get().then(res2=>{          
        console.log(res2);         
        this.setData({          
          images: res2.data        
        })      
      })    
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
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
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
