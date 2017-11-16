const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const port = process.env.PORT || '3456';


app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Bang! Running... http://localhost:${port}`));
