const http = require('http');
const fs = require('fs');

function whenIncomingRequest(req, res) {
    if(req.url === '/' && req.method === 'GET'){
        const data = fs.readFileSync("index.html");
        res.end(data);
    } else if(req.url === '/users'&& req.method === 'GET'){
        const data = fs.readFileSync("users.txt");
        res.end(data);
    } else if(req.url === '/users'&& req.method === 'POST'){
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // convert Buffer to string
        });
        req.on('end', () => {
            console.log(body);
            const name = body.split('=')[1];
            fs.appendFileSync('users.txt', name + '\n');
            res.end('ok');
        });
    }
}

const server = http.createServer(whenIncomingRequest);

server.listen(8080);
