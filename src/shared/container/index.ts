import { container } from 'tsyringe';

import '@modules/users/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IAccountTypesRepository from '@modules/accounts/repositories/IAccountTypesRepository';
import AccountTypesRepository from '@modules/accounts/infra/typeorm/repositories/AccountTypesRepository';

import IAccountsRepository from '@modules/accounts/repositories/IAccountsRepository';
import AccountsRepository from '@modules/accounts/infra/typeorm/repositories/AccountsRepository';

import ICostCentersRepository from '@modules/transactions/repositories/ICostCentersRepository';
import CostCentersRepository from '@modules/transactions/infra/typeorm/repositories/CostCentersRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IAccountTypesRepository>(
  'AccountTypesRepository',
  AccountTypesRepository,
);

container.registerSingleton<IAccountsRepository>(
  'AccountsRepository',
  AccountsRepository,
);

container.registerSingleton<ICostCentersRepository>(
  'CostCentersRepository',
  CostCentersRepository,
);
