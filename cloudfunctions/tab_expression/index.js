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
  var names1 = event.data2

  for (var i = 0; i < names1.length; i++) {
    try {
      await db.collection('expression').where({
        _id:id,
        'tags.name':names1[i]
      }).update({
        data:{
          'tags.$.num':_.inc(1)
        },
      })
    } catch (e) {
      console.log(e)
    }
  }
}