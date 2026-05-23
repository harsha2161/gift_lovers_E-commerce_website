import express from 'express';
import apiRouter from './api/index.js';
import { errorHandler } from './api/middlewares/errorHandler.js';
import bodyParser from 'body-parser';
import cors from "cors";
const app = express()

app.use(express.json())
app.use(cors()) 
app.use(bodyParser.json())

app.use('/api/v1', apiRouter)

app.use(errorHandler)

export default app