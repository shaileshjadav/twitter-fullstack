import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

import { errorHandler } from './helpers/ErrorHandler';
import errorMiddleware, { routeNotFound } from './middleware/errorMiddleware';
import run from './controllers/notifications/queue/notificationQueue';
import router from './routes';

const app: Express = express();
const port = process.env.PORT || 3001;

// middlewares
app.use(cors());
app.use(express.json());
app.use(router);
app.use(routeNotFound);
app.use(errorMiddleware);

// get the unhandled rejection and throw it to another fallback handler we already have.
process.on('unhandledRejection', (reason: Error) => {
  throw reason;
});

process.on('uncaughtException', (error: Error) => {
  errorHandler.handleError(error);

  if (!errorHandler.isTrustedError(error)) {
    process.exit(1);
  }
});

(async () => {
  await run();
  app.listen(port, () => {
    console.log(`[server]: Server is running at ${port}`);
  });
})();
