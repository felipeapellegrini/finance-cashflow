export interface ICreateAccount {
  user_id: string;
  name: string;
  account_type: string;
}

export interface IFindByName {
  user_id: string;
  name: string;
}

export interface IFindById {
  user_id: string;
  id: string;
}

export interface IFindAll {
  user_id: string;
}

export interface IUpdateAccount {
  name: string;
  id: string;
  user_id: string;
  account_type: string;
}
