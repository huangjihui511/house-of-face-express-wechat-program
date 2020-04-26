// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:"project-database-v58ji"
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  var docid = event.data1
  var vdata1 = event.data2

  try {
    return await db.collection('expression').doc(docid).update({
      data:{
        description:vdata1
      }
    })
  } catch(e) {
    console.log(e)
  }
}