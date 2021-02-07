# dr.calculendar

## ファイル構成
```
drcalculendar
├── app.js...expressアプリケーション本体
├── bin
│   └── www...app.jsをサーバとして動作させるための記述
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes...ルーティングコードを記述したJSファイルを格納する
│   ├── index.js
│   └── users.js
└── views... View の役割を持つファイルを格納する
    ├── error.pug
    ├── index.pug
    └── layout.pug
```
## 開発
```
docker-compose  up -d
```
```
cd drcalculendar/
npm install
node_modules/.bin/sequelize init
npm run start
```