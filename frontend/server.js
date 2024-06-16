const express = require('express');
const path = require('path'); // Require the path module
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'frontend')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});


console.log(`Server listening on localhost:${port}`);
app.listen(port);
