export interface CreateCategory {
  user_id: string;
  name: string;
}

export interface FindById {
  user_id: string;
  id: string;
}

export interface FindAll {
  user_id: string;
}

export interface UpdateCategory {
  user_id: string;
  id: string;
  name: string;
}
