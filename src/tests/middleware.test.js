const { add } = require('../middleware')

describe('add()', () => {
  xit('should return 5 when a=2 and b=3', () => {
    const result = add(2, 3)
    expect(result).toEqual(5)
  })
  xit('should return an error when a is not a number', () => {
    const result = add('j', 4)
    expect(result).toEqual('error')
  })
})
