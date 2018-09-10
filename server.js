//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
<<<<<<< HEAD
app.use(express.static('./dist'));

app.get('/*', function(req,res) {
    
  console.log("SERVER LOADED")
  res.sendFile(path.join(__dirname,'/dist/index.html'));


=======
app.use(express.static(__dirname + '/dist/fractal-angular'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/fractal-angular/index.html'));
>>>>>>> d46b0a53fbf4eb18a9e517670870495de12136fe
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);