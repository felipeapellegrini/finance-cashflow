import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';

@Entity('transactions')
class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  account_id: string;

  @Column()
  subcategory_id: string;

  @Column()
  costcenter_id: string;

  @Column()
  installment: number;

  @Column()
  installments: number;

  @Column()
  transaction_date: Date;

  @Column()
  due_date: Date;

  @Column()
  payment_date: Date;

  @Column()
  total: number;

  @Column()
  description: string;

  @Column()
  status: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Transaction;
