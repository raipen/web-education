const http = require('http');
const fs = require('fs');

function whenRequestIncoming(req, res) {
    console.log(req.url);
    if(req.url === '/fetch.js') {
        console.log('fetch.js');
        const data = fs.readFileSync('./fetch.js');
        res.write(data);
        return res.end();
    }
    if(req.url === '/') {
        const data = fs.readFileSync('./index.html');
        res.write(data);
        return res.end();
    }
    if(req.url === '/ping') {
        res.write('pong');
        return res.end();
    }
    if(req.url === '/users' && req.method === 'GET') {
        const data = fs.readFileSync('./users.txt');
        res.write(JSON.stringify(data.toString().split('\n')));
        return res.end();
    }

    if(req.url === '/users' && req.method === 'POST') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', () => {
            const name = JSON.parse(body).name;
            fs.appendFileSync('./users.txt', `${name}\n`);
            return res.end();
        });
    }
}

const server = http.createServer(whenRequestIncoming);

server.listen(8080);
