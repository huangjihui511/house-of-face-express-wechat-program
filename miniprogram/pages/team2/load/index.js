// pages/contect/contect.js
var app=getApp()
wx.cloud.init({
  env:"project-database-v58ji",traceUser:true
})
const db = wx.cloud.database()
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
data: {
  check:true,
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
    {title:"开心",selected:false},
    {title:"祝福",selected:false},
    {title:"贫穷",selected:false},
    {title:"嘲讽",selected:false},
    {title:"羡慕",selected:false},
    {title:"生气",selected:false},
  ],
  labels:['未公开'],
  image_src:"",
  time:"",
  add_label_list:[],
  add_label_text:[],
  have_add_labels:[]
},
getinput(e){
  var _this=this
  let add_label_text="add_label_text["+e.currentTarget.id+"]"
  _this.setData({
    [add_label_text]:e.detail.value
  })
  console.log(this.data.add_label_text)
},
add_label(){
  var _this=this
  let add_label="add_label_list["+this.data.add_label_list.length+"]"
  let add_label_text="add_label_text["+this.data.add_label_list.length+"]"
  _this.setData({
    [add_label]:true,
    [add_label_text]:""
  })
},
two2one(a) {
  let _this = this
  let that = this
  var imgs = ['',"../../../images/team2/code.jpg"]
      imgs[0]=a
      console.log(imgs[0])
      const ctx = wx.createCanvasContext("myCanvas", _this)
      var imgH1,imgW1,imgH2,imgW2,imgPath1,imgPath2
      
      wx.getImageInfo({
        src: imgs[0],
        success: function(res) {
          imgW1 = res.width
          imgH1 = res.height
          imgPath1 = res.path
          wx.getImageInfo({
            src: imgs[1],
            success: function(res) {
              imgW2 = res.width
              imgH2 = res.height
              imgPath2 = res.path
              that.setData({
                canvasHeight: imgH1+imgH2/imgW2*imgW1,
                canvasWidth: imgW1
              })
              ctx.drawImage(imgPath1, 0, 0, imgW1, imgH1)
              ctx.drawImage(imgPath2, 0, imgH1, imgW1, imgH2/imgW2*imgW1)
              let canvasHeight="canvasHeight"
              let canvasWidth="canvasWidth"
              _this.setData({
                [canvasHeight]:imgH1+imgH2/imgW2*imgW1,
                [canvasWidth]:imgW1
              })
              ctx.draw()
              console.log(ctx)
              setTimeout(() => {wx.canvasToTempFilePath({
                canvasId: 'myCanvas',
                success: function(res) {
                  console.log("合成的带有小程序码的图片success》》》", res.tempFilePath)
                  let image_src="image_src"
                  _this.setData({
                    [image_src]:res.tempFilePath
                  })
                  wx.cloud.uploadFile({
                    cloudPath:'test'+app.globalData.open_id+Math.round(Math.random()*100000)+'.jpg',
                    filePath:res.tempFilePath,
                    success: res => {
                      console.log("图片file_id", res)
                      const file1 = res.fileID
                      let file2 = "file_id"
                      _this.setData({
                        [file2]:file1,
                      })
                      if(_this.data.check==true){
                        wx.showToast({
                          title: '加载成功',
                          icon: "success",
                          duration: 1000
                        })
                      }
                    },
                    fail: console.error
                  })
                }
              })},1500)
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
chooseImage: async function chooseImage(e) {
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
      let buffer = wx.getFileSystemManager().readFileSync(res.tempFilePaths[0])
      wx.cloud.callFunction({
        name: 'imgCheck',
        data: {
          value:buffer
        },
        success(res){
          console.log("检测结果", res);
          if (res.result.errCode != 0) {
           wx.showToast({
             icon: 'none',
             title: '图片含有违法信息，请换张图片',
             duration: 1000,
           })
           _this.setData({
             check:false
           })
           setTimeout(function () {
            wx.redirectTo({
              url: 'index',
            })
          }, 1000)
          }
        },
        fail(res){
          console.log("错误"+res)
        }
      })
      let empty='empty'
      let cu_time="time"
      _this.setData({
        [empty]:false,
        [cu_time]:new Date()
      })
      _this.two2one(res.tempFilePaths[0])
      wx.showToast({
        title: '加载中',
        icon: 'loading',
        duration: 10000000
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
  if(this.data.file_id==""){
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
    var temp_add_label_text=[]
    var add_label_text_temp=[]
    var temp1=[]
    var ii
    var kk=0
    var jj
    for(ii=0;ii<(this.data.add_label_text.length);ii++){
      if(this.data.add_label_text[ii]!=""){
        temp1[kk]=this.data.add_label_text[ii]
        kk++
      }
    } 
    console.log("去空"+temp1)
    kk=0
    for(ii=0;ii<(temp1.length-1);ii++){
      for(jj=ii+1;jj<temp1.length;jj++){
        if(temp1[ii]==temp1[jj]){
          break;
        }
      }
      if(jj==temp1.length){
        add_label_text_temp[kk]=temp1[ii]
        kk++
      }
    }
    if(temp1.length!=0){
      add_label_text_temp[kk]=temp1[ii]
    }
    console.log("去重"+add_label_text_temp)
    kk=0
    for(ii=0;ii<add_label_text_temp.length;ii++){
      if(add_label_text_temp[ii]!=""){
        console.log(ii+add_label_text_temp[ii])
        for(jj=0;jj<this.data.have_add_labels.length;jj++){
          if(add_label_text_temp[ii]==this.data.have_add_labels[jj]){
            break;
          }
        }
        if(jj!=this.data.have_add_labels.length){
          continue
        }
        temp_add_label_text[kk]=add_label_text_temp[ii]
        kk++
      }
    }
    console.log("去已经有的"+temp_add_label_text)
    wx.cloud.callFunction({
      name: "add_label",
      data:{
        id:app.globalData.open_id,
        label:temp_add_label_text
      }
    })
    wx.cloud.callFunction({
      name: "add_exp",
      data:{
        id:app.globalData.open_id,
        incNum:10
      }
    })
    
    //传回参数
    console.log(this.data.image_src)
    console.log(this.data.labels)
    var public1=false
    console.log(this.data.time)
    console.log(this.data.file_id)
    let that = this
    var j
    var temp=new Array()
    for(ii=0;ii<add_label_text_temp.length;ii++){
      temp.push({name:add_label_text_temp[ii],num:0})
    }
    console.log(temp)
    for(j=0;j<this.data.labels.length;j++){
      temp.push({name:this.data.labels[j],num:0})
      if(this.data.labels[j]=="公开"){
        public1=true
      }
    }
    console.log(app.globalData.open_id)
    wx.cloud.callFunction({
      name:"add_expression",
      data:{
        request:"add_picture",
        data1:this.data.time,
        data2:app.globalData.open_id,
        data3:"test002",
        data4:this.data.file_id,
        data5:public1
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
        data1:app.globalData.open_id,
        data2:that.data.file_id,
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
  onShow:async function () {
    var _this=this
    var res =await wx.cloud.callFunction({
      name:"get_label",
      data:{
        id:app.globalData.open_id,
      }
    })
    console.log(res)
    if(res.result.data[0].labels!=undefined){
      _this.setData({
        have_add_labels:res.result.data[0].labels
      })
    }
    console.log(this.data.have_add_labels)
    console.log(app)
    console.log(app.globalData.open_id)
    var res = await wx.cloud.callFunction({
      name:"add_expression",
      data:{
        request:"get_set",
        data1:app.globalData.open_id,
      }
    })
    console.log(res)
    console.log(app.globalData.max_exp)
    var cur_size
    if((res.result.data[0]==undefined)||(res.result.data[0].expression_set==undefined)){
      cur_size=0
    }
    else{
      cur_size=res.result.data[0].expression_set.length
      console.log(res.result.data[0].expression_set.length)
    }
    var res = await wx.cloud.callFunction({
      name: "get_exp",
      data:{
        id:app.globalData.open_id
      }
    })
    console.log("exp",res.result.data[0].exp)
    if(cur_size>=res.result.data[0].exp){
      wx.showToast({
        title: '经验不足',
        icon: 'loading',
        duration: 2000
      })
      setTimeout(function () {
        wx.redirectTo({
          url: '../../mark_expression/mark_expression',
        })
      }, 1000) 
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
  /*
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  }
})