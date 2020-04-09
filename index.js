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
        image_address:'../../images/2.PNG',
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
 /* getaddress() {
    wx.request({      
      url: app.globalData.url,        
      header: {       
       'content-type': 'application/json'   
      },      
      method:POST,  //请求方式    
      data:{},  //用于存放post请求的参数 
      success(res) {       
        this.setData({         
          images_address: res.data.data        
        })      
      }   
    })  
  },
  onLoad: function (options) {    
    this.getaddress(); 
  }//第一次出现该页面时会调用该函数*/
})
