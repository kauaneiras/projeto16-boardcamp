export function rentalsmiddleware(req, res, next) {
  const { customerId, gameId, daysRented } = req.body;
  if (!customerId || !gameId || !daysRented) {
    return res.sendStatus(400);
  }
  next();
}