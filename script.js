let bill = 0
let tip = 0
let people = 0
let billInput = document.getElementById("bill")
let peopleInput = document.getElementById("people")
let tipButtons = document.querySelectorAll(".tip-inputs button")
let customTip = document.getElementById("custom")
let tipAmount = document.getElementById("tip")
let total = document.getElementById("total")
let errorMessage = document.getElementById("error")
let resetButton = document.querySelector(".calculator button")
function calculate() {
  if (bill > 0 && tip >= 0 && people > 0) {
    total.textContent = `$${((bill + (tip / 100) * bill) / people).toFixed(2)}`
    tipAmount.textContent = `${(((tip / 100) * bill) / people).toFixed(2)}`
    resetButton.removeAttribute("disabled")
    resetButton.classList.add("selected")
  } else {
    total.textContent = "$0.00"
    tipAmount.textContent = "$0.00"
  }
}
billInput.addEventListener("input", () => {
  bill = Number(billInput.value)
  calculate()
})
peopleInput.addEventListener("input", () => {
  if (Number(peopleInput.value) <= 0 && peopleInput.value != "") {
    peopleInput.classList.add("invalid")
    errorMessage.style.visibility = "visible"
    calculate()
  } else {
    peopleInput.classList.remove("invalid")
    errorMessage.style.visibility = "hidden"
    people = Number(peopleInput.value)
    calculate()
  }
})
function unselectAll() {
  customTip.value = ""
  tipButtons.forEach(button => button.classList.remove("selected"))
}
function unselectButtons() {
  tipButtons.forEach(button => button.classList.remove("selected"))
}
tipButtons.forEach(button => {
  button.addEventListener("click", () => {
    unselectAll()
    button.classList.add("selected")
    tip = Number(button.dataset.percentage)
    calculate()
  })
})
customTip.addEventListener("input", () => {
  unselectButtons()
  tip = Number(customTip.value)
  calculate()
})
resetButton.addEventListener("click", () => {
  bill = 0
  tip = 0
  people = 0
  unselectAll()
  billInput.value = ""
  peopleInput.value = ""
  total.textContent = "$0.00"
  tipAmount.textContent = "$0.00"
  resetButton.classList.remove("selected")
  resetButton.setAttribute("disabled")
})
