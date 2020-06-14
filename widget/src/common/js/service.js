import url from './api.js'
import fet from './fetch.js'

class Pdd{
  static getPddOrderList(type,userId){
    console.log('我执行了吗')
    return fet(url.getPddOrderList,{
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: "type=" + type + "&userId=" + userId
    })
  }
}
export default Pdd;