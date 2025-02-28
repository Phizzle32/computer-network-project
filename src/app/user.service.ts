import { Injectable } from '@angular/core';
import { Auth, AuthError, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { doc, Firestore, getDoc, setDoc } from '@angular/fire/firestore';

export interface User {
  name: string;
  high_score: number; 
  total_score: number;
  times_played: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private auth: Auth,
    private firestore: Firestore,
  ) { }

  async getCurrentUser(): Promise<User | null> {
    const user = this.auth.currentUser;
    if (user === null) {
      return null;
    }

    const userDoc = await getDoc(doc(this.firestore, 'User', user.uid));

    if (userDoc.exists()) {
      return userDoc.data() as User;
    } else {
      const newUser: User = {
        name: user.displayName || 'Anonymous',
        high_score: 0,
        total_score: 0,
        times_played: 0,
      };
      await setDoc(doc(this.firestore, 'User', user.uid), newUser);
      return newUser;
    }
  }

  registerUser(email: string, password: string, name: string): Promise<{ success: boolean; error: string | null }> {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then((user) => {
        try {
          setDoc(doc(this.firestore, 'User', user.user.uid), {
            name: name.trim(),
            high_score: 0,
            total_score: 0,
            times_played: 0,
          });
        } catch (error) {
          user.user.delete();
          return { success: false, error: "Something went wrong while registering" };
        }
        return { success: true, error: null };
      })
      .catch((error: AuthError) => {
        let errorMessage: string;
        switch (error.code) {
          case 'auth/invalid-email':
            errorMessage = 'Invalid email address.';
            break;
          case 'auth/email-already-in-use':
            errorMessage = 'This email is already in use.';
            break;
          case 'auth/weak-password':
            errorMessage = 'Password is too weak.';
            break;
          case 'auth/too-many-requests':
            errorMessage = 'Too many attempts. Try again later.';
            break;
          default:
            errorMessage = "Something went wrong while registering";
        }
        return { success: false, error: errorMessage };
      });
  }

  login(email: string, password: string): Promise<{ success: boolean; error: string | null }> {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then(() => ({ success: true, error: null }))
      .catch((error: AuthError) => {
        let errorMessage: string;
        switch (error.code) {
          case "auth/invalid-credential":
            errorMessage = "Incorrect password or email";
            break;
          case "auth/too-many-requests":
            errorMessage = "Too many login attempts. Please try again later.";
            break;
          default:
            errorMessage = "Something went wrong while logging in";
        }
        return { success: false, error: errorMessage };
      });
  }
}