import connection from "../database/database.js";
import joi from "joi";

export async function gamesmiddleware(req, res, next) {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

    const schema = joi.object({
        name: joi.string().min(1).required(),
        image: joi.required(),
        stockTotal: joi.number().min(1).required(),
        pricePerDay: joi.number().min(1).required(),
        categoryId: joi.number().min(1).required()
    });

    const validation = schema.validate(req.body);
    if (validation === false) {
        return res.status(400).send(validation.error.details[0].message);
    }

    function isValidHttpUrl(string) {
        let url;
        try {
          url = new URL(string);
        } catch (_) {
          return false;
        }
        return url.protocol === "http:" || url.protocol === "https:";
      }
        
        const existName = await connection.query(`SELECT * FROM games WHERE name = $1`, [name]);

        if (!isValidHttpUrl(image)) {
            return res.status(400).send("Invalid image url");
        }

        if (stockTotal < 1 || pricePerDay < 1) {
            return res.status(400).send(" stockTotal and pricePerDay must be greater");
        }

        if (existName.rowCount > 0) {
            return res.status(409).send("Name already exists");
        }

    next();
    console.log("Middleware passed")
}