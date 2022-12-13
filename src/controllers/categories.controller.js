import connection  from "../database/database.js"

export async function postcategoriescontroller (req, res) {
    const { name } = req.body
    
    if (!name) {
        res.status(404).send("Name not found");
        return;
    }

    try {
        await connection.query(`INSERT INTO categories (name) VALUES ($1)`, [name]);
        res.status(201).send("Category created");
        return;
    } catch (error) {
        res.status(500).send(error.message);
        return;
    }
}

export async function getcategoriescontroller (req, res) {
    try {
        const result = await connection.query(`SELECT * FROM categories`);
        res.send(result.rows);
        return;
    } catch (error) {
        res.status(500).send(error.message);
        return;
    }
}