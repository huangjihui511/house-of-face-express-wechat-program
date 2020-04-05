# house-of-face-express-wechat-program

## 工作流程

每个开发者创建一个分支，并且在自己的分支中即使push方便大家学习交流，并且利于观察开发进度。比如

```shell
git branch hjh
git checkout hjh
coding...
git push -u origin hjh：hjh
```

1.提交文件至缓存:`git add file/folder`
2.提交文件至版本库:`git commit -m "description"`
3.本地新建分支:`branch_name:git branch branch_name`
4.切换到新建分支:`git checkout branch_name`
5.提交本地分支到云端:`git push -u origin branch_name:cloud_branch_name`
6.切换到主分支:` git checkout master`

## 开发计划

#### 阿尔法0.1版本（4.4——4.6）

**目的：**熟悉开发环境，实现部分基础功能

**功能：**实现app的运行功能包括，用户认证，发送表情

前端：

1. 页面1：页面上显示用户收藏的表情，点击出现分享按钮，支持分享到指定的聊天中
2. 对于第一次使用的用户通过微信的接口生成用户的唯一id
3. 对于再次使用的用户直接显示页面1

后端：

- 模型：
  1. 表情模型：表情id，表情描述的**容器**
  2. 用户模型：包含用户的id，收藏表情的**容器**（代表图片id的字符串）
- 接口：
  1. 表情文件压缩生成表情id，并以id为文件名保存
  2. 通过表情id获取表情
  3. 把表情添加给用户
  4. 把表情从用户删除
  5. 通过用户id获得其收藏的表情容器
- 帮助
  - [云开发](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)
  - [演示小程序](https://github.com/wechat-miniprogram/miniprogram-demo)

##### 前端分工：

G：小程序的整体UI，大的框架

P：表情部分的UI

H：用户的配置

##### 后端分工：

Y：通过云数据库上传下载功能

L：文件的压缩命名，500kb

Z：用户和表情相关的接口

##### 下次开会4.6 晚7点