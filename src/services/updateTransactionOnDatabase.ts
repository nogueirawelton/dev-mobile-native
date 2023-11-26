import { ref, set } from 'firebase/database';
import { db } from '../../firebase';
import { Transaction } from '../@types/Transaction';

export async function updateTransactionOnDatabase(
  transaction: Transaction,
  userUid: string
) {
  return await set(
    ref(db, `/users/${userUid}/transactions/${transaction.uid}`),
    transaction
  );
}
