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

    function isValidHttpUrl(string) {
        let url;
        try {
          url = new URL(string);
        } catch (_) {
          return false;
        }
        return url.protocol === "http:" || url.protocol === "https:";
      }


    try{
        const validation = schema.validate(req.body);
        const existName = await connection.query(`SELECT * FROM games WHERE name = $1`, [name]);
        const existCategoryId = await connection.query(`SELECT * FROM categories WHERE id = $1`, [categoryId]);
        if (validation.error) {
            res.sendStatus(400).send(validation.error.details[0].message);
            return;
        }
        if (!isValidHttpUrl(image)) {
            res.sendStatus(400).send("Invalid image url");
            return;
        }

        if (stockTotal < 1 || pricePerDay < 1) {
            res.sendStatus(400).send(" stockTotal and pricePerDay must be greater");
            return;
        }

        if (existName.rowCount > 0) {
            res.sendStatus(409).send("Name already exists");
            return;
        }
        
        if (existCategoryId.rowCount === 0) {
            res.sendStatus(400).send("Category not found");
            return;
        }

        next();
        console.log("Middleware passed")
        
    } catch (error) {
        res.sendStatus(500).send(error.message);
        return;
    }    
}