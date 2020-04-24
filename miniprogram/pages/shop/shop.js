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
    toSearch: '',
    testButton: '',
    showPicList: [
      [
        {file_id:''},
        {file_id:''},
        {file_id:''}
    ],
      [
        {file_id:''},
        {file_id:''},
        {file_id:''}
    ],
    [
      {file_id:''},
      {file_id:''},
      {file_id:''}
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

    var labels=['label7']
    labels[0] = v
    var globalPicIndex = 0
    wx.cloud.init()
    //索引方式
    var judge = 1
    //for (var i = 0;i < labels.length;i++) {
      //var label = labels[i]
    for (var i = 0;i < 1;i++) {  
      var label = labels[i]
      if (judge == 1) {
        db.collection('expression').where({
          tags:{
            [label]:0
          }
        }).get({
          success:function(res) {
          console.log("获取表情成功:",res.data)
          var datas = res.data
          for (var j = 0;j < datas.length;j++) {
          var path = datas[j]['file_id']
          console.log("路径:",path)
          //that.data.showPicList[(globalPicIndex%9)/3][(globalPicIndex%9)%3]['file_id'] = path
          var reflex1 = globalPicIndex%9
          var reflex2 =  parseInt(reflex1/3)
          var reflex3 = reflex1%3
          if (path=='') {
            path = that.data.showPicList[reflex2][reflex3]['file_id']
          }
          that.data.showPicList[reflex2][reflex3]['file_id'] = path
          that.setData({
            showPicList:that.data.showPicList
          })
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
              that.data.showPicList[(globalPicIndex%9)/3][(globalPicIndex%9)%3]['file_id'] = path
              globalPicIndex++
            }
            }
          }
        })
      }
    }
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
  calUserRank: function() {

    //根据用户的经验计算等级
    var exp = this.data.user_exp
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
    
    var that = this
    console.log("初始化推荐表情")
    db.collection('expression').where({
      public: true
    }).limit(9).get({
      success:function(res) {
        var paths = res.data
        console.log("初始推荐表情:",paths)
        console.log(paths.length)
        for (var i = 0;i < paths.length;i++) {
          var path = paths[i]['file_id']
          console.log(paths[i])
          console.log("init path:",path)
          that.data.showPicList[parseInt(i/3)][i%3]['file_id'] = path
          that.setData({
            showPicList:that.data.showPicList
          }) 
        }
      }
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
    var that = this
    var tempid = '123'
    wx.cloud.callFunction({
      name:'login',
      success: res => {
        console.log('success:', res)
        that.setData({
          user_openid: res.result.openid
        })
        tempid = that.data.user_openid
        console.log(tempid)
        db.collection('user').where({
          open_id: tempid
        }).get().then(res=>{   
          console.log(res.data[0].exp)
          that.setData({          
            user_exp: res.data[0].exp     
          })   
          that.calUserRank()
        })    
      },
      fail :console.error
    })
   // this.calUserRank()
    console.log("用户经验：",this.data.user_exp)
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
