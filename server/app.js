const express = require('express');
const app = express();

const PORT = 3333;

app.get('/', (request, response) => {
    response.send('alo?');
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});