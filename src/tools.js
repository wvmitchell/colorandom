const makeColor = () => {
  const nums = [...Array(6)].map(() => {
    return Math.floor(Math.random() * 15)
  })

  return {
    hex: `#${makeHex(...nums)}`,
    locked: false,
  }
}

const makeHex = (...nums) => {
  return nums.map(num => (num).toString(16)).join('').toUpperCase()
}

const makePalette = (currentPalette) => {
  let newColors
  if(currentPalette) {
    newColors = currentPalette.colors.reduce((colors, color) => {
      if (!color.locked) {
        return [...colors, makeColor()]
      } else {
        return [...colors, color]
      }
    }, [])
  } else {
    newColors = [...Array(5)].map(makeColor)
  }

  return {
    id: Math.floor(Date.now() * Math.random()),
    colors: newColors,
  }
}

//module.exports = {
//  makeColor,
//  makeHex,
//  makePalette,
//}
