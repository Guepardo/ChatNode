var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 3000);  
app.set('ipaddr', process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");  
//... code to c

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  //Informando que alguém entrou na sala
  io.emit('chat',"in"); 
  console.log("alguém entrou"); 

  //Tratando quando alguém sai
  socket.on('disconnect',function(){
  	io.emit('chat','out'); 
    console.log("alguém saiu"); 
  }); 

  //Tratando quando alguém manda uma mensagem
  socket.on('chat',function(msg){
  	io.emit('chat',msg); 
    console.log("mensagem : " + msg ); 
  }); 

});

// Servidor de páginas web ouvindo na porta 3000 ou na porta do Openshift
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000; 
// locally
http.listen(port, function(){
  console.log('listening on *:3000');
});