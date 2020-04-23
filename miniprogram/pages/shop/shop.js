//index.js
//获取应用实例
const app = getApp()
const db = wx.cloud.database()

Page({
  data: {
    images: [
      /*{
        file_id : "cloud://ybw17373380-bu509.7962-ybw17373380-bu509-1301775711/test.jpg"
      },
      {
        file_id : "cloud://ybw17373380-bu509.7962-ybw17373380-bu509-1301775711/test1.jpg"
      },
      {
        file_id : "cloud://ybw17373380-bu509.7962-ybw17373380-bu509-1301775711/test2.jpg"
      }*/,
      {file_id : "/images/test1.jfif"
      },
      {file_id :  "/images/test3.jpg"},
      {file_id : "/images/test2.jpg"}
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
    showPicList: [
      [
      {file_id : "cloud://pyb-database-n2c6s.7079-pyb-database-n2c6s-1301841365/test512.jpg"},
      {file_id : "cloud://pyb-database-n2c6s.7079-pyb-database-n2c6s-1301841365/test285.jpg" },
      {file_id : "cloud://pyb-database-n2c6s.7079-pyb-database-n2c6s-1301841365/test121.jpg"}
    ],
      [
      {file_id : "cloud://pyb-database-n2c6s.7079-pyb-database-n2c6s-1301841365/test515.jpg"},
      {file_id : "cloud://pyb-database-n2c6s.7079-pyb-database-n2c6s-1301841365/test147.jpg"},
      {file_id : "cloud://pyb-database-n2c6s.7079-pyb-database-n2c6s-1301841365/test147.jpg"}
    ]
    ],
    user_rank:5,
    user_exp:0,
    user_openid: '123',
    rankExp:[0,5,15,30,50,100,200,500,1000,2000,3000,6000,10000,18000,30000,60000,
      100000,300000],
    user_exp_Upbound:25
  },
  
  shop_image_pagejump:function(e) {
    var app = getApp()
    console.log(e)
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
  },
  
  confirm: function() {
    var v = this.data.inputValue
    this.setData({toSearch:v})
    let that = this

    var labels=['label2','label3']
    var globalPicIndex = 0
    wx.cloud.init()
    //索引方式
    var judge = 1
    for (var i = 0;i < labels.length;i++) {
      var label = labels[i]
      if (judge == 1) {
      wx.cloud.callFunction({
      name:"add_expression",
      data:{
        request:"searchByLabel",
        data1:"0d9cdb685e981a3d002f9f6a46bf8d0b",
        data2:label
      },
      success:function(res) {
        console.log("获取表情成功:",res.result.data)
        var datas = res.result.data
        for (var j = 0;j < datas.length;j++) {
          var path = datas[j]['file_id']
          console.log("路径:",path)
          that.data.showPicList[globalPicIndex%2][globalPicIndex%3]['file_id'] = path
          globalPicIndex++
        }
      }
      }) 
      }
      else if (judge == 2) {
        wx.cloud.callFunction({
          name:"add_des_tag",
          data:{
            request:"search_by_tag",
            tag_name:label
          },
          success:res=>{
            var datas = res.result.data
            console.log("获取表情成功2:",datas)
            for (var j = 0;j < datas.length;j++) {
              var expression_ids = datas[j]['expression_id']
             // console.log("路径:",path)
             for(var key in expression_ids)  {
               var path
              db.collection('expression').where({
               id: key
              }).get().then(res2=>{
                console.log(res2)
                path = res2[0]['file_id']
                console.log("路径:",path)
              })
              that.data.showPicList[globalPicIndex%2][globalPicIndex%3]['file_id'] = path
              globalPicIndex++
            }
            }
          }
        })
      }
    }
    this.setData({
      showPicList:that.data.showPicList
    })
   /* wx.cloud.callFunction({    
      name: 'login'  
    }).then(res=>{        
      console.log(res.result.openid)
      db.collection('expression').where({         
        openid: res.result.openid      
      }).get().then(res2=>{          
        console.log(res2);         
        this.setData({          
          images: res2.data        
        })      
      })    
    }) */
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
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
    var tempid = '123'
    wx.cloud.callFunction({
      name:'login',
      success: res => {
        console.log('success:', res)
        this.setData({
          user_openid: res.result.openid
        })
        tempid = this.data.user_openid
        db.collection('user').where({
          open_id: tempid
        }).get().then(res=>{   
          this.setData({          
            user_exp: res.data[0].exp     
          })   
          this.calUserRank(this.data.user_exp)
        })    
      },
      fail :console.error
    })
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
