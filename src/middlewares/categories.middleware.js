import connection from "../database/database.js";
import joi from "joi";

export async function categoriesmiddleware(req, res) {
    const { name } = req.body;
    const schema = joi.object({
        name: joi.string().min(1).required(),
    });

    const validation = schema.validate(req.body);
    if (validation.error) {
        res.sendStatus(400).send(validation.error.details[0].message);
        return;
    }

    const existName = await connection.query(`SELECT * FROM categories WHERE name = $1`, [name]);
    if (existName.row[0]){
        res.sendStatus(409).send("Name already exists");
        return;
    }

    next();
}