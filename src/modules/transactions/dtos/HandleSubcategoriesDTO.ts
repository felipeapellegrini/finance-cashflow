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

export interface FindAll {
  user_id: string;
}

export interface CreateSubcategoryServiceDTO {
  user_id: string;
  subcategory_name: string;
  category_name: string;
}

export interface UpdateSubcategoryServiceDTO {
  user_id: string;
  id: string;
  subcategory_name: string;
  category_name: string;
}
