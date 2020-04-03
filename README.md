# house-of-face-express-wechat-program

## 工作流程

每个开发者创建一个分支，并且在自己的分支中即使push方便大家学习交流，并且利于观察开发进度

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