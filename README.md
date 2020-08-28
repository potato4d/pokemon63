![img](./src/static/static/images/opengraph.png?raw=true)

# みんなの63

これは「みんなの63 - 振り返って強くなる自動解析できるポケモン選出投稿サイト」の開発レポジトリです。

## Installation

### Environment Varialbles

Firebase のプロジェクトを用意して設定してください。

手軽に確認したい場合、テスト用に用意している Firebase プロジェクトがあるため、`cp .env.sample .env` にて、以下を設定ください。

```.env
FIREBASE_API_KEY="AIzaSyB-Jh74U8rwbQq6sMyLTliOamXhGyE3U2g"
FIREBASE_AUTH_DOMAIN="minnano63-dev.firebaseapp.com"
FIREBASE_DATABASEURL="https://minnano63-dev.firebaseio.com"
FIREBASE_PROJECT_ID="minnano63-dev"
FIREBASE_STORAGE_BUCKET="minnano63-dev.appspot.com"
FIREBASE_MESSAGING_SENDER_ID="924539713345"
FIREBASE_APP_ID="1:924539713345:web:a5ab68eff31fcab88b53c0"
FIREBASE_MEASUREMENT_ID="G-SJ4HEZYE1T"
```

Hosting へのデプロイやセキュリティルールの設定などはできませんが、全てが読み書きできる状態で開放されています。

### Image assets(optional)

ソースコード上には、みんなの63に関わる最低限のアセットのみが存在します。

ローカルで利用したい場合、/pokemon63/static/images/icons/1.png から /pokemon63/static/images/icons/527.png までの画像を、なんらかの手段で src/static/static/images/icons へと配置してください。

配置が完了した後、以下のコマンドを実行することで、ローカルでもポケモンのアイコンなどを利用しての動作確認が可能となります。

```
$ cd src/static
$ mkdirp pokemon63
$ cd pokemon63
$ ln -s ../static/ ./static/
```

### Server

```bash
$ yarn
$ yarn dev
$ open 'http://localhost:3000/pokemon63/'
```

## LICENCE

MIT
