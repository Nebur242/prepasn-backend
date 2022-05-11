import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User,
  UserCredential,
} from 'firebase/auth';
import { LoginDto } from '../../pages/auth/login.page';

export const logInFirebaseWithEmailAndPassword = async (
  infos: LoginDto
): Promise<UserCredential> => {
  const auth = getAuth();
  const { email, password } = infos;
  return signInWithEmailAndPassword(auth, email, password);
};

export const authUser = async (): Promise<User | null> => {
  const auth = getAuth();
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      resolve(user);
      unsubscribe();
    });
  });
};

export const logout = async (): Promise<void> => {
  const auth = getAuth();
  await auth.signOut();
};
