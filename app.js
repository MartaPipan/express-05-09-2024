const express = require('express');
const yup = require('yup');
//create application - server
const app = express();
const PORT = 3000;

const users = [];

//ROUTING
//app.get()
app.get('/',
    (req, res) => {
        res.send('hi');
    });  
//patern: change de responsability
//app.post()
//app.put()
//app.delete()


//ROUTING FOR CREATE USER
// 1 parse            const parse = (req, res, next)=>{}
// 2 validation       const validate = (req,res,next) =>{}
// 3 save user
// 4 prepare user
// 5 send user         const create =(req,res,next) ={}


// 1 PARSE
// const parse = (req, res, next)=> {} igual a
const parse = express.json();//(string --> json-->object)
// Парсинг JSON (перетворення тексту на об'єкт)   ---> next
// 2 VALIDATION  --npm install yup ($ npm i yup)
const validate = async(req, res, next) => {
    console.log(typeof req.body);// body=object --next -----> // Перевірка типу даних тіла запиту
    const validationShemaUser = yup.object({
        name: yup.string().trim().required(),
        email: yup.string().trim().required().email(),
        password: yup.string().trim().required(),
        is_male: yup.boolean(),
    });
    try {// Валідація даних і присвоєння валідованого об'єкта назад до req.body
        req.body = await validationShemaUser.validate(req.body);
        next();
    } catch (error) {
        //res.send(error.message);    // Відправка відповіді з кодом 400 та повідомленням про помилку
        res.status(400).send(error.errors.join(', '));
    }
};
// 3 save user // 4 prepare user //5 send user
// Створення користувача  
let count = 0;  
const create = (req, res) => {
    try {
        throw new Error("db not avalable");
      const user = req.body;// 3 save user
      user.id = count++;
      delete user.password;
      user.createdAt = new Date();
      users.push(user);
      console.log(users);
      res.status(201).send(user);
  } catch (error) {
   res.status(400).send(error.message) 
  }
};
// Додавання маршруту з обробниками
app.post('/users', parse, validate, create);
app.put('/users/1', parse, validate, create);
// Запуск сервера
app.listen(PORT, () => {
    console.log('app start at port '+PORT);
});

