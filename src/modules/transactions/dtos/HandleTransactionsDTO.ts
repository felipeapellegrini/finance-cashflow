export interface ICreateTransactionDTO {
  user_id: string;
  account_id: string;
  subcategory_id: string;
  costcenter_id: string;
  transaction_date: Date;
  due_date: Date;
  payment_date: Date;
  description: string;
  total: number;
  installment: number;
  installments: number;
  status: number;
  type: string;
  parent_id?: string;
}

export interface FindAll {
  user_id: string;
}
