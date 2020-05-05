// pages/contect/contect.js
//只需传给页面地址
wx.cloud.init({
  env:"project-database-v58ji"
})
var app = getApp();
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
  else{    var temp_add_label_text=[]
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
    //传回参数
    console.log(this.data.image_src)
    console.log(this.data.labels)
    console.log(this.data.time)
    let that = this
    var j
    var public1=false
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
    console.log(temp)
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
          wx.reLaunch({
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
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000000 
    })
    var _this=this
    wx.cloud.callFunction({
      name:"get_label",
      data:{
        id:app.globalData.open_id,
      },
      success(res){
        console.log(res)
        if(res.result.data[0].labels!=undefined){
          _this.setData({
            have_add_labels:res.result.data[0].labels
          })
        }
        console.log("111111"+_this.data.have_add_labels)
      }
    })
    console.log(this.options.src)
    /*wx.cloud.callFunction({
      name:"add_expression",
      data:{
        request:"sub_expression",
        data1:app.globalData.open_id,
        data2:this.options.src
      }
    })
    wx.cloud.downloadFile({
      fileID: this.options.src,
      success(result) {
      }
    })*/
    
    let temp_src="image_src"
    var src=this.options.src
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
          title: '加载成功',
          icon: "success",
          duration: 1000
        })
      },
      fail: console.error
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