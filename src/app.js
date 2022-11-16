//const { makePalette } = require('./tools.js')

const app = () => {
  let current = makePalette()
  let saved = []

  const setCurrent = (value) => {
    current = value
  }

  const getCurrent = () => {
    return current
  } 

  const setSaved = (value) => {
    saved = value
  }

  const getSaved = () => {
    return saved
  }

  const createPalette = () => {
    const currentPalette = getCurrent()
    setCurrent(makePalette(currentPalette))
  }

  const currentPalette = () => {
    return getCurrent()
  }

  const deleteSavedPalette = (id) => {
    const newPalettes = getSaved().reduce((newSaved, palette) => {
      if(id != palette.id) {
        return [...newSaved, palette]
      }
      return newSaved
    }, [])
    setSaved(newPalettes)
  }

  const loadPalette = (id) => {
    const foundPalette = getSaved().find(palette => palette.id == id)
    if(foundPalette) {
      setCurrent({...foundPalette})
    }
  }

  const savePalette = () => {
    const idNotInSaved = getSaved().every(palette => palette.id != current.id)
    if(idNotInSaved) {
      setSaved([...saved, current])
    }
  }

  const savedPalettes = () => {
    return getSaved()
  }

  const toggleLock = (index) => {
    if(index >= 0 && index <=5) {
      const currentPalette = getCurrent()
      currentPalette.colors[index].locked = !currentPalette.colors[index].locked
      setCurrent({...currentPalette})
    }
  }

  return {
    createPalette,
    currentPalette,
    deleteSavedPalette,
    loadPalette,
    savePalette,
    savedPalettes,
    toggleLock,
  }
}

//module.exports = app
