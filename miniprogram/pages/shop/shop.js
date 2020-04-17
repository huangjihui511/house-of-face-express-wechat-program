//index.js
//获取应用实例
const app = getApp()
/**<view class="picShowRow">
      <button class="buttonImage" bindtap="shop_image_pagejump" data-image="{{toSearch}}">
        <image class="image_search" src="{{toSearch}}"></image>
      </button>
      <button class="buttonImage"><image class="image_search" src="{{toSearch}}"></image></button>
      <button class="buttonImage"><image class="image_search" src="{{toSearch}}"></image></button>
  <!-- <image class="image_search" src="{{showPicList[1]}}"></image>-->
    <!--<view wx:for="{{array}}"> {{showPicList[]}} </view>-->
    </view>
    <view class="picShowRow">
      <button class="buttonImage"><image class="image_search" src="{{toSearch}}"></image></button>
      <button class="buttonImage"><image class="image_search" src="{{toSearch}}"></image></button>
      <button class="buttonImage"><image class="image_search" src="{{toSearch}}"></image></button>
    </view> */
Page({
  data: {
    user_coin:0,
    user_rank:5,
    user_exp:20,
    user_exp_Upbound:0,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    focus: false,
      inputValue: '',
      toSearch: '/images/test1.jfif',
      testButton: '',
      showPicList: ["/images/test.jpg","/images/test1.jfif","/images/test2.jpg"]
  },
  shop_image_pagejump:function(e) {
    console.log(e)
    var imagepath = e.currentTarget.dataset['image']
    var app = getApp()
   // app.globalData.data = {'imagepath':imagepath}
   app.globalData.imagePath = imagepath
   console.log(app.globalData.imagePath+"test")
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
  bindCoinClick:function(e) {
    wx.navigateTo({
      url: '/pages/coin/coin',
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
  getShowPicList: function() {
    
  },
  confirm: function() {
        var v = this.data.inputValue
        this.setData({toSearch:v})
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var temp = this.data.user_rank*this.data.user_rank
    this.setData({
      user_exp_Upbound : temp
    })
    console.log("expup"+this.data.user_exp_Upbound)
    wx.cloud.init()
    wx.cloud.callFunction({
      name:"upload_image",
      data:{
        a:1,
        b:2
      },
      success:function(res) {
        console.log(res.result.sum)
      },
      fail:console.log("fuck")
    })
    var coins = app.globalData.userCoin
    console.log("coinnum:"+app.globalData.imagePath)
    this.setData({
      user_coin:coins
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
