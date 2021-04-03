// チャット機能を実現するために
// Firebase（データベースやアクセス解析などの機能を提供してくれるGoogle傘下のサービス）の設定を読み込む
var firebaseConfig = {
  apiKey: "AIzaSyC_cy2Ox8BtFh1ReBYipNI3K-I006cq6nU",
  authDomain: "programingstudys.firebaseapp.com",
  databaseURL: "https://programingstudys-default-rtdb.firebaseio.com",
  projectId: "programingstudys",
  storageBucket: "programingstudys.appspot.com",
  messagingSenderId: "485456248527",
  appId: "1:485456248527:web:3df77e7defaaa905d3c1ba",
  measurementId: "G-NSF4485Z68"
};
// Firebaseの初期設定を実行する
firebase.initializeApp(firebaseConfig);

// Firebaseに登録したチャットの内容を読み込み、ページへ反映させる
function ShowChat() {
  // HTMLファイル内のid="chat-box"の要素（チャットメッセージ表示用の領域）を取得します
  let elmChatBox = document.getElementById('chat-box');

  // ひとつひとつのチャットメッセージを表示するための要素を入れるための変数
  let elmChatText;
  
  // 実際のチャットメッセージ
  let chatTexts;
  
  // 以下の記述でFirebaseのchat（制作者が作ったデータベースの領域名）から
  // チャットメッセージを取得する
  firebase.database().ref('chat').on('value', function(chat) {

    // まず、チャットメッセージ表示用の領域の中身を空にする
    elmChatBox.innerText = '';

    // chat.val()で、実際の値が入っているオブジェクトを取得することができる
    chatTexts = chat.val();

    // Object.keys（JavaScriptの標準関数）を使うことで、取得したチャットメッセージのキーを全て取得できる
    // それに加え、forEach（ループ処理）を利用することで、その取得キーを順番にループさせることができる
    Object.keys(chatTexts).forEach(function(chatTextKey) {

      // 上記で取得した実際の値が入っているオブジェクト（chatTexts = chat.val()）にキーを当てることで、
      // そのキーに応じたチャットメッセージを取得することができる
      if (!chatTexts[chatTextKey])
        return;

      // チャットメッセージを表示するための要素を作成
      elmChatText = document.createElement('div');

      // 要素に対し、チャットメッセージを入れる（innerTextとは、要素内に文字列を挿入することができるプロパティ）
      elmChatText.innerText = chatTexts[chatTextKey];

      // チャットメッセージ表示用の領域に対し、appendChildを利用することで、
      // 領域の末尾にチャットメッセージを追加する
      // （この一連の処理を繰り返すことで、全てのチャットメッセージを領域内に羅列することができる）
      elmChatBox.appendChild(elmChatText);
    });
  });
}
// 最初はわからない部分も多いと思いますが、動きを体験することに主眼を置いてみてください(^^)

// UploadChatメソッドにより、投稿された新しいチャットメッセージをデータベースへ登録する
async function UploadChat(elmChatText) {

  // データベースに登録されている最大値のキーより、次の連番のキーを取得する
  let nextTextID = await GetNextTextID();
  
  // 取得したキーに対し、入力した投稿内容を使って、データベースへ登録する
  firebase.database().ref('chat/' + nextTextID).set(elmChatText.value);
  
  // 登録後は、入力した投稿内容を空にする（操作手順的に、ユーザーに使いやすくするため）
  elmChatText.value = '';
}

// データベースに登録されている最大値のキーより、次の連番のキーを取得するための関数
function GetNextTextID() {
  
  // Promiseについては、今は理解しようとせず置いておいてください（後続の学習で解説します）
  return new Promise(function(resolve) {
    
    // 次の連番のキーを入れるための変数
    let nextTextID = 0;
    
    // チャットメッセージのキーを数値（変数名先頭のiはIntegerのiを表現している）に
    // 変換したものを入れるための変数
    let iChatTextKey = 0;

    // 表示対象のチャットメッセージをデータベースから取得するための仕組みを応用して、
    // 次に登録すべきキーを抽出する
    firebase.database().ref('chat').once('value', function(chat) {

      Object.keys(chat.val()).forEach(function(chatTextKey) {

        // データベース内のキーは文字列で取得されるので、parseIntで数値に変換する
        iChatTextKey = parseInt(chatTextKey);

        // この時点で次の連番であろうと予測しているキーよりも、
        // 取得したキーが大きかった場合は、大きい方のキーをnextTextIDに入れておく
        // （以上の処理により、最終的に一番大きいキーが残ることになる）
        if (nextTextID < iChatTextKey) {
          nextTextID = iChatTextKey;
        }
      });

      // データベースに登録されているキーで一番大きい番号が取得できたので、
      // 次に登録するキーにするためにキー番号をひとつ進める
      nextTextID += 1;

      // 抽出したキーは数値型なので、後々利用しやすくするために文字列型に変換して
      // 関数呼び出し元に返す
      // （通常は、return nextTextID の形で返すのが一般的だが、
      // 　前述のPromiseの仕組みの関係上、以下の形で実現している）
      resolve(String(nextTextID));
    });
  });
}