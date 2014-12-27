var express = require('express'),
    path = require('path'),
    app = express(),
    DEFAULT_PORT = 3000;

app.set('views', 'src/views');
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    console.log('/ route was called.');
    res.render('index');
});

app.listen(DEFAULT_PORT, function() {
    console.log('listening for connection on port ' + DEFAULT_PORT);
});
