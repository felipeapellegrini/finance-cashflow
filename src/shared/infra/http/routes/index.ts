import 'reflect-metadata';
import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import accountTypesRouter from '@modules/accounts/infra/http/routes/accountType.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/account-type', accountTypesRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
