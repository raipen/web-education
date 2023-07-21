const http = require('http');
const fs = require('fs');

function whenIncomingRequest(req, res) {
    if(req.url === '/api/todolist'&& req.method === 'GET'){
        if(!fs.existsSync("todolist.txt")){
            fs.writeFileSync("todolist.txt", "");
        }
        const data = fs.readFileSync("todolist.txt");
        res.end(data);
        return;
    }

    if(req.url === '/api/todolist'&& req.method === 'POST'){
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            if(body.trim() === ''){
                res.statusCode = 400;
                res.end('empty body');
                return;
            }
            const appendData = "x|"+body.trim() + '\n';
            const prevData = fs.readFileSync("todolist.txt").toString().trim().split('\n');
            if(prevData.includes("x|"+body.trim())||prevData.includes("o|"+body.trim())){
                res.statusCode = 409;
                res.end('already exists');
                return;
            }
            fs.writeFileSync("todolist.txt", prevData.join('\n') + '\n' + appendData);
            res.statusCode = 201;
            res.end();
        });
        return;
    }

    if(req.url === '/api/todolist'&& req.method === 'DELETE'){
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const prevData = fs.readFileSync("todolist.txt").toString().trim().split('\n');
            if(!prevData.includes("x|"+body.trim())&&!prevData.includes("o|"+body.trim())){
                res.statusCode = 404;
                res.end('not found');
                return;
            }
            fs.writeFileSync("todolist.txt", prevData.filter(item => item.split('|')[1] !== body.trim()).join('\n'));
            res.statusCode = 200;
            res.end();
        });
        return;
    }

    if(req.url === '/api/todolist' && req.method === 'PATCH'){
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const [status, text] = body.trim().split('|');
            if(status !== 'x' && status !== 'o'){
                res.statusCode = 400;
                res.end('bad request');
                return;
            }
            const prevData = fs.readFileSync("todolist.txt").toString().trim().split('\n');
            if(!prevData.map(e=>e.split('|')[1]).includes(body.trim().split('|')[1])){
                res.statusCode = 404;
                res.end('not found');
                return;
            }
            fs.writeFileSync("todolist.txt",
                prevData
                .map(item => item.split('|')[1] === body.trim().split('|')[1] ? body.trim() : item).join('\n')
            );
            res.statusCode = 200;
            res.end();
        });
        return;
    }

    //다른 모든 요청은 각 요청에 맞는 파일을 읽어서 전송한다.
    const filename = req.url === '/' ? 'index.html' : req.url.substring(1);
    fs.readFile("build/"+filename, (err, data) => {
        if(err){
            res.statusCode = 404;
            res.end('not found');
        }
        else{
            res.end(data);
        }
    });

}

const server = http.createServer(whenIncomingRequest);

server.listen(8080);