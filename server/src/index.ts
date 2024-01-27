import express from 'express';
import { ddnsRouter } from './app/router';
import { config } from './config';

const app = express();
app.use(express.json());
app.use('/ddns',ddnsRouter);
app.listen(config.listenPort,()=>{console.log(`ddnsserver listening on ${config.listenPort}`)})