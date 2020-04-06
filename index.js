//index.js
const app = getApp()
var imageCount;
imageCount = 0;

Page({
  data: {  
    images: []
  },
  upload: function(){  
    const db = wx.cloud.database()
    wx.chooseImage({    
      count: 1,//数量为1个    
      sizeType: ['original', 'compressed'],//选择原图或压缩后的图片
      sourceType: ['album', 'camera'],//选择访问相册、相机    
      success(res) {      // tempFilePath可以作为img标签的src属性显示图片      
        const tempFilePaths = res.tempFilePaths      
        wx.cloud.uploadFile({        
          cloudPath: new Date().getTime() + '.png',        
          filePath: tempFilePaths[0], // 文件路径是数组，取第一个        
          success: res => {          // get resource ID          
            db.collection('images').add({           
              data:{              
                fileID: res.fileID            
              }          
            }).then(res => {            
              console.log(res);          
            }).catch(err => {            
              console.log(err)          
            })        
          },        
          fail: err => {          // handle error        
          
          }      
        })    
      }  
    })
  },

  downloadFile: function (e) {
    const db = wx.cloud.database()
    wx.cloud.downloadFile({    
      fileID: e.target.dataset.fileid,  
    }).then(res => {    
      // get temp file path    
      //保存图片到手机相册    
      wx.saveImageToPhotosAlbum({      
        filePath: res.tempFilePath,      
        success(res) {         
          wx.showToast({          
            title: '保存成功',        
          })      
        }    
      })  
    }).catch(error => {    
      // handle error  
    })
  },

  getFile: function(){  
    const db = wx.cloud.database()
    //使用云函数获取openid  
    wx.cloud.callFunction({    
      name: 'login'  
    }).then(res=>{    
      db.collection('images').where({      
        _openid: res.result.openid    
      }).get().then(res2=>{      
        console.log(res2);      
        this.setData({        
          images: res2.data      
        })   
      })  
    })
  },
 
})
