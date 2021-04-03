// 文字色を設定するための関数を定義。引数に文字入力欄の文字色を入れるように定義している
function ColorChange(editorColor) {
  // HTMLファイル内のid="editor"の要素を取得する
  let elmEditor = document.getElementById("editor");
  // HTMLファイル内から引数として渡した値（文字色情報）をid="editor"の要素に適用する
  elmEditor.style.color = editorColor;
}

// 背景色を設定するための関数を定義。引数に文字入力欄の背景色を入れるように定義している
function BackColorChange(editorBackColor) {
  // HTMLファイル内のid="editor"の要素を取得する
  let elmEditor = document.getElementById("editor");
  // HTMLファイル内から引数として渡した値（背景色情報）をid="editor"の要素に適用する
  elmEditor.style.backgroundColor = editorBackColor;
}

// ToDo：こちらに、入力した内容をパレットへ反映するための関数を作ってみてください♪
// ※上２つの関数の定義を参考にしてみてください。名前は何でも大丈夫です