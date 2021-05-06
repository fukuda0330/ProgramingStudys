// 後々から変わる予定のない値については、constで定数として定義できます
const PLUS = '+';
const MINUS = '-'; 
const EQUAL = '=';

// 関数の外で定義された変数は、全ての関数から扱うことができる
let CalcrationResult = 0;    // 計算結果
let LeftValue = '';          // 左辺の値
let RightValue = '';         // 右辺の値

let CalcrationMode = '';     // 演算子の種類（+, -, *, /）

// 計算対象の値を保持する
function HoldNumber(number) {
  // 計算演算子が入力されているかどうかで保持する場所を変える
  if (CalcrationMode.length === 0) {
    LeftValue += String(number);
  } else {
    RightValue += String(number);
  }
}

// 計算用文字列を電卓に加える
function AddCalcrationValue(value) {
  if (IsEqual(value)) {
    // ＝が入力された場合は、保持されている左辺、右辺の値を利用して計算を行う
    Calcration();
    
  } else if (IsOperator(value) === true) {
    // 演算子（+, -, *, /）が入力された場合は、計算用に保持しておく
    if (CalcrationMode.length > 0) {
      // 既に演算子が入力されている場合は、保持しないで関数を抜ける
      return;
    }

    // 入力された演算子の保持
    CalcrationMode = value;

    // 電卓ディスプレイへ入力された演算子の表示を加える
    AddValueDisplay(value);
  } else {
    // 入力された値が＝でも、演算子（+, -, *, /）でもない場合は、数値ということ
    // 数値を左辺、または右辺として保持する
    HoldNumber(value);

    // 電卓ディスプレイへ入力された数値の表示を加える
    AddValueDisplay(value);
  }
}

// 電卓のディスプレイに値を表示するだけの関数
function ShowValueDisplay(value) {
  let calcratorDisplay = document.querySelector('#calcrator-display');
  calcratorDisplay.innerText = String(value);
}
// 既に表示されているディスプレイの文字列に対して、新たに文字列を加える
function AddValueDisplay(value) {
  let calcratorDisplay = document.querySelector('#calcrator-display');
  calcratorDisplay.innerText = calcratorDisplay.innerText + String(value);
}

// +による計算を行う
function AddValue() {
  if (LeftValue.length === 0 || RightValue.length === 0) {
    // 左辺、右辺へ数値が保持されていない場合は、計算をやめる
    return;
  }

  // 左辺と右辺の文字列を数値に変換し、計算した結果を計算結果変数へ入れる
  CalcrationResult = parseInt(LeftValue) + parseInt(RightValue);

  // 計算結果を電卓のディスプレイへ表示する
  ShowValueDisplay(CalcrationResult);

  // 計算のために入力し、変数へ保持していた値を削除する
  ClearCalcration();

  // 続けて計算を行うため、計算結果を保持する
  HoldNumber(CalcrationResult);
}
 //ここからマイナスについて
function SubtractionValue() {
  // 左辺と右辺の文字列を数値に変換し、計算した結果を計算結果変数へ入れる
  CalcrationResult = parseInt(LeftValue)-parseInt(RightValue);

  // 計算結果を電卓のディスプレイへ表示する
  ShowValueDisplay(CalcrationResult);

  // 計算のために入力し、変数へ保持していた値を削除する
  ClearCalcration();

  // 続けて計算を行うため、計算結果を保持する
  HoldNumber(CalcrationResult);
}
// 入力された値が演算子（+, -, *, /）かどうかを判定する
// ※現在は+しか定義していない
function IsOperator(value) {
  return (value == PLUS);
}
function IsOperator(value) {
  return (value == MINUS);
}
// 入力された値が＝かどうかを判定する
function IsEqual(value) {
  return (value == EQUAL);
}

// 入力された演算子（+, -, *, /）によって判断を行い、適した計算を行う
function Calcration() {
  if (CalcrationMode == PLUS){
    AddValue();
  }
 else if (CalcrationMode == MINUS){
    SubtractionValue();
  }
}

// 計算用に入力、保持された変数内の値を削除する
function ClearCalcration() {
  LeftValue = '';
  RightValue = '';
  CalcrationMode = '';
}