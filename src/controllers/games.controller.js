import connection  from "../database/database.js"

export async function postgamescontroller(req, res){
    const { name, image, stockTotal, caregoryId, pricePerDay } = req.body;

    try {
        await connection.query(`
            INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5)`, [name, image, stockTotal, caregoryId, pricePerDay]);
            res.sendStatus(201);
            return;
        } catch (error) {
        res.status(500).send(error.message);
        return;
    }
}

export async function getgamescontroller(req, res){
    const name = req.query.name;

    try {
        if(!name){
            const result = await connection.query(`SELECT * FROM games`);
            res.send(result.rows);
            return;
        }
        const result = await connection.query(`SELECT * FROM games WHERE name ILIKE $1`, [name + '%']);
        res.send(result.rows);
        return;
    }
    catch (error) {
        res.status(500).send(error.message);
        return;
    }
}