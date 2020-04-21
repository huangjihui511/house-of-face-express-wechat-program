// pages/contect/contect.js

wx.cloud.init({
  env:"pyb-database-n2c6s",traceUser:true
})
const db = wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
data: {
  empty:true,
  title: '上传图片',
  file_id: "",
  before_file_id:"",
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
two2one(a) {
  let that = this
  var imgs = ['',"../../images/code.jpg"]
      imgs[0]=a
      console.log(imgs[0])
      const ctx = wx.createCanvasContext("myCanvas", that)
      var imgH1,imgW1,imgH2,imgW2,imgPath1,imgPath2
      wx.getImageInfo({
        src: imgs[0],
        success: function(res) {
          imgW1 = res.width
          imgH1 = res.height
          imgPath1 = res.path
          console.log(res)
          wx.getImageInfo({
            src: imgs[1],
            success: function(res) {
              imgW2 = res.width
              imgH2 = res.height
              imgPath2 = res.path
              console.log(res)
              ctx.drawImage(imgPath1, 0, 0, imgW1, imgH1)
              ctx.drawImage(imgPath2, 0, imgH1, imgW1, imgH2/imgW2*imgW1)
              ctx.draw()
              console.log(ctx)
              setTimeout(() => {wx.canvasToTempFilePath({
                canvasId: 'myCanvas',
                success: function(res) {
                  console.log("合成的带有小程序码的图片success》》》", res)
                  let empty='empty'
                  let src="image_src"
                  _this.setData({
                    [empty]:false,
                    [src]:res.tempFilePaths
                  })
                }
              })},1500)
              console.log("合成的带有小程序码的图片success》》》")
          }
        })
        }
      })
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

chooseImage: function chooseImage(e) {
  let that = this
  let file3 = "before_file_id"
  this.setData({
    [file3]:this.data.file_id,
  })
  var _this = this;
  console.log("choose")
  wx.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success(res) {
      console.log('chooseImage success, temp path is', res.tempFilePaths[0])
      let empty='empty'
      let src="image_src"
      _this.setData({
        [empty]:false,
        [src]:res.tempFilePaths[0]
      })
      var timestamp =new Date();
      let cu_time="time"
      _this.setData({
        [cu_time]:timestamp
      })
      console.log("上传时间"+_this.data.time)
      console.log("图片地址"+_this.data.image_src)
      _this.two2one(_this.data.image_src)
      wx.showToast({
        title: '请等待',
        icon: 'loading',
        duration: 2000
      })
      wx.cloud.uploadFile({
        cloudPath:'test'+Math.round(Math.random()*1000)+'.jpg',
        filePath:_this.data.image_src,
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
    },
    fail({errMsg}) {
      console.log('chooseImage fail, err is', errMsg)
      let empty='empty'
      let file='file_id'
      let before_file='before_file_id'
      _this.setData({
        [empty]:true,
        [file]:"",
        [before_file]:""
      })
      wx.showToast({
        title: '上传失败',
        icon: 'loading',
        duration: 1000
      })
    }
  });
},
submitted: function submitted(e) {
  if(this.data.file_id==this.data.before_file_id){
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
    console.log(this.data.file_id)
    let that = this
    wx.cloud.callFunction({
      name:"add_expression",
      data:{
        request:"add_picture",
        data1:"test002",
        data2:this.data.time,
        data3:this.data.labels
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
        data2:that.data.file_id,
        data3:this.data.labels
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
            url: 'index',
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
  /*
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  }
})