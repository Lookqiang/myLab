const a = 10

console.log(Promise.resolve(a).then(res=>{
 Promise.reject('Whatever')
}))