const { makeColorHex } = require('../src/tools.js')

describe('makeColorHex', () => {
  test('returns css hex from low nums', () => {
    expect(makeColorHex(0, 1, 2, 4, 6, 8)).toBe('012468')
  })

  test('returns css hex from high nums', () => {
    expect(makeColorHex(10, 11, 2, 14, 15, 12)).toBe('012468')
  })
})
