Promise.resolve(233)
  .then(data => {
    console.log(data)
    return 666
  })
  .catch(err => {
    console.error(err);
  })
  .then(data => {
    console.log(data)
  })
