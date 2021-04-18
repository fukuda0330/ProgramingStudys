const PLUS = '+';
const EQUAL = '=';

let CalcrationResult = 0;
let LeftValue = '';
let RightValue = '';

let CalcrationMode = '';

function HoldNumber(number) {
  if (CalcrationMode.length === 0) {
    LeftValue += String(number);
  } else {
    RightValue += String(number);
  }

  AddValueDisplay(number);
}

function AddCalcrationValue(value) {
  if (IsEqual(value)) {
    Calcration();
  } else if (IsOperator(value) === true) {
    if (CalcrationMode.length > 0)
      return;

    CalcrationMode = value;
    AddValueDisplay(value);
  } else {
    HoldNumber(value);
  }
}

// 電卓のディスプレイに値を表示するだけの関数
function ShowValueDisplay(value) {
  let calcratorDisplay = document.querySelector('#calcrator-display');
  calcratorDisplay.innerText = String(value);
}
function AddValueDisplay(value) {
  let calcratorDisplay = document.querySelector('#calcrator-display');
  calcratorDisplay.innerText = calcratorDisplay.innerText + String(value);
}

function AddValue() {
  CalcrationResult = parseInt(LeftValue) + parseInt(RightValue);
  ShowValueDisplay(CalcrationResult);
  ClearCalcrationMode();
}

function IsOperator(value) {
  return (value == PLUS);
}

function IsEqual(value) {
  return (value == EQUAL);
}

function Calcration() {
  if (CalcrationMode == PLUS) {
    AddValue();
  }
}

function ClearCalcrationMode() {
  CalcrationMode = '';
}