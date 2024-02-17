const express = require('express');
const http = require('http');
const app = express();
app.get('/', (_req, res) => {
    res.sendFile(__dirname + '/client.html');
});
app.get('/sse_endpoint', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    const intervalId = setInterval(() => {
        res.write(`data: New message at ${new Date().toLocaleTimeString()}\n\n`);
    }, 1000);
    req.on('close', () => {
        clearInterval(intervalId);
        res.end();
    });
});
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`run in http://localhost:${PORT}/`);
});
