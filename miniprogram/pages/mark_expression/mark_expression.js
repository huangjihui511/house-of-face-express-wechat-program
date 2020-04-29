// miniprogram/pages/test/test.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    des_list: null,
    tag_list: null,
    des_time: null,
    tag_time: null,
    state: "wait"
  },

  changeParentExp: function(){
    var pages =getCurrentPages();//当前页面栈
    if (pages.length >1) {
      var beforePage = pages[pages.length- 2];//获取上一个页面实例对象
      beforePage.changeExp();
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  begin: function () {
    this.setData({
      state:"begin"
    })
    this.onShow()
  },
  onLoad: function (options) {
    var that = this
    // console.log("search")
    // wx.cloud.callFunction({
    //   name:"add_des_tag",
    //   data:{
    //     request:"search_by_tag",
    //     tag_name:"tag1"
    //   },
    //   success: res => {
       
    //     console.log("suc")
    //   },
    //   fail: res => {
    //     console.log("error")
    //   }
    // })
    // return 
    wx.cloud.callFunction({
      name:"add_des_tag",
      data:{
        request:"get_des"
      },
      success: res => {
        console.log("succ")
        // that.setData({
        //   des_list: res.result.data,
        //   des_time: res.result.data.length
        // })
        this.data.des_list = res.result.data
        this.data.des_time = res.result.data.length
        console.log("destime")
        console.log(this.data.des_time)
        this.onShow()
      },
      fail: err => {
        console.log("error")
        // handle error
      }
    })
    wx.cloud.callFunction({
      name:"add_des_tag",
      data:{
        request:"get_tag"
      },
      success: res => {
        console.log("succ")
        // that.setData({
        //   tag_list: res.result.data,
        //   tag_time: res.result.data.length
        // })
        console.log(res)
        this.data.tag_list = res.result.data
        this.data.tag_time = res.result.data.length
        console.log(this.data.tag_time)
        this.onShow()
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
    console.log("onshow")
    console.log(this.data.state)
    if (this.data.state == "wait") {
      return
    }
    if (this.data.state == "fail") {
      wx.showModal({
        title: '任务失败',
        content: '未完成识别任务，无法增加经验',
        showCancel: false,
        confirmText: '确定',
        success: res=> {
          wx.navigateBack({
            complete: (res) => {},
          })
        }
      })
      
      return
    }
    while(this.data.des_time == null || this.data.tag_time == null){
      return
    }
    if (this.data.des_time != 0) {
      this.data.des_time -= 1
      wx.navigateTo({
        url: '../add_des/add_des?id=' + this.data.des_list[this.data.des_time]._id + "&times=" + this.data.des_time,
      })

      return
    }
    if (this.data.tag_time != 0) {
      this.data.tag_time -= 1
      wx.navigateTo({
        url: '../add_tag/add_tag?id=' + this.data.tag_list[this.data.tag_time]._id + "&times=" + this.data.tag_time,
      })
      return
    }
    if (this.data.tag_time == 0 && this.data.des_time == 0) {
      wx.cloud.callFunction({
        name: "add_exp",
        data:{
          id:app.globalData.open_id,
          incNum:10
        },
        success:res=>{
          console.log(res)
          console.log(app.globalData.open_id)
          this.changeParentExp()
        }
      })
      wx.showModal({
        title: '任务成功',
        content: '你已经得到10点经验',
        showCancel: false,
        confirmText: '确定'
      })
      
      return
    }
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