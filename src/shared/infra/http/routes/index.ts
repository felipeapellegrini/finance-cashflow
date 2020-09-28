import 'reflect-metadata';
import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import accountsRouter from '@modules/accounts/infra/http/routes/account.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import costCentersRouter from '@modules/transactions/infra/http/routes/costcenter.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/accounts', accountsRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/cost-centers', costCentersRouter);

export default routes;
