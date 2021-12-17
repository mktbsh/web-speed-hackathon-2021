import bodyParser from 'body-parser';
import Express from 'express';
import session from 'express-session';

import { apiRouter } from './routes/api';
import { staticRouter } from './routes/static';
import compression from 'compression';
import helmet from 'helmet';

const app = Express();

app.use(compression());
app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
);
app.set('trust proxy', true);

app.use(
  session({
    proxy: true,
    resave: false,
    saveUninitialized: false,
    secret: 'secret',
  }),
);
app.use(bodyParser.json());
app.use(bodyParser.raw({ limit: '10mb' }));

app.use('/api/v1', apiRouter);
app.use(staticRouter);

export { app };
