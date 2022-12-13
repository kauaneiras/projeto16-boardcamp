import connection from "../database/database.js";
import dayjs from "dayjs";

// {
//     customerId: 1,
//     gameId: 1,
//     daysRented: 3
//   }

async function postrentalcontroller(req, res) {
  const { customerId, gameId, daysRented } = req.body;

  try {
    const price = await connection.query(`SELECT "pricePerDay" FROM games WHERE id=$1;`, [gameId])
    const originalPrice = price.rows[0].pricePerDay * daysRented;
    const rental = await connection.query(
      `INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") 
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [customerId, gameId, dayjs().format("YYYY-MM-DD"), daysRented, null, originalPrice, null] 
    );
    return res.status(201).send(rental.rows[0]);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

async function getrentalscontroller(req, res) {
  const { customerId } = req.query;
    const { gameId } = req.query;

    try {
        if (customerId && !gameId) {
            const rentals = await connection.query(`SELECT * FROM rentals WHERE "customerId" = $1`, [customerId]);
            if (rentals.rows.length === 0) {
                return res.status(404).send("Customer not found");
            }
            return res.send(rentals.rows);
        }
        if (gameId && !customerId) {
            const rentals = await connection.query(`SELECT * FROM rentals WHERE "gameId" = $1`, [gameId]);
            if (rentals.rows.length === 0) {
              return res.status(404).send("Game not found");
          }
            return res.send(rentals.rows);
        }
       if (!customerId && !gameId) {
            const rentals = await connection.query(`SELECT * FROM rentals`);
            return res.send(rentals.rows);
        }
        return res.sendStatus(400);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
  }
}

export { postrentalcontroller, getrentalscontroller };