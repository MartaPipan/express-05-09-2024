const express = require('express');
//create application - server
const app = express();
const PORT = 3000;

//ROUTING
//app.get()
app.get('/', (req, res) => {
    res.send(`<h1>Hi from app! method - ${req.method}, url - ${req.path}</h1>`)
});
app.get('*', (req, res) => {
    res.send(`<h1>404! method - ${req.method}, url - ${req.path}</h1>`)
});

//app.post()
//app.put()
//app.delete()

app.listen(PORT, () => {
    console.log('app start at port '+PORT);
});

