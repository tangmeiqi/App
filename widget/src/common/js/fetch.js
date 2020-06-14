function fet(url,data){
  return new Promise((resolve,reject)=>{
    fetch(url,data)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .then(json=>{
      resolve(json)
    })
    .catch(err=>{
      reject(err)
    })
  })
}
export default fet;