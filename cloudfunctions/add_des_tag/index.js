// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:"alpha-project-bvqxh"
})

const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var request = event.request
  if (request == "get_des") {
    return await db.collection('expression')
    .orderBy('des_num', 'asc')
    .limit(2)
    .get()
  }
  if (request == "get_tag") {
    return await db.collection('expression')
    .orderBy('tag_num', 'asc')
    .limit(3)
    .get()
  }
  if (request == "add_des") {
    var id = event.id
    var des = event.des
    await db.collection("expression").where({
      id:id
    }).update({
      data: {
        des:_.push(des),
        des_num:_.inc(1)
      }
    })
  }
  if (request == "add_tag") {
    var id = event.id
    var tags = event.tags
    for (tag in tags) {
      await db.collection("expression").where({
        id:id
      }).update({
        data: {
          ["tags." + tags[tag]]:_.inc(1)
        }
      })
    }
  }
  if (request == "get_tags") {
    var id = event.id
    return await db.collection("expression").where({
      id:id
    })
    .get()
  }
  if (request == "get_url") {
    var id = event.id
    return await db.collection("expression").where({
      id:id
    })
    .get()
  }
}