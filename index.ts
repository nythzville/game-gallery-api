import express from 'express';
import cors from 'cors'
import { gameController } from './src/gameController';
import apicache from 'apicache';

const init = async () => {
  const app = express();
  const port = 3000;

  //configure apicache 
  let cache = apicache.middleware

  //caching all routes for 5 minutes
  app.use(cache('5 minutes'))
  app.use(express.json())
  app.use(cors())

  gameController.init(app)
  await new Promise<void>(() => app.listen({ port: port}));
  console.log(`🚀 Server ready at http://localhost:${port}`);
}

init()
