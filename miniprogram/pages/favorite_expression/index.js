//index.js
const app = getApp()

Page({
  data: {
    images:[
      {
        image_address:'../../images/1.jpg',
        image_name:"月球"
      },
      {
        image_address:'../../images/2.jpg',
        image_name:"LTE"
      },
      {
        image_address:'../../images/1.jpg',
        image_name:"aaa"
      },
      {
        image_address:'../../images/1.jpg',
        image_name:"aaa"
      },
      {
        image_address:'../../images/1.jpg',
        image_name:"aaa"
      },
    ],
    classes:['人物','动漫','动物']
  },
  previewImage: function (e){
    wx.showActionSheet({
      itemList: ['分享','保存','收藏'],//显示的列表项
         success: function (res) {//res.tapIndex点击的列表项
            console.log("点击了列表项：" + that[res.tapIndex])
         },
         fail: function (res) { },
         complete:function(res){ }
    });
  },
  time_order(){
    this.setData({images:[
      {
        image_address:'../../images/1.jpg',
        image_name:"月球"
      },
      {
        image_address:'../../images/2.jpg',
        image_name:"LTE"
      },
      {
        image_address:'../../images/1.jpg',
        image_name:"aaa"
      },
      {
        image_address:'../../images/1.jpg',
        image_name:"aaa"
      }
    ]})
  },
  freq_order(){
    this.setData({images:[
      {
        image_address:'../../images/1.jpg',
        image_name:"月球"
      },
      {
        image_address:'../../images/2.jpg',
        image_name:"LTE"
      },
      {
        image_address:'../../images/1.jpg',
        image_name:"aaa"
      },
      {
        image_address:'../../images/1.jpg',
        image_name:"aaa"
      }
    ]})
  },
  bindPickerChange: function (e) {   
    var index = this.data.index    //记得要声明的，不然打印是undifind    
    console.log('picker发送选择改变，携带下标为', e.detail.value)    
    console.log('picker发送选择改变，携带值为', this.data.array[index])
  },

})
