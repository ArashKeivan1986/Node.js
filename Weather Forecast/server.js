var http = require('http');
var router = require('./router');

http.createServer(function(request , response){
    
    // localhost:3000
    router.home(request,response);

    // localhost:3000/babol
    router.forecast(request,response);


}).listen(3001 , function(){
    console.log('server running at localhost:3000');
});