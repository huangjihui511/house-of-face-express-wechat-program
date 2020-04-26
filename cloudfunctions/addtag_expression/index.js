// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:"project-database-v58ji"
})
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  var id = event.data1
  var tag1 = event.data2

  try {
    return await db.collection('expression').where({
      _id:id
    }).update({
      data:{
        tags:_.push([{name:tag1,num: 0}])
      },
    })
  } catch (e) {
    console.log(e)
  }
}