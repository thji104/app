// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// 静的ファイルを提供するための設定（HTML, CSS, JavaScript）
app.use(express.static('public'));

// Socket.io接続をハンドリング
io.on('connection', (socket) => {
    console.log('a user connected');
    
    // メッセージ受信
    socket.on('send_message', (msg) => {
        io.emit('receive_message', msg); // すべてのクライアントにメッセージを送信
    });

    // ユーザーが切断した場合
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// サーバーを指定したポートで起動
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
