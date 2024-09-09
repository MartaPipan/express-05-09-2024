const users = [];

// Створення користувача  
let count = 0;  

module.exports.create = (req, res) => {
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
module.exports.update = (req, res) => {
    try {
        // Логіка оновлення
        res.status(200).send('User updated successfully!');
    } catch (error) {
        res.status(404).send(error.message);
    }
};

// Видалення користувача
module.exports.delete = (req, res) => {
    try {
        // Логіка видалення
        res.status(200).send('User deleted successfully!');
    } catch (error) {
        res.status(404).send(error.message);
    }
};
