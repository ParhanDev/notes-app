import express from 'express';
import { testConnection } from './config/db.js';
import helloRouter from './routes/helloRoute.js';
import notesRouter from './routes/notesRoute.js';
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(helloRouter);
app.use(notesRouter);


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    testConnection();
});
