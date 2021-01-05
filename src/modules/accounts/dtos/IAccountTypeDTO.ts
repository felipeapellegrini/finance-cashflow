export interface ICreateAccountType {
  user_id: string;
  name: string;
}

export interface IUpdateAccountType {
  user_id: string;
  id: string;
  new_name: string;
}

export interface IListAccountType {
  user_id: string;
}

export interface IFindById {
  user_id: string;
  id: string;
}

export interface IFindAll {
  user_id: string;
}
