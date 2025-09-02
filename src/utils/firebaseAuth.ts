import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, User } from 'firebase/auth';
import { app } from './firebase';

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export function signInWithGoogle() {
  return signInWithPopup(auth, googleProvider);
}

export function signUpWithEmail(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function signInWithEmail(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function signOutUser() {
  return signOut(auth);
}

export function onAuthChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}
