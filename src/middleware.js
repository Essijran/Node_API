const add = (a, b) => {
  if (Number.isNaN(a) || Number.isNaN(b)) return 'error'
  return a + b
}

module.exports = { add }
