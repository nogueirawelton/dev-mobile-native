import { ref, update } from 'firebase/database';
import { db } from '../../firebase';

export async function deleteTransasctionFromDatabase(
  transactionUid: string,
  userUid: string | undefined
) {
  if (!userUid) {
    throw new Error('Usuário não encontrado');
  }
  return await update(
    ref(db, `/users/${userUid}/transactions/${transactionUid}`),
    {
      deletedAt: new Date().toString(),
    }
  );
}
