const express = require('express');
//create application - server
const app = express();
const PORT = 3000;

//ROUTING
//app.get()
app.get('/',
    (req, res, next) => {
        req.test = 10;
        console.log(`res.send('1')`);
        next();
    },
    (req, res, next) => {
        req.test +=5
        console.log(`res.send('2')`);
        next();
    },
    (req, res) => {
        res.send('hi, req.test = '+req.test);
    }
);
//patern: change de responsability
//app.post()
//app.put()
//app.delete()

app.listen(PORT, () => {
    console.log('app start at port '+PORT);
});

