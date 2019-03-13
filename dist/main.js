"use strict";

var tiles = document.querySelectorAll("div.item");
var save = document.querySelector("button.save");
var clear = document.querySelector("button.clear");
var tileValues = document.querySelector("pre.tile-values");
var colors = {
  d3e7ff: "light blue",
  ff92f7: "hot pink",
  dc7d99: "salmon",
  fff9b5: "pale yellow",
  d3ffdc: "aqua",
  a6a1d4: "lavender-ish" // const valuesArray = Object.values(colors)
  // const randomValuesIndex = Math.floor(Math.random() * valuesArray.length)

};

function randomColor() {
  var colorsArray = Object.keys(colors);
  var randomColorsIndex = Math.floor(Math.random() * colorsArray.length);
  return colorsArray[randomColorsIndex];
}

tiles.forEach(function (x) {
  return x.addEventListener("click", function () {
    var color = randomColor();
    this.style.background = "#".concat(color);
    var value = colors[color];
    this.dataset.value = value;
  });
});
clear.addEventListener("click", function () {
  tiles.forEach(function (x) {
    x.style.background = "white";
    x.dataset.value = "";
  });
  tileValues.innerHTML = "";
});
save.addEventListener("click", function () {
  var obj = {};
  var i = 1;
  tiles.forEach(function (x) {
    var value = x.style.background === "" ? "white" : x.style.background;
    obj[i] = value;
    i++;
  });
  console.log(obj);
  tileValues.innerHTML = JSON.stringify(obj);
});