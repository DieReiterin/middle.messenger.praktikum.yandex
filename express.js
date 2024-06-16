const path = require('path');

const express = require('express');
const app = express();

const folderPath = path.join(__dirname, 'static')
app.use(express.static(folderPath));

app.get('/assets/index-DwSq4Ji_.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/assets/index-DwSq4Ji_.js'));
});
app.get('/assets/index-DbRBZ7JG.css', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/assets/index-DbRBZ7JG.css'));
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.listen(3000), () => {
    console.log(`Server started on port 3000`);
};



