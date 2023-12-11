const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    fs.readFile('ilmateade.html', (err, data) => {
        if(err){
            res.writeHead(500, {'Content-type': 'text/plain'});
            return res.end('Error laadimisega')
        }
        res.writeHead(200, {'Content-typle': 'text/html'});
        res.end(data);
    })
    
})

server.listen(3000, () => {
    console.log('Server kuulab portil 3000. Kylasta http://localhost:3000')
});