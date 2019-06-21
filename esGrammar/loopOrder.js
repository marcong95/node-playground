function fn(i, j, k) {
  // do stuff
}

function test(ii, jj, kk) {
  const timerName = [ii, jj, kk].join(' ')
  console.time(timerName)
  for (let i = 0; i <= ii; i++) {
    for (let j = 0; j <= jj; j++) {
      for (let k = 0; k <= kk; k++) {
        fn(i, j, k);
      }
    }
  }
  console.timeEnd(timerName)
}

// test(2, 3, 4)
test(10, 100, 1000)
test(100, 100, 10)
