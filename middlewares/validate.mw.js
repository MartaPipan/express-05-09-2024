const yup = require('yup');

    const validationSchemaUser = yup.object({
        name: yup.string().trim().required(),
        email: yup.string().trim().required().email(),
        password: yup.string().trim().required(),
        is_male: yup.boolean(),
    });

module.exports = validate = async (req, res, next) => {
    try {
        // Валідація даних і присвоєння валідованого об'єкта назад до req.body
        req.body = await validationSchemaUser.validate(req.body);
        next();
    } catch (error) {
        // Відправка відповіді з кодом 400 та повідомленням про помилку
        res.status(400).send(error.errors.join(', '));
    }
};