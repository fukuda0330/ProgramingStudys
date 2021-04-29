//Firebase設定読込
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

//初期化
firebase.initializeApp(firebaseConfig);

function ShowChat(){
    let elmChatBox = document.getElementById('chat-box');
    let elmChatText;
    let chatTexts;

    firebase.database().ref('chat').on('value', function(chat){
        elmChatBox.innertText = '';
        chatTexts = chat.val();
        Object.keys(chatTexts).forEach(function(chatTextKey){
            if(!chatTexts[chatTextKey])
            return;

            elmChatText = document.createElement('div');
            elmChatText.innerText = chatTexts[chatTextKey];
            elmChatBox.appendChild(elmChatText);
        });
    });
}

async function UploadChat(elmChatText){
    let nextTextID = await GetNextTextID();
    firebase.database().ref('chat/' + nextTextID).set(elmChatText.value);
    elmChatText.value = '';
}

function GetNextTextID(){
    return new Promise(function(resolve){
        let nextTextID = 0;
        let iChatTextKey = 0;
        firebase.database().ref('chat').once('value', function(chat){
            Object.keys(chat.val()).forEach(function(chatTextKey){
                iChatTextKey = parseInt(chatTextKey);

                if(nextTextID < iChatTextKey){
                    nextTextID = iChatTextKey;
                }
            });
            nextTextID += 1;
            resolve(String(nextTextID));
        })
    })
}