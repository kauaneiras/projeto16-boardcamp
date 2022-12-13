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
      const rentals = await connection.query(`SELECT rentals.*, 
            JSON_BUILD_OBJECT('id', customers.id,'name', customers.name) AS customer, 
            JSON_BUILD_OBJECT('id', games.id, 'name', games.name, 'categoryId', games."categoryId",'categoryName', categories.name) AS game FROM rentals
            JOIN games ON rentals."gameId"=games.id
            JOIN customers ON rentals."customerId"=customers.id 
            JOIN categories ON games."categoryId"=categories.id
            WHERE rentals."customerId"=$1;`, [customerId]);
      if (rentals.rows.length === 0) {
        return res.status(404).send("Customer not found");
      }
      return res.send(rentals.rows);
    }
    if (gameId && !customerId) {
      const rentals = await connection.query(`SELECT rentals.*, 
            JSON_BUILD_OBJECT('id', customers.id,'name', customers.name) AS customer, 
            JSON_BUILD_OBJECT('id', games.id, 'name', games.name, 'categoryId', games."categoryId",'categoryName', categories.name) AS game FROM rentals
            JOIN games ON rentals."gameId"=games.id
            JOIN customers ON rentals."customerId"=customers.id 
            JOIN categories ON games."categoryId"=categories.id
            WHERE rentals."gameId"=$1;`, [gameId]);
      if (rentals.rows.length === 0) {
        return res.status(404).send("Game not found");
      }
      return res.send(rentals.rows);
    }
    if (!customerId && !gameId) {
      const rentals = await connection.query(`SELECT rentals.*, 
            JSON_BUILD_OBJECT('id', customers.id,'name', customers.name) AS customer, 
            JSON_BUILD_OBJECT('id', games.id, 'name', games.name, 'categoryId', games."categoryId",'categoryName', categories.name) AS game FROM rentals
            JOIN games ON rentals."gameId"=games.id
            JOIN customers ON rentals."customerId"=customers.id 
            JOIN categories ON games."categoryId"=categories
            .id;`);
      return res.send(rentals.rows);
    }
    return res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

async function postrentalreturncontroller(req, res) {
  const { id } = req.params;
  const today = dayjs().format().substring(0, 10);
  try {
    const rental = await connection.query(`SELECT "daysRented", "rentDate", "gameId" FROM rentals WHERE id=$1;`, [id])

    await connection.query(`UPDATE rentals SET "returnDate"=$1 WHERE id=$2;`, [today, id])

    const rented = rental.rows[0].rentDate.toISOString().substring(0, 10);

    const returnDate = new Date(today);
    const lastRentedDate = new Date(rented);
    const diference = (returnDate - lastRentedDate) / (1000 * 3600 * 24);

    const pricePerDay = await connection.query(`SELECT "pricePerDay" FROM games WHERE id=$1;`, [rental.rows[0].gameId])

    const multa = (diference - rental.rows[0].daysRented) * pricePerDay;

    if (rental.rows[0].daysRented < diference) {
      await connection.query(`UPDATE rentals SET "delayFee"=$1 WHERE id=$2;`, [multa, id])
    }
    return res.sendStatus(200);

  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function deleterentalcontroller(req, res) {
  const { id } = req.params;
  try {
    const isReturned = await connection.query(`SELECT "returnDate" FROM rentals WHERE id=$1;`, [id]);
    if (isReturned.rows[0].returnDate === null) {
      return res.sendStatus(400);
    }
    await connection.query(`DELETE FROM rentals WHERE id=$1;`, [id]);
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}


export { postrentalcontroller, getrentalscontroller, postrentalreturncontroller, deleterentalcontroller };