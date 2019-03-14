const tiles = document.querySelectorAll("div.item")
const save = document.querySelector("button.save")
const clear = document.querySelector("button.clear")
const tileValues = document.querySelector("pre.tile-values")

const colors = {
  d3e7ff: "light blue",
  ff92f7: "fuschia",
  dc7d99: "salmon",
  fff9b5: "pale yellow",
  d3ffdc: "aquamarine",
  a6a1d4: "deep lavender"
}

function randomColor() {
  const colorsArray = Object.keys(colors)
  const randomColorsIndex = Math.floor(Math.random() * colorsArray.length)
  return colorsArray[randomColorsIndex]
}

tiles.forEach(x => x.addEventListener("click", function () {
  const color = randomColor()
  this.style.background = `#${color}`
  this.style.color = "rgba(0, 0, 0, 0.3)"
  const value = colors[color]
  this.innerText = value
}))

clear.addEventListener("click", function () {
  tiles.forEach(x => {
    x.style.background = "white"
    x.innerText = ""
  })
  tileValues.innerHTML = ""
})

save.addEventListener("click", function () {
  const obj = {}
  let i = 1

  tiles.forEach(x => {
    const value = x.style.background === "" ? "white" : x.style.background
    obj[i] = value
    i++
  })

  tileValues.innerHTML = JSON.stringify(obj)
})