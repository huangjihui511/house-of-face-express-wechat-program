//index.js
const app = getApp()

const db = wx.cloud.database()

Page({
  data: {
    list:[
      {url:"../coin/index",name:"我的剩余金币",logo_address:"../../../images/team2/coin_logo.jpg"},
      {url:"../friend/index",name:"邀请好友",logo_address:"../../../images/team2/friend_logo.jpg"},
      {url:"../setting/index",name:"设置",logo_address:"../../../images/team2/setting_logo.jpg"},
      {url:"../load/index",name:"上传图片",logo_address:"../../../images/team2/load_logo.jpg"},
      {url:"../../mark_expression/mark_expression",name:"增加经验",logo_address:"../../../images/team2/favorite_logo.jpg"},
      {url:"../../feedback/feedback",name:"使用反馈",logo_address:"../../../images/team2/feedback_logo.jpg"},
      {url:"../../notify/notify",name:"通知信息",logo_address:"../../../images/notify.jpg"}
    ],
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
  jumpToExp:function(e) {
    wx.navigateTo({
      url: '/pages/aboutExp/aboutExp',
    })
  },

  changeExp:function(){
    db.collection('user').where({
      open_id: app.globalData.open_id
    }).get().then(res=>{   
      //console.log(res.data[0].exp)
      this.setData({          
        user_exp: res.data[0].exp     
      })   
      this.calUserRank()
    })
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

  matchingInput:function(input,label) {
    console.log("是否匹配:",input.indexOf(label))
    if (input.indexOf(label) >= 0) {
      return 1
    }
    else {
      return 0
    }
  },
  
  confirm: function() {
    var v = this.data.inputValue
    this.setData({toSearch:v})
    let that = this

    //暂存所有查找的图片路径
    var tempPaths = []
    
    var labels=['label7']
    labels[0] = v
    var globalPicIndex = 0
    wx.cloud.init()
    //索引方式
    var judge = 3
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
        //tags读取权限问题
     // const countResult = db.collection('todos').count()
    //  const total = countResult.total
      // 计算需分几次取
   //   const batchTimes = Math.ceil(total / 20)
   const batchTimes = 1
  // 承载所有读操作的 promise 的数组
      var tempPaths = []
      for (let a = 0;a < batchTimes;a++) {
        db.collection("tags").limit(20).get({
          success:function(res){
            var datas = res.data
            console.log("获取表情成功2:",res.data)
            console.log("tags长度：",datas.length)
            for (var j = 0;j < datas.length;j++) {
              var tag = datas[j]['name']
             // console.log("fuck")
             // console.log(label,tag,matchingInput(label,tag))
              var judge = 0 
              var inputString = String(label)
              var labelString = String(tag)
              console.log(inputString,"---",labelString,"是否匹配:",inputString.indexOf(labelString))
              if (inputString.indexOf(labelString) >= 0) {
                judge = 1
              }
              if (judge == 1) {
                console.log("match")
                var ids = datas[j]['expression_id']
                console.log(ids)
                var max = 0
                for (var key in ids) {
                  var path
                  console.log(key)
                  db.collection('expression').where({
                    id:key
                  }).get({
                    success:function(res) {
                      console.log("查找成功！",res)
                      var reflex1 = globalPicIndex%9
                      var reflex2 =  parseInt(reflex1/3)
                      var reflex3 = reflex1%3
                      console.log(res.data)
                      path = res.data[0]['file_id']
                      console.log("path:",path)
                      that.data.showPicList[reflex2][reflex3]['file_id'] = path
                      that.setData({
                        showPicList:that.data.showPicList
                      })
                      //tempPaths.push(path)
                      globalPicIndex++
                    }
                  })
                }
              } 
            }
            }
          })
        }
        }
        else if (judge == 3) {
          db.collection("tag_names").get({
            
            success:function(res) {
              wx.showLoading({
                title: '加载中',
               })
               setTimeout(function () {
                wx.hideLoading()
                if (globalPicIndex == 0){
                  wx.showToast({
                  title: '抱歉，未找到您想要的表情，换个关键词试试^_^?', // 标题
                  icon: 'none',  // 图标类型，none
                  duration: 2500  // 提示窗停留时间，默认1500ms
                })
                }
                }, 20000)
               // 数据加载中... // 数据加载中...
               
              var all_tags = res.data[0].name
              for (var runover = 0;runover < all_tags.length;runover++) {
                //console.log(runover)
                /*if (runover%100 == 0) {
                  console.log("100")
                }*/
                var judge = 0 
                var inputString = String(label)
                var tag = all_tags[runover]
                var labelString = String(tag)
                //console.log(inputString,"---",labelString,"是否匹配:",inputString.indexOf(labelString))
                if (inputString.indexOf(labelString) >= 0) {
                  judge = 1
                }
                if (judge == 1 && (globalPicIndex < 9)) {
                  //console.log("匹配成功")
                  var path
                  db.collection("tags").where({
                    name:tag
                  }).get({
                    success:function(res) {
                      //console.log("查找成功1111111111")
                      /*path = res.data[0]['file_id']
                      console.log(path)
                      tempPaths[globalPicIndex%9] = path
                      globalPicIndex++*/
                      var datas = res.data
                      for (var f = 0;f < datas.length;f++) {
                        var ids = datas[f]['expression_id']
                        //console.log("ids:",ids)
                        for (var key in ids) {
                        /*  var reflex1 = globalPicIndex%9
                          var reflex2 =  parseInt(reflex1/3)
                          var reflex3 = reflex1%3
                          path = res.data[0]['file_id']
                          console.log("path:",path)
                          that.data.showPicList[reflex2][reflex3]['file_id'] = path
                          that.setData({
                            showPicList:that.data.showPicList
                          })
                          globalPicIndex++ */
                          //var path
                          //console.log(key)
                          var reflex1 = globalPicIndex%9
                            var reflex2 =  parseInt(reflex1/3)
                            var reflex3 = reflex1%3
                            that.data.showPicList[reflex2][reflex3]['file_id'] = key
                            globalPicIndex++
                            console.log("wtfglobalPicIndex",globalPicIndex)
                            that.setData({
                              showPicList:that.data.showPicList
                            }) 
                          /*db.collection('expression').where({
                            id:key
                          }).get({
                            success:function(res) {
                            console.log("查找成功！",res)
                            var reflex1 = globalPicIndex%9
                            var reflex2 =  parseInt(reflex1/3)
                            var reflex3 = reflex1%3
                            console.log(res.data)
                            path = res.data[0]['file_id']
                            console.log("path:",path)
                            that.data.showPicList[reflex2][reflex3]['file_id'] = path
                            that.setData({
                              showPicList:that.data.showPicList
                            })
                      //tempPaths.push(path)
                            globalPicIndex++
                            }
                         })*/
                         if (globalPicIndex >= 9) {
                           // 数据加载完成，隐藏弹窗
                           wx.hideLoading()
                           break
                         }
                      }
                    }
                    }
                  })
                  // 数据加载完成，隐藏弹窗
                  wx.hideLoading()
                  break;
                }
                if (runover == all_tags.length) {
                  // 数据加载完成，隐藏弹窗
                  wx.hideLoading()
                  console.log("结束")
                }
                if ((runover == all_tags.length) && (globalPicIndex == 0)) {
                  // 数据加载完成，隐藏弹窗
                  wx.hideLoading()
                  //console.log("777")
                  /*wx.showToast({
                    title: '抱歉，未找到您想要的表情，换个关键词试试^_^?', // 标题
                    icon: 'none',  // 图标类型，none
                    duration: 1500  // 提示窗停留时间，默认1500ms
                  })*/
                }
                if ((runover == all_tags.length) && (globalPicIndex > 0)) {
                  // 数据加载完成，隐藏弹窗
                  wx.hideLoading()
                }
                if (globalPicIndex >= 9) {
                  // 数据加载完成，隐藏弹窗
                  wx.hideLoading()
                  break
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
    wx.cloud.callFunction({
      name:'add_expression',
      data:{
        request:'user_exp',
        data1:exp
      }
    }).then(res=>{
      console.log("testfunctionExp:",res.result)
    })
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
          //console.log(res.data[0].exp)
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

