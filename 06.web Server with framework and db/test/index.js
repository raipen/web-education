const http = require('http');
const fs = require('fs');

function whenIncomingRequest(req, res) {
    const funct = require('./pages' + req.url+'.js');
    const result = funct();
    res.end(result);
}

const server = http.createServer(whenIncomingRequest);

server.listen(8080);
