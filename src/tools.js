function makeColorHex(...nums) {
  return nums.map(num => stringify(num)).join('')
}

function stringify(num) {
  return num.toString()
}

module.exports = {
  makeColorHex,
}
