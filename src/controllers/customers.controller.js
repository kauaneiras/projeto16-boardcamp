import connection from "../database/database.js"

async function postcustomerscontroller(req, res) {

    const { name, phone, cpf, birthday } = req.body;
    
    try {
        const cpfExists = await connection.query(`SELECT * FROM customers WHERE cpf = $1`, [cpf]);
        if (cpfExists.rowCount > 0) {
            return res.status(409).send('CPF already exists');
        }
        await connection.query(`INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)`, [name, phone, cpf, birthday]);
        res.status(201).send('Customer created successfully');
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

async function putcustomerscontroller(req, res) {
    const { name, phone, cpf, birthday } = req.body;
    const { id } = req.params;
    try {
        const cpfExists = await connection.query(`SELECT * FROM customers WHERE cpf = $1`, [cpf]);
        if (cpfExists.rowCount > 0) {
            return res.status(409).send('CPF already exists');
        }
        await connection.query(`UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5`, [name, phone, cpf, birthday, id]);
        res.status(200).send('Customer updated successfully');
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

async function getallcustomerscontroller(req, res) {
    const { cpf } = req.query;
    try {
        if (cpf) {
            const customers = await connection.query(`SELECT * FROM customers WHERE cpf LIKE $1;`, [`${cpf}%`]);
            return res.status(200).send(customers.rows);
        }
        const customers = await connection.query(`SELECT * FROM customers`);
        res.status(200).send(customers.rows);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }

}

async function getonecustomercontroller(req, res) {
    const { id } = req.params;
    try {
        const customer = await connection.query(`SELECT * FROM customers WHERE id = $1`, [id]);
        if (customer.rowCount === 0) {
            return res.sendStatus(404);
        }
        res.status(200).send(customer.rows[0]);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export { postcustomerscontroller, putcustomerscontroller, getallcustomerscontroller, getonecustomercontroller };