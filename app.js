const express = require('express');
const http = require('http');
const path = require('path');
const sslRedirect = require('heroku-ssl-redirect');

const app = express();
const port = process.env.PORT || '3456';
const packageJson = require('./package.json');

app.use(sslRedirect(['production'], 301));
app.use(express.static(path.join(__dirname, 'dist')));
app.get('/check-version', (req, res) => {
  res.send(packageJson.version);
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Bang! Running... http://localhost:${port}`));
