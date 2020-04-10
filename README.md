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

##### 下次开会4.6 晚7点https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)



#### 阿尔法0.2版本（4.6——4.8）

前端：

1. 表情页面优化排版
2. 表情管理排序功能：时间，使用频率
3. 表情用户自己使1用tag分组
4. 表情商店的框架：搜索框，推荐表情，搜索热词
5. 上传表情的界面

后端：

##### 模型：

1. 表情模型增加一个字典，key就是标签(字符串)，value默认为0
2. 标签模型set，存放标签名(字符串)
3. 用户收藏表情容器使用字典，value是使用频率
4. 用户自己设置的tag，每个tag里面存放多个表情id

##### 接口：

1. 通过图片id返回图片url的接口
2. 封装完成上一次开发的接口并且和在前端能够调用
3. 生产图片的接口：输入一个图片文件和一段文本，能在图片指定位置添加指定大小的文本，并且把图片上传
4. 给图片写描述接口：输入一个图片的id和一段文本(表情描述)，保存
5. 给图片标记接口：
   1. 输入图片id，和几个标签
   2. 返回这个几个标签是否被选择
   3. 如果图片a中标签b被选择了，则在表情的相关标签数值加1。
6. 添加新标签，删除标签的接口
7. 给图片添加标签接口：输入为图片id和标签名
8. 本地到云端传送json
9. 尝试能否在云端进行计算

##### 分工：

G：4

P：1 2 3

H：5

##### 后端：

Y：1 8 9

L: 3 上次的

Z: 2 4 5 6 7

#### 下次4 10 晚上7点开会