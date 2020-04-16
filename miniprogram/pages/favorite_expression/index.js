//index.js
const db = wx.cloud.database()
const app = getApp()
function add(a,b){
return a+b
}
Page({
  data: {
    //res_file : [],
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
//var cloud_function=function(){
  //resolve(1)
	  /*wx.cloud.callFunction({
      name:"add_expression",
      data:{
        request:"get_set",
        data1:"42d70ff05e8ae3b9004ef2034422a16e",
        //data2:"cloud://program-byiln.7072-program-byiln-1301780420/test6.jpg"//["fun", "wdnmd"]
      },
      success:function(res){
        console.log("获取表情成功",res)
        //let src1 = "res_file"
        _this.setData({
          //[src1] : res.result.data[0].expression_set,
        })
        //console.log("返回信息", res.result.data[0].expression_set[0].file_id)
        resolve(res)
        //console.log(images_src1)
      },fail:function(res){
        console.log("获取表情失败",res)
      }
    })*/
  //},
  async onShow () {
    var _this = this,
    //var res_file = ""
    freq1 = [],
    label1 = [],
    images_src1=new Array()
    var res = await wx.cloud.callFunction({
      name:"add_expression",
      data:{
        request:"get_set",
        data1:"cloud://alpha-project-bvqxh.616c-alpha-project-bvqxh-1301841365/git.png",
        //data2:"cloud://program-byiln.7072-program-byiln-1301780420/test6.jpg"//["fun", "wdnmd"]
      }});
    console.log(res)
      //await api.showLoading() // 显示loading
      //await this.wx.cloud.callFunction()  // 请求数据
      //await api.hideLoading() // 等待请求数据成功后，隐藏loading
	
     var num = res.result.data[0].expression_set.length
        for (var i = 0; i < num; i++) {
          freq1[i] = res.result.data[0].expression_set[i].times
          label1[i] = res.result.data[0].expression_set[i].tags
          images_src1[i] = res.result.data[0].expression_set[i].file_id
          console.log("fuizhi", images_src1[i])
        } 
    //从数据库获取信息images_src1[],label1[[]],freq1[]
    var images_src2=["cloud://program-byiln.7072-program-byiln-1301780420/test00.jpg","cloud://program-byiln.7072-program-byiln-1301780420/test001.jpg","cloud://program-byiln.7072-program-byiln-1301780420/test002.jpg"]
    //var label1=[["label1","label2","label3"],["label1","label2"],["label2","label3"]]
    //var freq1=[1,3,2]
    await this.wx.cloud.callFunction()
    let temp_view_src = "images_view_srcs"
    let temp_src = "images_srcs"
    let temp_label = "labels"
    let temp_freq="freqs"
    console.log(images_src1)
    console.log(images_src2)
    this.setData({
      [temp_src]: images_src1
    })
    console.log("data:", this.data.images_srcs)
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
          for(k=0;k<label[i].length;k++){
            temp[k]=label[i][k]
          }
          for(k=0;k<label[j].length;k++){
            label[i][k]=label[j][k]
          }
          for(k=0;k<temp_label.length;k++){
            label[j][k]=temp[k]
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
