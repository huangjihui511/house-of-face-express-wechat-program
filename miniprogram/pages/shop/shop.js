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
    user_rank:0,
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
    showPicList: ["/images/test1.jfif",
    "/images/test3.jpg",
    "/images/test2.jpg"],
    rankExp:[0,5,15,30,50,100,200,500,1000,2000,3000,6000,10000,18000,30000,60000,
    100000,300000]
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
      let that = this
      wx.cloud.init()
      wx.cloud.callFunction({
      name:"add_expression",
      data:{
        request:"searchByLabel",
        data1:"0d9cdb685e981a3d002f9f6a46bf8d0b",
        data2:this.data.toSearch
      },
      success:function(res) {
        console.log("获取表情成功:",res.result.data)
        var path = res.result.data[0]['file_id']
        that.data.showPicList[0] = path
        that.setData({
          showPicList:that.data.showPicList
        }) 
        console.log("表情地址:",path)
      }
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  uploadimage: function() {
        // 让用户选择一张图片
    wx.chooseImage({
    success: chooseResult => {
    // 将图片上传至云存储空间
    /*wx.cloud.uploadFile({
      // 指定上传到的云路径
      cloudPath: 'my-photo.png',
      // 指定要上传的文件的小程序临时文件路径
      filePath: chooseResult.tempFilePaths[0],
      // 成功回调
      success: res => {
        console.log('上传成功', res)
      },
    }) */
  },
})
  },
  calUserRank: function(exp) {
    //根据用户的经验计算等级
   // var exp = this.data.user_exp
    var expList = this.data.rankExp
    var upbound
    var i = 0
    for (;i < 17;i++) {
      if ((exp >= expList[i]) && (exp < expList[i+1])) {
        upbound = expList[i+1]
        break
      }
    }
    if (i == 17) {
      upbound = expList[17]
    }
    this.setData({
      user_rank: i+1,
      user_exp_Upbound: upbound
    })
    console.log("rank:"+this.data.user_rank+"expup:"+this.data.user_exp_Upbound)
  }
  ,
  onLoad: function () {
    
    //用户经验暂时从页面data字段获取
    var exp = this.data.user_exp
    //无返回值，在函数内部将运算结果提交至视图层
    this.calUserRank(exp)

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
