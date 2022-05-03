import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { LoginDto } from '../../pages/auth/login.page';
import { UserCredential } from 'firebase/auth';

export const logInFirebaseWithEmailAndPassword = async (
  infos: LoginDto
): Promise<UserCredential> => {
  const auth = getAuth();
  const { email, password } = infos;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const authUser = async (): Promise<User | null> => {
  const auth = getAuth();
  return await new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      resolve(user);
      unsubscribe();
    });
  });
};
