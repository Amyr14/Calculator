
const numbers = Array.from(document.getElementsByClassName("numb"));
const operators = Array.from(document.getElementsByClassName("op"));
const screen = document.getElementById("screen");
const memoryInfo = document.getElementById("memory");
const opInfo = document.getElementById("operation");
let op = "";
let second = 0;
let result = 0;
let memory = 0;
let operated = false;
let memorySet = false;

 const Operations = {
  "+": function (first, second) {
    return first + second;
  },
  "-": function (first, second) {
    return first - second;
  },
  "/": function (first, second) {
    return first / second;
  },
  "x": function (first, second) {
    return first * second;
  },
  "Root": function (first, second) {
    return Math.pow(first, 1/second);
  },
  "Pow": function (first, second) {
    return Math.pow(first, second);
  },
};

const ScreenManipulation = {
  "CE": function () {
    op = "";
    second = 0;
    result = 0;
    memory = 0;
    updateMemory();
    cleanScreen();
    memorySet = false;
    operated = false;
  },
  "C": function () {
    operated ? null : screen.innerText;
  },
  "BS": function () {
    operated ? null : (screen.innerText = screen.innerText.slice(0, -1));
  },
  "+/-": function () {
    operated || screen.innerText === ""
      ? null
      : screen.innerText.includes("-")
        ? (screen.innerText = screen.innerText.replace("-", ""))
        : (screen.innerText = "-" + screen.innerText);
  },
};

function updateMemory() {
  memoryInfo.innerText = memory.toString();
}

function cleanScreen() {
  screen.innerText = "";
}

numbers.forEach((number) => {
  number.addEventListener("click", () => {
    let isDot = number.innerText === "." ? true : false;
    !op && memorySet
      ? ((memory = 0), updateMemory(), (memorySet = false))
      : null;
    operated ? (cleanScreen(), (operated = false)) : null;
    isDot
      ? screen.innerText.includes(".")
        ? null
        : (screen.innerText += number.innerText)
      : (screen.innerText += number.innerText);
  });
});

operators.forEach((button) => {
  button.addEventListener("click", () => {
    const operation = button.innerText;
    if (
      operation === "CE" ||
      operation === "C" ||
      operation === "BS" ||
      operation === "+/-"
    ) {
      ScreenManipulation[operation]();
    } else if (!memorySet) {
      memory = parseFloat(screen.innerText);
      updateMemory();
      memorySet = true;
      operation === "=" ? null : ((op = operation), cleanScreen());
    } else {
      if (op) {
        second = parseFloat(screen.innerText);
        result = Operations[op](memory, second);
        screen.innerText = result.toString();
        memory = result;
        updateMemory();
        operated = true;
        result = 0;
        second = 0;
        operation === "=" ? (op = "") : (op = operation);
      } else {
        op = operation;
        cleanScreen();
      }
    }
    opInfo.innerText = op;
  });
});
