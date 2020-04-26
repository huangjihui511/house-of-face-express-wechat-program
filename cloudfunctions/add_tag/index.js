// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:"project-database-v58ji"
})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  var name1 = event.data1

  try {
    return await db.collection('tag').add({
      data:{
        name:name1
      }
    })
  } catch(e) {
    console.log(e)
  }
}