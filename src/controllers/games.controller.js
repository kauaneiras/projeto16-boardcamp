import connection  from "../database/database.js"

export async function postgamescontroller(req, res){
    
    const { name, image, stockTotal, caregoryId, pricePerDay } = req.body;

    try {
        const existId = await connection.query(`SELECT * FROM categories WHERE id=$1;`, [caregoryId]);
        if (existId.rowCount === 0) {
            return res.status(404).send("Category not found");
        }

        await connection.query(`
            INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5)`, [name, image, stockTotal, caregoryId, pricePerDay]);
            return res.status(201).send("Game created");
            
        } catch (error) {
        return res.status(500).send(error.message);
        
    }
}

export async function getgamescontroller(req, res){
    const name = req.query.name;

    try {
        if(!name){
            const result = await connection.query(`SELECT * FROM games`);
            return res.send(result.rows);
            
        }
        const result = await connection.query(`SELECT * FROM games WHERE name ILIKE $1`, [name + '%']);
        return res.send(result.rows);
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
}