import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import categoriesrouter from './routes/categories.router.js';


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use(categoriesrouter);



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