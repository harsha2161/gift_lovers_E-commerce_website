import express from 'express';
import apiRouter from './api/index.js';
import { errorHandler } from './api/middlewares/errorHandler.js';
import cors from "cors";
const app = express()

app.use(express.json())
app.use(cors()) 

app.use('/api/v1', apiRouter)

app.use(errorHandler)

export default app