"use strict";

var tiles = document.querySelectorAll("div.item");
var save = document.querySelector("button.save");
var clear = document.querySelector("button.clear");
var tileValues = document.querySelector("pre.tile-values");
var colors = {
  d3e7ff: "light blue",
  ff92f7: "fuschia",
  dc7d99: "salmon",
  fff9b5: "pale yellow",
  d3ffdc: "aquamarine",
  a6a1d4: "deep lavender"
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
    this.style.color = "rgba(0, 0, 0, 0.3)";
    var value = colors[color];
    this.innerText = value;
  });
});
clear.addEventListener("click", function () {
  tiles.forEach(function (x) {
    x.style.background = "white";
    x.innerText = "";
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
  tileValues.innerHTML = JSON.stringify(obj);
});