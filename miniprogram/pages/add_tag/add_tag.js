// pages/add_tag/add_tag.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: null,
    imgid: null,
    times: null,
    tags: [],
    printTags: []
  },
  exit: function() {
    let pages = getCurrentPages()
    let prevPage = pages[ pages.length - 2 ]
    // prevPage.setData({
    //   state:"fail"
    // })
    
    prevPage.data.state = "fail"

    console.log("fail")
    
    wx.navigateBack({
      complete: (res) => {},
    })
  },
  add_tag:function (e) {
    
    var name = e.currentTarget.dataset.index
    var index = this.data.tags.indexOf(name)
    var newType = "primary"
    if (this.data.printTags[index].type == newType) {
      newType = "default"
    }
    this.setData({
      ["printTags[" + index + "].type"]: newType
    })
    console.log(this.data)
  },
  submit: function () {
    let pages = getCurrentPages()
    let prevPage = pages[ pages.length - 2 ]
    // prevPage.setData({
    //   state:"fail"
    // })
    
    prevPage.data.state = "begin"
    var markedTags = []
    for ( var i = 0; i <this.data.tags.length; i++){
      if (this.data.printTags[i].type != "default") {
        var name = this.data.printTags[i].name
        
        markedTags.push(name)
        // this.setData({
        //   ["markedTags[" + i + "]"]: name,
        // })
      }
    }
    var result = {}
    result = {
      id: this.data.imgid,
      tags: markedTags,
      request: "add_tag"
    }
    // this.setData({
    //   //id: this.data.imgid,
    //   result: {
    //     id: 1,
    //     tags: markedTags,
    //     request: "add_tag"
    //   }
    // })
    console.log(result)
    var that = this
    wx.cloud.callFunction({
      name: "add_des_tag",
      data: result,
      success:res => {
        console.log("suc")
        console.log(result)
        console.log(markedTags)
        console.log(res)
      },
      fail: err => {
        console.log(err)
        // handle error
      }
    })
    wx.navigateBack()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let pages = getCurrentPages()
    let prevPage = pages[ pages.length - 2 ]
    // prevPage.setData({
    //   state:"fail"
    // })
    
    prevPage.data.state = "fail"
    var temp_id = options.id
    this.setData({
      times:options.times
    })
    wx.cloud.callFunction({
      name: "add_des_tag",
      data: {
        id: temp_id,
        request: "get_url"
      },
      success: res => {
        console.log(options)
        console.log(res)
        this.setData({
          imgid: temp_id,
          imgurl: res.result.data[0].file_id // 最终替换为通过fileID得到url
        })
      } 
    })
    wx.cloud.callFunction({
      name: "add_des_tag",
      data: {
        request:"get_tags",
        id: temp_id
      },
      success: res => {
        var temp
        var t
        console.log(res)
        temp = res.result.data[0].tags
        for (t in temp) {
          this.data.tags.push(t)
          this.data.printTags.push({
            name: t,
            type: "default"
          })
        }
        console.log(this.data.printTags)
        this.setData({
          printTags: this.data.printTags
        })
      },
      fail: err => {
        console.log("error")
        // handle error
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