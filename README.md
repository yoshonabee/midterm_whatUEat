# whatUEat

<https://github.com/yoshonabee/midterm_whatUEat>

### 簡介

這是一個可以紀錄每天飲食營養成分的app，並可以查詢不同日期的飲食

### 操作方式

1. git clone https://github.com/yoshonabee/midterm_whatUEat
2. cd midterm_whatUEat
3. npm install
4. 修改example.env中URL並存檔成檔名 ".env"
5. node server.js
6. npm start
7. 打開 http://localhost://3000

### App功能

1. 可按new來新增所吃的東西，並記錄卡路里、蛋白質、脂肪、碳水化合物、及鈉的攝取
2. 可按previous/next week來切換目前所顯示的日期
3. 可透過直接輸入日期來跳到特定的時間
4. 可點進去主畫面中的紀錄查看該紀錄的細節及刪除
5. 可自動統計當天各營養成分的總攝取量並顯示於下方

### 使用到的框架

1. 使用react.js編寫前端
2. 使用express.js (node.js)來編寫後端
3. 使用socket.io來做前後端連接
4. 使用Mongodb當作database

### 參考

1. 後端的編寫參考老師的chatbox
2. 前後端的連接參考 <https://medium.com/javascript-in-plain-english/full-stack-mongodb-react-node-js-express-js-in-one-simple-app-6cc8ed6de274>

### 貢獻

* 除了create-react-app所自動新增的code以外，其他皆為自己完成，並參考上述兩點

### 心得

覺得這次最大的難點在於前後端的連接。由於前端先前已經寫過許多次，用起來算是比較沒難度，但前後端的連接讓我花了不少時間在探索上，包含兩邊的溝通方式，以及前端多個物件共用一個socket的衝突。這個app還有許多可以擴充的功能，除了最基本的紀錄以外，還可以分析這樣的飲食習慣並給予一個健康分數、針對不同需求的人士個人化推薦飲食組合等等，若未來還有機會再重拾這個app，這些都是不錯的改進方向，另外UI的美化也是一個可以著重的點。
