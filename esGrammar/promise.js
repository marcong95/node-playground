Promise.reject(233)
  .then(data => {
    console.log('THEN1:', data)
    return 666
  })
  .catch(err => {
    console.error('CATCH:', err);
  })
  .then(data => {
    console.log('THEN2:', data)
  })
