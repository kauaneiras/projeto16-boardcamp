import joi from 'joi';

export function customersmiddleware(req, res, next) {
    const { name, phone, cpf, birthday } = req.body;
    const schema = joi.object({
        name: joi.string().required(),
        phone: joi.number().required(),
        cpf: joi.required(),
        birthday: joi.required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    if (cpf.length !== 11) {
        return res.status(400).send('Invalid CPF');
    }

    // if date is in format yyyy-mm-dd return true, else return false
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(birthday)) {
        return res.status(400).send('Invalid date format');
    }

    next();
}
