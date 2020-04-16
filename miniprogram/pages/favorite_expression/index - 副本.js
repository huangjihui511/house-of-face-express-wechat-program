//index.js
const app = getApp()
function add(a,b){
return a+b
}
Page({
  data: {
    images_srcs:[],
    labels:[[]],
    freqs:[],
    images_view_srcs:[],
    classes:['label1','label2','label3','label4','label5','label6','label7']
  },
  bindPickerChange: function (e) {   
    console.log('picker发送选择改变，携带下标为', e.detail.value)    
    console.log('picker发送选择改变，携带值为', this.data.classes[e.detail.value])
    this.label_select(this.data.classes[e.detail.value])
  },
  onShow: function () {
    //从数据库获取信息images_src1[],label1[[]],freq1[]
    var images_src1=["../../images/coin_logo.jpg","../../images/1.jpg","../../images/2.jpg"]
    var label1=[["label1","label2","label3"],["label1","label2"],["label2","label3"]]
    var freq1=[1,3,2]
    

    let temp_view_src = "images_view_srcs"
    let temp_src = "images_srcs"
    let temp_label = "labels"
    let temp_freq="freqs"
    this.setData({
      [temp_src]: images_src1
    })
    this.setData({
      [temp_view_src]: images_src1
    })
    this.setData({
      [temp_label]: label1
    })
    this.setData({
      [temp_freq]: freq1
    })
  },
  freq_order(){
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
    let temp_view_src = "images_view_srcs"
    let temp_src = "images_srcs"
    let temp_label = "labels"
    let temp_freq="freqs"
    this.setData({
      [temp_src]: src
    })
    this.setData({
      [temp_view_src]: src
    })
    this.setData({
      [temp_label]: label
    })
    this.setData({
      [temp_freq]: freq
    })
    console.log(src)
    console.log(freq)
  },
  previewImage: function (e){
    console.log(e.currentTarget.dataset.srcs)
    wx.previewImage({
      current: e.currentTarget.dataset.src, // 当前显示图片的https链接
      urls: e.currentTarget.dataset.srcs // 需要预览的图片https链接列表
    })
  },
  label_select(label){
    var src=this.data.images_srcs
    var labels=this.data.labels
    var temp_src=[]
    var j=0;
    var k
    for(var i=0; i<labels.length; i++){
      for(k=0;k<labels[i].length;k++){
        if(labels[i][k]==label){
          temp_src[j]=src[i];
          j++;
          break;
        }
      }
    }
    let temp_view_src = "images_view_srcs"
    this.setData({
      [temp_view_src]: temp_src
    })
  }
})
