import connection from "../database/database.js";
import joi from "joi";

export async function categoriesmiddleware(req, res, next) {
    const { name } = req.body;
    const schema = joi.object({
        name: joi.string().min(1).required(),
    });

    const validation = schema.validate(req.body);
    if (validation.error) {
        res.status(400).send(validation.error.details[0].message);
        return;
    }

    const existName = await connection.query(`SELECT * FROM categories WHERE name = $1`, [name]);
    if ( existName.rowCount > 0){
        res.status(409).send("Name already exists");
        return;
    }

    next();
}