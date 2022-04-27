import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { Async } from '../../helpers/functions.helpers';
import { LoginDto } from '../../pages/auth/login.page';
import { UserCredential } from 'firebase/auth';

export const logInFirebaseWithEmailAndPassword = async (
  infos: LoginDto
): Promise<[UserCredential | null, unknown | null]> => {
  const auth = getAuth();
  const { email, password } = infos;
  return await Async(signInWithEmailAndPassword(auth, email, password));
};

export const authUser = async (): Promise<[User | null, Error | null]> => {
  const auth = getAuth();
  return await new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log('user', user);
        resolve([user, null]);
      } else {
        reject([null, new Error('User not connected')]);
      }
      unsubscribe();
    });
  });
};
