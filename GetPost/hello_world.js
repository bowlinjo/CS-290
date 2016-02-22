var http = require('http');

http.createServer(function(req,res){
	res.writeHead(200, { 'Contente-Type': 'text/plain' });
	res.end('Hello world!');
}).listen(3000);

console.log('Server started on localhost:3000; press Ctr-C to terminate...');