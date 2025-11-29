const a = 10

Promise.resolve(a).then((res) => {
    Promise.reject(new Error(`错误了${res}`))
  }),
