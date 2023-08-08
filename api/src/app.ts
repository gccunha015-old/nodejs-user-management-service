import express, { Express, Request, Response } from 'express';
import './config/prototype'
import { env } from './config/env'
// import { prisma } from './config/database'

const app: Express = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(env.PORT, () => {
  console.log(`⚡️[server]: Server is running at ${env.PROTOCOL}://${env.HOST}:${env.PORT}`);
});