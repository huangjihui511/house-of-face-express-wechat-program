//index.js
const app = getApp()

Page({
  data: {
    list:[{url:"../my/index",name:"昵称"},
    {url:"../my/index",name:"头像"},
    {url:"../my/index",name:"性别"},
    {url:"../my/index",name:"签名"},
    ]
  },
  onShow:function () {
    wx.showToast({
      title: '待开发',
      icon: 'loading',
      duration: 3000
    })
  }
})
