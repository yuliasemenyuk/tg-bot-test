import express from "express";
// import dotenv from "dotenv";
import { telegramRouter } from "./routes/api";

// dotenv.config();

const app = express();
app.use(express.json());
app.use('/', telegramRouter);
app.use((req, res, next) => {
    console.log('404 Not Found:', req.path);
    res.status(404).send('Not Found');
});

export default app;