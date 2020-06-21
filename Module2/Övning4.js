let number1 = document.getElementsByClassName("number1")[0];
let number2 = document.getElementsByClassName("number2")[0];

let sumLabel = document.getElementsByClassName("sum")[0];
let productLabel = document.getElementsByClassName("product")[0];
let sumPlusProductLabel = document.getElementsByClassName("sum-plus-product")[0];

function calculate() {
  sumLabel.innerHTML = add(parseInt(number1.value), parseInt(number2.value));
  productLabel.innerHTML = multiply(parseInt(number1.value), parseInt(number2.value));
  sumPlusProductLabel.innerHTML = add(parseInt(sumLabel.innerHTML), parseInt(productLabel.innerHTML));
}

function add(x, y) {
  return x + y;
}

function multiply(x, y) {
  return x * y;
}