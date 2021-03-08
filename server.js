const https = require('http');
const app = require('./app');
const server = https.createServer(app);
server.listen(3000, function(){
    console.log('Connection Successful')
})     