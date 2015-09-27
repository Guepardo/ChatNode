var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  //Informando que alguém entrou na sala
  io.emit("Alguém entrou na sala"); 

  //Tratando quando alguém sai
  socket.on('disconnect',function(){
  	console.log('Alguém saiu'); 
  }); 

  //Tratando quando alguém manda uma mensagem
  socket.on('chat',function(msg){
  	io.emit(msg); 
  }); 

});

// Servidor de páginas web ouvindo na porta 3000 ou na porta do Openshift
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000; 
// locally
http.listen(port, function(){
  console.log('listening on *:3000');
});