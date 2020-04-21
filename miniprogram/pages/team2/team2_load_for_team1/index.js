// pages/contect/contect.js
//只需传给页面地址
wx.cloud.init({
  env:"pyb-database-n2c6s"
})

const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
data: {
  title: '上传图片',
  file_id: "",
  maxCount: 10,
  currentFiles: [],
  showPreview: false,
  previewImageUrls: [],
  files: [],
  imageSrc : null,
  label_list:[
    {title:"公开",selected:false},
    {title:"label2",selected:false},
    {title:"label3",selected:false},
    {title:"label4",selected:false},
    {title:"label5",selected:false},
    {title:"label6",selected:false},
    {title:"label7",selected:false},
  ],
  labels:['未公开'],
  image_src:"",
  time:"",
},
checkboxChange(e){
  console.log('checkboxChange e:',e);
  let string = "label_list["+e.currentTarget.dataset.index+"].selected"
      this.setData({
          [string]: !this.data.label_list[e.currentTarget.dataset.index].selected
      })
      let detailValue = this.data.label_list.filter(it => it.selected).map(it => it.title)
      let flags="labels"
      console.log('所有选中的值为：', detailValue)
      if(this.data.label_list[0].selected==false){
        console.log("未公开")
        detailValue[detailValue.length]='未公开'
      }
      this.setData({
        [flags]: detailValue
    })
},
submitted: function submitted(e) {
  if(this.data.file_id==''){
    return
  }
  var that = this;
  if(this.data.image_src==""){
    wx.showToast({
      title: '提交失败',
      icon: 'loading',
      duration: 1000,
      success(data) {
        setTimeout(function () {
          wx.redirectTo({
            url: 'index',
          })
        }, 1000) //延迟时间
      }
    })
  }
  else{
    //传回参数
    console.log(this.data.image_src)
    console.log(this.data.labels)
    console.log(this.data.time)
    let that = this
    var j
    var temp=new Array()
    console.log(temp)
    for(j=0;j<this.data.labels.length;j++){
      temp.push({name:this.data.labels[j],num:0})
    }
    console.log(temp)
    wx.cloud.callFunction({
      name:"add_expression",
      data:{
        request:"add_picture",
        data1:"test002",
        data2:this.data.time,
        data3:temp,
        data4:"open4",
        data5:this.data.file_id
        //data2:["fun", "wdnmd"]
      },
      success:function(res){
        console.log("获取表情成功",res)
      },fail:function(res){
        console.log("获取表情失败",res)
      }
    })
    wx.cloud.callFunction({
      name:"add_expression",
      data:{
        request:"add_expression",
        data1:"f149f6775e9862590040a95f532f204c",
        data2:this.data.file_id,
        data3:temp
        //data3:this.data.labels
        //data2:["fun", "wdnmd"]
      },
      success:function(res){
        console.log("获取表情成功",res)
      },fail:function(res){
        console.log("获取表情失败",res)
      }
    })
    wx.showToast({
      title: '成功提交',
      icon: 'success',
      duration: 1000,
      success(data) {
        setTimeout(function () {
          wx.redirectTo({
            url: '../favorite_expression/index',
          })
        }, 1000) //延迟时间
      }
    })

  }
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var _this=this
    console.log(this.options.src)
    wx.cloud.callFunction({
      name:"add_expression",
      data:{
        request:"sub_expression",
        data1:"f149f6775e9862590040a95f532f204c",
        data2:this.options.src
      }
    })
    wx.cloud.downloadFile({
      fileID: this.options.src,
      success(result) {
        console.log(result.tempFilePath)
        let temp_src="image_src"
        var src=result.tempFilePath
        console.log(src)
        _this.setData({
          [temp_src]:src
        })
        console.log("src"+_this.data.image_src)
        var timestamp =new Date();
        let cu_time="time"
        _this.setData({
          [cu_time]:timestamp
        })
        wx.cloud.uploadFile({
          cloudPath:'test'+Math.round(Math.random()*1000)+'.jpg',
          filePath:src,
          config:"pyb-database-n2c6s",
          success: res => {
            console.log("图片file_id", res.fileID)
            const file1 = res.fileID
            let file2 = "file_id"
            _this.setData({
              [file2]:file1,
            })
            wx.showToast({
              title: '上传成功',
              icon: 'success',
              duration: 1000  
            })
          },
          fail: console.error
        })
      }
    })
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