import connection from "../database/database.js";
import dayjs from "dayjs";

// {
//     customerId: 1,
//     gameId: 1,
//     daysRented: 3
//   }

export async function postrentalcontroller(req, res) {
  const { customerId, gameId, daysRented } = req.body;

  try {
    const price = await connection.query(`SELECT "games"."pricePerDay" FROM games WHERE "games".id = $1`, [gameId]);
    const originalPrice = price.rows[0].pricePerDay * daysRented;
    const rental = await connection.query(
      `INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") 
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [customerId, gameId, dayjs().format("YYYY-MM-DD"), daysRented, null, originalPrice, null] 
    );
    return res.send(rental.rows[0]);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function getrentalscontroller(req, res) {
  try {
    const rentals = await connection.query(`SELECT * FROM rentals WHERE "userId" = $1`, [req.user.id]);
    return res.send(rentals.rows);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}