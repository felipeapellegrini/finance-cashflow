export interface ICreateSubcategoryDTO {
  category_id: string;
  name: string;
  user_id: string;
}

export interface IFindByNameDTO {
  name: string;
  user_id: string;
  category_id: string;
}

export interface IFindByIdDTO {
  id: string;
  user_id: string;
}
