import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import sequelize from './db/connection.js';
import {routerPages, authRouter, orderRouter} from './routes/index.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const __dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, "public")));

app.use('/', [routerPages, authRouter, orderRouter]);

(async () => {
  const PORT = process.env.PORT || 3000;
  
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
  } catch (e) {
    console.log(e);
  }
})();
