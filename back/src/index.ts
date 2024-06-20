import express, {Request, Response} from 'express';
import "./database/index"
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from "./routes/authRoutes";

import morgan from 'morgan';
import cardRoutes from "./routes/cardRoutes";
dotenv.config();
const app = express();
const host = "0.0.0.0";
app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
// const port = parseInt(process.env.PORT || '80', 10);
const port = 80;
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        message: 'Hello World',
    });
});
app.use(morgan('tiny'));
app.use('/api/auth', authRoutes);
app.use('/api/cards', cardRoutes);

app.listen(port,host, () => {
    console.log(`Server is running at PORT http://${host}:${port}`);
});
