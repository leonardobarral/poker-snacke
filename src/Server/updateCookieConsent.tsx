import { collection, query, where, getDocs, setDoc } from 'firebase/firestore';
import { db } from './firebase';

export async function updateCookieConsent(id: string, consent: boolean) {
  const q = query(collection(db, 'usuario'), where('id', '==', id));
  const snapshot = await getDocs(q);
  if (snapshot.empty) {
    throw new Error(`Nenhum usuário encontrado com o id: ${id}`);
  }
  const docRef = snapshot.docs[0].ref;
  await setDoc(docRef, { cookieConsent: consent }, { merge: true });
}
