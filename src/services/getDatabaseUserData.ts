import { child, get, ref } from 'firebase/database';
import { db } from '../../firebase';
import { parseDatabaseUserData } from '../utils/parseDatabaseUserData';

export async function getDatabaseUserData(userUid: string) {
  const realtimeUserData = await get(child(ref(db), `/users/${userUid}`));

  return parseDatabaseUserData(realtimeUserData.val());
}
