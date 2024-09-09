const express = require('express');
const {validade} =require('./middlewares/validade/mw')
//const yup = require('yup') in middleware now
// Створення сервера
const app = express();
const PORT = 3000;

const users = [];
app.use(express.json());

/* Валідація за допомогою yup !!! in middleware now !!!
const validate = async (req, res, next) => {
    console.log(typeof req.body); // Перевірка типу даних тіла запиту
    const validationSchemaUser = yup.object({
        name: yup.string().trim().required(),
        email: yup.string().trim().required().email(),
        password: yup.string().trim().required(),
        is_male: yup.boolean(),
    });
    try {
        // Валідація даних і присвоєння валідованого об'єкта назад до req.body
        req.body = await validationSchemaUser.validate(req.body);
        next();
    } catch (error) {
        // Відправка відповіді з кодом 400 та повідомленням про помилку
        res.status(400).send(error.errors.join(', '));
    }
};
*/
// Створення користувача  
let count = 0;  
const create = (req, res) => {
    try {
        // throw new Error("db not available"); // Розкоментуйте, якщо потрібно перевірити обробку помилок
        const user = req.body; // Збереження користувача
        user.id = count++;
        delete user.password; // Видалення пароля перед збереженням
        user.createdAt = new Date();
        users.push(user);
        console.log(users);
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// Оновлення користувача
const update = (req, res) => {
    try {
        // Логіка оновлення
        res.status(200).send('User updated successfully!');
    } catch (error) {
        res.status(404).send(error.message);
    }
};

// Видалення користувача
const deleteUser = (req, res) => {
    try {
        // Логіка видалення
        res.status(200).send('User deleted successfully!');
    } catch (error) {
        res.status(404).send(error.message);
    }
};

// Додавання маршруту з обробниками
app.post('/users', validate, create);
app.put('/users/:id', validate, update); // Використання параметра маршруту :id
app.delete('/users/:id', deleteUser); // Використання параметра маршруту :id

// Запуск сервера
app.listen(PORT, () => {
    console.log('App started at port ' + PORT);
});
