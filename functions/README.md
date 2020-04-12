# 云函数的部署与调用

首先在cloudfunctions一栏创建云函数，创建完成后在该云函数目录下右键打开终端，在命令行下运行：

```
npm install --save wx-server-sdk@latest
```

在每部分云函数目录下的index.js类似的.js文件中插入代码

注意：

```
cloud.init({
  env:"program-byiln" //云开发控制台的环境id，需自行查看更改
})
```

在完成云函数代码部分后，右键该云函数目录：上传并部署所有文件即可部署在在云开发控制台。



## 云函数调用：

例如：

```
wx.cloud.callFunction({
      name:"tab_expression",
      data:{									//传入的参数
        data1:"dc65fe3e5e8aebae0043e35872a5fdbb",	//第一个参数
        data2:["job"]							//第二个参数
      },
      success:function(res){
        console.log("获取表情成功",res)
        //this.setData({
          //expression:res.result.data.description	//若需得到返回值，从res中取得，从下面的控制台信													//息也可看见返回值信息
        //})
      },fail:function(res){
        console.log("获取表情失败",res)
      }
    })
```

## 数据库信息

### expression

![微信图片_20200411204131](E:\wechat_program\functions\微信图片_20200411204131.png)

### user

![微信图片_20200411204156](E:\wechat_program\functions\微信图片_20200411204156.png)

### tag

![微信图片_20200411204152](E:\wechat_program\functions\微信图片_20200411204152.png)

### 云函数

### add_expression

传入用户id和表情描述，添加相关用户的表情集合

两个参数：data1:用户id(string), data2:表情描述(string)

### add_tag

传入标签名，给数据库添加新标签

一个参数：data1:标签名(string)

### addtag_expression

给表情添加新标签

两个参数:data1:表情id(string), data2:标签名(string)

### get_expression

根据表情的id得到该表情数据信息

参数：data1:表情id(string)

返回得到：数据库中该表情信息

### set_description

给表情添加描述

两个参数:data1:表情id(string),data2:描述信息(string)

### sub_expression

删除用户的相应表情描述

两个参数:data1:用户id(string),data2:表情描述(string)

### sub_tag

删除数据库中标签

一个参数:data1:标签名(string)

### tab_expression

给定表情和一组标签，给表情中相应标签的value值加1

两个参数:data1:表情id(string), data2:标签组(array)