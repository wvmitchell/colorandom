const app = require('../src/index.js')

describe('app', () => {
  let runningApp

  beforeEach(() => {
    runningApp = app()
  })

  describe('working with the current palette', () => {
    test('it has a currentPalette after loading', () => {
      const palette = runningApp.currentPalette()
      expect(palette.colors.length).toBe(5)
      expect(palette.colors[0].hex).toBeTruthy()
      expect(palette.colors[0].locked).toBe(false)
    })

    test('it can create a new palette', () => {
      const initialPalette = runningApp.currentPalette()
      runningApp.createPalette()
      const newPalette = runningApp.currentPalette()
      expect(initialPalette.id).not.toBe(newPalette.id)
    })

    test('it cannot lock a color with an invalid index', () => {
      runningApp.toggleLock(9)
      const palette = runningApp.currentPalette()

      const allColorsUnlocked = palette.colors.every(c => c.locked = false)
    })

    test('it can lock the color of an index', () => {
      runningApp.toggleLock(0)
      const palette = runningApp.currentPalette()

      expect(palette.colors[0].locked).toBe(true)
    })

    test('it can create a new palette but keep locked colors', () => {
      const lockedIndex = 0
      const initalPalette = runningApp.currentPalette()
      const firstHex = initalPalette.colors[lockedIndex].hex
      runningApp.toggleLock(lockedIndex)
      runningApp.createPalette()
      const newPalette = runningApp.currentPalette()
      const secondHex = newPalette.colors[lockedIndex].hex

      expect(initalPalette.id).not.toBe(newPalette.id)
      expect(firstHex).toBe(secondHex)
    })
  })

  describe('working with palettes', () => {
    test('it should have no saved palettes by default', () => {
      const savedPalettes = runningApp.savedPalettes()
      expect(savedPalettes.length).toBe(0)
    })

    test('it should be able to save a palette', () => {
      runningApp.savePalette()
      const savedPalettes = runningApp.savedPalettes()
      expect(savedPalettes.length).toBe(1)
    })

    test('it should not save palettes with the same id', () => {
      runningApp.savePalette()
      runningApp.savePalette()
      const savedPalettes = runningApp.savedPalettes()
      expect(savedPalettes.length).toBe(1)
    })

    test('it should be able to save multiple palettes', () => {
      runningApp.savePalette()
      runningApp.createPalette()
      runningApp.savePalette()
      const savedPalettes = runningApp.savedPalettes()
      expect(savedPalettes.length).toBe(2)
    })

    test('it should not be able to load a bad id palette', () => {
      runningApp.savePalette()
      runningApp.createPalette()

      const currentPalette = runningApp.currentPalette()

      runningApp.loadPalette('a bad id')

      const currentPaletteAfterLoad = runningApp.currentPalette()

      expect(currentPalette.id).toBe(currentPaletteAfterLoad.id)
    })

    test('it should be able to load a palette', () => {
      runningApp.savePalette()
      runningApp.createPalette()

      const savedPalette = runningApp.savedPalettes()[0]
      const currentPaletteBeforeLoad = runningApp.currentPalette()

      runningApp.loadPalette(savedPalette.id)

      const currentPaletteAfterLoad = runningApp.currentPalette()

      expect(savedPalette.id).toBe(currentPaletteAfterLoad.id)
    })

    test('it should be able to delete a saved palette by id', () => {
      runningApp.savePalette()
      runningApp.createPalette()
      runningApp.savePalette()

      let savedPalettes = runningApp.savedPalettes()
      const savedId = savedPalettes[0].id

      expect(savedPalettes.length).toBe(2)
      runningApp.deleteSavedPalette(savedId)
      expect(runningApp.savedPalettes().length).toBe(1)
    })

    test('it should not delete anything if the id is not present', () => {
      runningApp.savePalette()
      runningApp.deleteSavedPalette('bad id')
      expect(runningApp.savedPalettes().length).toBe(1)
    })
  })
})
