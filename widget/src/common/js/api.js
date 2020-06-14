let url = {
  getPddOrderList:'/app/getPddOrderList'
}

let host = 'http://47.97.153.221:8080'
// let host = 'http://10.0.0.21:8080'
for (const key in url) {
  if (url.hasOwnProperty(key)) {
    const element = url[key];
    url[key] = host + element
  }
}
export default url