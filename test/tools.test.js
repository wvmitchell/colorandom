const { 
  makeColor, 
  makeHex,
  makePalette } = require('../src/tools.js')

describe('makeHex', () => {
  test('returns css hex from low nums', () => {
    expect(makeHex(0, 1, 2, 4, 6, 8)).toBe('012468')
  })

  test('returns css hex from high nums', () => {
    expect(makeHex(10, 11, 2, 14, 15, 12)).toBe('AB2EFC')
  })
})

describe('makeColor', () => {
  beforeEach(() => {
    jest.spyOn(global.Math, "random").mockReturnValue(1)
  })

  test('it should return an object with the color', () => {
    expect(makeColor().hex).toBe('#FFFFFF')
  })

  test('it should return an unlocked color', () => {
    expect(makeColor().locked).toBe(false)
  })
})

describe('makePalette', () => {
  beforeEach(() => {
    jest.spyOn(global.Math, "random").mockReturnValue(1)
  })

  test('it should contain a 5 element color array', () => {
    expect(makePalette().colors.length).toBe(5)
  })

  test('it should have an id', () => {
    expect(makePalette().id).toBeTruthy()
  })

  test('every element should have a hex', () => {
    const palette = makePalette()
    const codesAllPresent = palette.colors.every(color => color.hex == '#FFFFFF')

    expect(codesAllPresent).toBe(true)
  })

  test('every color in the palette should be unlocked', () => {
    const palette = makePalette()
    const allUnlocked = palette.colors.every(color => color.locked == false)

    expect(allUnlocked).toBe(true)
  })
})
