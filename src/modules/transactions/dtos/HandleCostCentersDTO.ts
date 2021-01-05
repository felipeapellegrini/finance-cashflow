export interface ICreateCostCenter {
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

export interface IUpdateCostCenter {
  user_id: string;
  id: string;
  name: string;
}
