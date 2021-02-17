import FakeTransactionsRepository from '../../../repositories/fakes/FakeTransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

let fakeTransactionsRepository: FakeTransactionsRepository;
let createTransaction: CreateTransactionService;

describe('CreateTransaction', () => {
  beforeEach(() => {
    fakeTransactionsRepository = new FakeTransactionsRepository();
    createTransaction = new CreateTransactionService(
      fakeTransactionsRepository,
    );
  });

  it('should be able to create a transaction', async () => {
    const transaction = await createTransaction.execute({
      user_id: 'user',
      account_id: 'account',
      subcategory_id: 'subcategory',
      costcenter_id: 'costcenter',
      installment: 1,
      installments: 1,
      transaction_date: new Date(),
      due_date: new Date(),
      payment_date: new Date(),
      total: 100.0,
      description: 'lancamento teste',
      status: 1,
    });

    expect(transaction).toHaveProperty('id');
  });
});
