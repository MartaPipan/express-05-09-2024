const express = require('express');
const validate = require('./middlewares/validate.mw');
const userController = require('./controllers/user.controller');

const app = express();
const PORT = 3000;

app.use(express.json());

// Definindo rotas com middleware de validação
app.post('/users', validate, userController.create);
app.put('/users/:id', validate, userController.update);
app.delete('/users/:id', userController.delete); // Utilizando deleteUser

// Iniciando o servidor
app.listen(PORT, () => {
    console.log('App started at port ' + PORT);
});
