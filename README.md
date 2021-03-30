# ProgramingStudys
## ローカルのGitとGithubを連携させよう♪

```
手順の目的としては、Githubのアカウントに対し、皆さんのPCのGitをSSHと呼ばれる技術によって繋げることにあります。
それによって、リポジトリへのアクセスが楽になります♪
```

### ０　Gitを起動できるようにしておく

Windows版に関しては、以下のページからダウンロードする<br>
```https://gitforwindows.org/```

ダウンロードが終わったら、デスクトップ上で右クリックし、表示されたメニューから「Git bash here」をクリックする

### １　SSH Keyの作成

表示された黒い画面で以下のコマンドを入力し、Enterキーを押す<br>

```ssh-keygen -t rsa -b 4096 -C "your_email@example.com"```

※「your_email@example.com」の部分はGithubに登録したメールアドレスを入力する
※示された場所にそのまま保存（Enterキーを押す）<br>
※「Enter passphrase (empty for no passphrase):」という感じでパスワード入力を求められるが、空欄のままEnterキーを押す<br>
※処理後の画面をキャプチャで残しておこう<br>


### ２　SSH Keyの内容をクリップボードにコピー

黒い画面で以下のコマンドを入力し、Enterキーを押す<br>

```clip < ~/.ssh/id_rsa.pub```

※.sshの位置は先ほどSSH Keyが保存された場所<br>


### ３　Githubにログインする

### ４　ページ右上の自分のアカウントアイコンをクリックし、出てきたメニューから「Setting」をクリックする

### ５　左メニュー内から「SSH and GPG keys」ボタンをクリックし、「New SSH Key」ボタン（緑）をクリックする

### ６　「SSH keys / Add new」というページが表示される

### ７　Title欄に識別子を入力

※何でもよいので、"ProgramingStudysSSH"のようなわかりやすい名前をつけておこう<br>


### ８　Key欄に先ほどid_rsa.pubからコピーした内容を貼り付ける

※もし、途中でコピー内容が変わってしまった場合は、Ctrl + Vで過去のコピーから参照するか、もしくは再度「clip < ~/.ssh/id_rsa.pub」でコピーしてくる<br>


### ９　「Add SSH Key」ボタン（緑）をクリックする

### １０　鍵マークがついたSSH Keyが作成されていることを確認する

### １１　SSH用の記述でリポジトリをクローンする

以下のコマンドを入力し、Enterキーを押す<br>

```git clone git@github.com:fukuda0330/ProgramingStudys.git```<br>
