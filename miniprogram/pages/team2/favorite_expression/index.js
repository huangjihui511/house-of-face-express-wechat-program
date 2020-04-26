//index.js
//删除
const db = wx.cloud.database()
const app = getApp()
function add(a,b){
return a+b
}
Page({
  data: {
    kind:"",
    divline_freq_color:"rgb(179, 175, 175)",
    divline_kind_color:"rgb(179, 175, 175)",
    freq_color:"rgb(179, 175, 175)",
    kind_color:"rgb(179, 175, 175)",
    all_select:"",
    selected:"",
    select_text:"选择",
    button_select:false,
    freq1:[],
    label1:[],
    images_src1 : [],
    images_srcs:[],
    labels:[[]],
    freqs:[],
    images_view_srcs:[],
    can_delete_selected:[],
    delete_selected:[],
    classes:['全部','公开','未公开','label2','label3','label4','label5','label6','label7']
  },
  bindPickerChange: function (e) {
    let temp_divline_freq_color="divline_freq_color"
    let temp_divline_kind_color="divline_kind_color"
    let temp_freq_color="freq_color"
    let temp_kind="kind"   
    let temp_kind_color="kind_color"
    this.setData({
      [temp_divline_freq_color]:"rgb(179, 175, 175)",
      [temp_freq_color]:"rgb(179, 175, 175)",
      [temp_divline_kind_color]:"rgb(76, 196, 126)",
      [temp_kind]:this.data.classes[e.detail.value],
      [temp_kind_color]:"black",
    })
    console.log('picker发送选择改变，携带下标为', e.detail.value)    
    console.log('picker发送选择改变，携带值为', this.data.classes[e.detail.value])
    this.label_select(this.data.classes[e.detail.value])
  },
    onShow: async function () {
    var freq1=[];
    var label1=[];
    var images_src1=[];
    var delete_selected_temp=[];
    var can_delete_selected_temp=[];
    var res = await wx.cloud.callFunction({
      name:"add_expression",
      data:{
        request:"get_set",
        data1:app.globalData.open_id,
      }
    })
    console.log(res)
    var num 
    if((res.result.data[0]==undefined)||(res.result.data[0].expression_set==undefined)){
      num=0
    }
    else{
      num = res.result.data[0].expression_set.length
    }
    for (var i = 0; i < num; i++) {
      freq1[i] = res.result.data[0].expression_set[i].times
      label1[i] = res.result.data[0].expression_set[i].tags
      images_src1[i] = res.result.data[0].expression_set[i].file_id
      delete_selected_temp[i]=false
      can_delete_selected_temp[i]=false
    }
    
    console.log(images_src1)
    let temp_view_src = "images_view_srcs"
    let temp_src = "images_srcs"
    let temp_label = "labels"
    let temp_freq="freqs"
    let temp_delete_selected="delete_selected"
    let temp_can_delete_selected="can_delete_selected"
    this.setData({
      [temp_view_src]: images_src1,
      [temp_src]: images_src1,
      [temp_label]: label1,
      [temp_freq]: freq1,
      [temp_delete_selected]: delete_selected_temp,
      [temp_can_delete_selected]:can_delete_selected_temp
    })
  },
  freq_order(){
    if(this.data.button_select==true){
      console.log("已禁用")
      return;
    }
    var freq=this.data.freqs
    var src=this.data.images_srcs
    var label=this.data.labels
    var k
    var temp
    for(var i=1; i<freq.length; i++){
      for(var j=0; j<freq.length-i; j++){
        if(freq[j]>freq[j+1]){
          freq[j]=[freq[j+1],freq[j+1]=freq[j]][0];
          src[j]=[src[j+1],src[j+1]=src[j]][0];
          temp=[]
          for(k=0;k<label[j].length;k++){
            temp[k]=label[j][k]
          }
          for(k=0;k<label[j+1].length;k++){
            label[j][k]=label[j+1][k]
          }
          for(k=0;k<temp.length;k++){
            label[j+1][k]=temp[k]
          }
        }
      }
     }
     
    let temp_kind="kind"   
    let temp_kind_color="kind_color"
    this.setData({
      [temp_kind]:"",
      [temp_kind_color]:"rgb(179, 175, 175)",
    })
    let temp_divline_freq_color="divline_freq_color"
    let temp_divline_kind_color="divline_kind_color"
    let temp_freq_color="freq_color"
    let temp_view_src = "images_view_srcs"
    let temp_src = "images_srcs"
    let temp_label = "labels"
    let temp_freq="freqs"
    this.setData({
      [temp_src]: src,
      [temp_view_src]: src,
      [temp_label]: label,
      [temp_freq]: freq,
      [temp_freq_color]:"black",
      [temp_divline_kind_color]:"rgb(179, 175, 175)",
      [temp_divline_freq_color]:"rgb(76, 196, 126)"
    })
    console.log(this.data.freq_color)
  },
  delete_or_previewImage: function (e){
    if(this.data.can_delete_selected[e.currentTarget.dataset.index]==true){
      let temp_select_number="select_number"
      let temp_all_select="all_select"
      var count=0
      var i
      console.log(e)
      console.log(e.currentTarget.dataset.index)
      console.log(this.data.delete_selected[0])
      let temp_delete_selected="delete_selected["+e.currentTarget.dataset.index+"]"
      this.setData({
        [temp_delete_selected]:!this.data.delete_selected[e.currentTarget.dataset.index]
      })
      for(i=0;i<this.data.delete_selected.length;i++){
        if(this.data.delete_selected[i]==true){
          count++
        }
      }
      this.setData({
        [temp_all_select]:"全选",
        [temp_select_number]:"已选择"+count+"张图片"
      })
      console.log(this.data.delete_selected[e.currentTarget.dataset.index])
    }
    else{
      //setTimeout(function () {},1000)
      
      wx.showToast({
        title: '长按图片可转发',
        icon: 'loading',
        duration: 1000
      })
      console.log(e.currentTarget.dataset.srcs)
      wx.previewImage({
        current: e.currentTarget.dataset.src, // 当前显示图片的https链接
        urls: e.currentTarget.dataset.srcs, // 需要预览的图片https链接列表
      })
      
    }
  },
  forward(a,b){
    wx.showToast({
      title: '长按图片可转发',
      icon: 'loading',
      duration: 1000
    })
    
    wx.previewImage({
      current: a, // 当前显示图片的https链接
      urls:b // 需要预览的图片https链接列表
    })
  },
  label_select(label){
    var src=this.data.images_srcs
    var labels=this.data.labels
    var temp_src=[]
    var j=0;
    var k
    let temp_view_src = "images_view_srcs"
    if(label=='全部'){
      this.setData({
        [temp_view_src]: this.data.images_srcs
      })
      return;
    }
    for(var i=0; i<labels.length; i++){
      for(k=0;k<labels[i].length;k++){
        if(labels[i][k].name==label){
          temp_src[j]=src[i];
          j++;
          break;
        }
      }
    }
    this.setData({
      [temp_view_src]: temp_src
    })
  },
  selected(){
    var i;
    var delete_selected_temp=[]
    var can_delete_selected_temp=[]
    let temp_select_text = "select_text"
    let temp_button_select = "button_select"
    let temp_delete_selected = "delete_selected"
    let temp_can_delete_selected="can_delete_selected"
    let temp_all_select="all_select"
    let temp_select_number="select_number"
    if(this.data.button_select==false){
      for(i=0;i<this.data.delete_selected.length;i++){
        can_delete_selected_temp[i]=true
        delete_selected_temp[i]=false
      }
      this.setData({
        [temp_all_select]:"全选",
        [temp_select_number]:"已选择0张图片",
        [temp_button_select]:true,
        [temp_select_text]:"取消",
        [temp_can_delete_selected]:can_delete_selected_temp,
        [temp_delete_selected]:delete_selected_temp
      })

    }
    else{
      for(i=0;i<this.data.delete_selected.length;i++){
        can_delete_selected_temp[i]=false
        delete_selected_temp[i]=false
      }
      this.setData({
        [temp_all_select]:"",
        [temp_select_number]:"",
        [temp_button_select]:false,
        [temp_select_text]:"选择",
        [temp_can_delete_selected]:can_delete_selected_temp,
        [temp_delete_selected]:delete_selected_temp
      })
    }
  },
 more_information(e){
   let _this=this
   console.log(e)
    wx.showActionSheet({
      itemList: ['编辑','转发'],//显示的列表项
         success: function (res) {//res.tapIndex点击的列表项
            console.log("点击了列表项：" + res.tapIndex)
            if(res.tapIndex==0){
              console.log("000000000000")
              wx.reLaunch({
                url: '../../edit_functions/edit_functions?src='+e.currentTarget.dataset.src,
              })
            }
            else if(res.tapIndex==1){
              console.log("111111111")
              _this.forward(e.currentTarget.dataset.src,e.currentTarget.dataset.srcs)
            }
         },
         fail: function (res) { },
         complete:function(res){ }
    });
  },
  delete(){
    var i;
    for(i=0;i<this.data.delete_selected.length;i++){
      if(this.data.delete_selected[i]==true){
        //调用云函数删除
        wx.cloud.callFunction({
          name:"add_expression",
          data:{
            request:"sub_expression",
            data1:app.globalData.open_id,
            data2:this.data.images_view_srcs[i]
          }
        })
        console.log("删除"+i)
        console.log(this.data.images_view_srcs[i])
      }
    }
    wx.showToast({
      title: '删除成功',
      icon: 'loading',
      duration: 1000,
      success(data) {
        setTimeout(function () {
          wx.reLaunch({url: './index'})
        }, 1000) //延迟时间
      }
    })
  },
  all_select(){
    var i;
    let temp_delete_selected="delete_selected"
    var delete_seleted_temp=[]
    let temp_all_select="all_select"
    let temp_select_number="select_number"
    if(this.data.all_select=='全选'){
      for(i=0;i<this.data.delete_selected.length;i++){
        delete_seleted_temp[i]=true
      }
      this.setData({
        [temp_delete_selected]:delete_seleted_temp,
        [temp_select_number]:"已选择"+this.data.images_view_srcs.length+"张图片",
        [temp_all_select]:"全不选"
      })
    }
    else{
      for(i=0;i<this.data.delete_selected.length;i++){
        delete_seleted_temp[i]=false
      }
      this.setData({
        [temp_delete_selected]:delete_seleted_temp,
        [temp_select_number]:"已选择0张图片",
        [temp_all_select]:"全选"
      })
    }
  }
})
