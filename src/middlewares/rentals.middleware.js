import connection from "../database/database.js";

export function rentalsmiddleware(req, res, next) {
  const { customerId, gameId, daysRented } = req.body;
  if (!customerId || !gameId || !daysRented) {return res.sendStatus(400);}
  next();
}

export async function rentalreturnmiddleware(req, res, next) {
  const { id } = req.params;
  const existId = await connection.query(`SELECT * FROM rentals WHERE id=$1;`, [id]);
  const alreadyFinished = await connection.query(`SELECT * FROM rentals WHERE id=$1 AND "returnDate" IS NULL;`, [id]);
  if (existId.rows[0] === undefined) { return res.sendStatus(404); }
  if (alreadyFinished.rows[0] === undefined) { return res.sendStatus(400); }
  next();
}

export async function deleterentalmiddleware(req, res, next) {
  const { id } = req.params;
  const existId = await connection.query(`SELECT * FROM rentals WHERE id=$1;`, [id]);
  if (existId.rows[0] === undefined) {return res.sendStatus(404);}
  next();
}