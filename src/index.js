const application = app()

// drawing functions
const draw = (mainPalette, savedPalettes, swatchSection, savedSection) => {
  swatchSection.innerHTML = ''
  savedSection.innerHTML = ''

  swatchSection.append(...drawPalette(mainPalette.colors))
  drawSavedPalettes(savedPalettes, savedSection)
}

const drawPalette = (colors) => {
  const squares = colors.map((color, index) => {
    const square = document.createElement('div')
    square.style.backgroundColor = color.hex
    square.dataset.index = index
    const lock = document.createElement('i')
    lock.classList.add("fa-solid", color.locked ? "fa-lock" :"fa-lock-open")
    square.append(lock)
    return square
  })
  return squares
}

drawSavedPalettes = (palettes, savedSection) => {
  const first = palettes[0]
  const tail = palettes.slice(1)

  if(!first) return
  const placeholder = document.createElement('div')
  const trashIcon = document.createElement('i')
  const loadIcon = document.createElement('i')
  trashIcon.classList.add("fa-solid", "fa-trash")
  trashIcon.dataset.id = first.id
  trashIcon.dataset.action = 'trash'
  loadIcon.classList.add("fa-solid", "fa-upload")
  loadIcon.dataset.id = first.id
  loadIcon.dataset.action = 'load'
  placeholder.append(...drawPalette(first.colors), trashIcon, loadIcon)
  savedSection.append(placeholder)
  drawSavedPalettes(tail, savedSection)
}

// query selectors
const swatchSection = document.querySelector('#swatch')
const savedSection = document.querySelector('#saved')
const newPaletteButton = document.querySelector("#new")
const savePaletteButton = document.querySelector("#save")

// event listeners
newPaletteButton.addEventListener("click", () => {
  application.createPalette()
  draw(application.currentPalette(), application.savedPalettes(), swatchSection, savedSection)
})

savePaletteButton.addEventListener("click", () => { 
  application.savePalette()
  draw(application.currentPalette(), application.savedPalettes(), swatchSection, savedSection)
})

savedSection.addEventListener("click", event => {
  const { dataset } = event.target

  if(dataset.action == 'trash') {
    application.deleteSavedPalette(dataset.id)
  } else if(dataset.action == 'load') {
    application.loadPalette(dataset.id)
  }

  draw(application.currentPalette(), application.savedPalettes(), swatchSection, savedSection)
})

swatchSection.addEventListener("click", event => {
  const { index } = event.target.dataset
  application.toggleLock(index)
  draw(application.currentPalette(), application.savedPalettes(), swatchSection, savedSection)
})

// initial draw
window.onload = () => { 
  draw(application.currentPalette(), application.savedPalettes(), swatchSection, savedSection)
}
