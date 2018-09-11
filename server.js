"user strict"

let express = require('express');
let app = express();
let path = require('path');

// defines a folder for the static files
app.use(express.static('public'))

// defines the main entry point
app.get('*', function(req, res){
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.listen(3000, function() {
    console.log('web-server lisening');
})