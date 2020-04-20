import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Transaction from '../models/Transaction';

interface RequestDTO {
  id: string;
}

class DeleteTransactionService {
  public async execute({ id }: RequestDTO): Promise<void> {
    const transactionRepository = getRepository(Transaction);
    const isTransaction = await transactionRepository.findOne({
      where: { id },
    });

    if (!isTransaction) {
      throw new AppError('transaction not found', 400);
    }

    await transactionRepository.delete(id);
  }
}

export default DeleteTransactionService;
