import { ref, set } from 'firebase/database';
import { db } from '../../firebase';
import { User } from 'firebase/auth';



export async function registerUserOnDatabase(user: User) {
  return await set(ref(db, `users/${user.uid}`), {
    uid: user.uid,
    name: user.displayName,
    email: user.email,
    profileImage: user.photoURL,
    createdAt: new Date().toString(),
  });
}
