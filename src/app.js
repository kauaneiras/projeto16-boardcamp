// import modules 
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// import routes
import categoriesrouter from './routes/categories.router.js';
import gamesrouter from './routes/games.router.js';
import customersrouter from './routes/customers.route.js';
import rentalsrouter from './routes/rentals.route.js';


dotenv.config();

// app use the modules
const app = express();
app.use(cors());
app.use(express.json());

// test route to check if the server is running
app.get('/', (req, res) => {res.send('Server is working');});

// use the routes
app.use(categoriesrouter);
app.use(gamesrouter);
app.use(customersrouter);
app.use(rentalsrouter);

// start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
console.log("____________________________________________________");
console.log("|  ||  /|                                           |");
console.log("|  |/_|/     ☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆      |");
console.log(`|  /. .|     Server is running on port ${port}...      |`);
console.log("| =|_Y_|=    ☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆      |");
console.log("|  {>o<}                                            |");
console.log("|___________________________________________________|");
});