import { Transaction } from '../@types/Transaction';
import { ref, set } from 'firebase/database';
import { db } from '../../firebase';

export async function registerTransactionOnDatabase(
  transaction: Transaction,
  userUid: string | undefined
) {
  if (!userUid) {
    throw new Error('Usuário não encontrado');
  }
  return await set(
    ref(db, `/users/${userUid}/transactions/${transaction.uid}`),
    transaction
  );
}
