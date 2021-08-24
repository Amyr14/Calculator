
const numbers = Array.from(document.getElementsByClassName("numb"));
const operators = Array.from(document.getElementsByClassName("op"));
const screen = document.getElementById("screen");
const memoryInfo = document.getElementById("memory");
const opInfo = document.getElementById("operation");
let op = "";
let first = 0;
let second = 0;
let result = 0;
let memory = 0;
let operated = false;
let awaitingInput = false;

const Operations = {
  "+": function (first, second){
      return first + second;
  },
  "-": function (first, second){
      return first - second;
  },
  "/": function (first, second){
      return first / second;
  },
  "x": function (first, second){
      return first * second;
  }
}

const OutManipulation = {
  "CE": function () {
    op = "";
    first = 0;
    second = 0;
    result = 0;
    memory = 0;
    screen.innerText = "";
    operated = false;
  },
  "C": function () {
    screen.innerText = "";
  },
  "BS": function () {
    screen.innerText = screen.innerText.slice(0, -1);
  },
};

numbers.forEach((number) => {
  number.addEventListener("click", () => {
    operated ? ((screen.innerText = ""), (operated = false)) : null;
    screen.innerText += number.innerText;
  });
});

operators.forEach((button) => {
  button.addEventListener("click", () => {
    const operation = button.innerText;
    if (operation === "CE" || operation === "C" || operation === "BS") {
      OutManipulation[operation]();
    } else if (!memory) {
      memory = parseFloat(screen.innerText);
      operation === "=" ? null : ((op = operation), (screen.innerText = ""));
    } else {
      if (op) {
        second = parseFloat(screen.innerText);
        result = Operations[op](memory, second);
        screen.innerText = result.toString();
        memory = result;
        operated = true;
        result = 0;
        second = 0;
        operation === "=" ? (op = "") : (op = operation);
      } else {
        op = operation;
        screen.innerText = "";
      }
    }
    memoryInfo.innerText = memory.toString();
    opInfo.innerText = op.toString();
  });
});


