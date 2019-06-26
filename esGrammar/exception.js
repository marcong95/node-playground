try {
  const nullVar = null
  // console.log(nullVar.map);
  console.log(nullVar.map())
} catch (e) {
  console.error(e.message)
  console.error(e.constructor.name)
  console.log(e instanceof TypeError)
  console.log(e instanceof Error)
}
