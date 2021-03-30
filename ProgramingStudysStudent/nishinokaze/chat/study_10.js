// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

function ShowChat() {
  let chatBox = document.getElementById('chat-box');
  let messages;
  
  firebase.database().ref('chat').on('value', function(chat_test) {
    alert('bbbbbbbbbbbbbbb');
    messages = chat_test.val();
    alert('aaaaaaaaaaaaaa');
    Object.keys(messages).forEach(function(messageKey) {
      // chatBox.appendChild('<div>' + messages[messageKey] + '</div>');
      alert(messages[messageKey]);
    });
  });
}