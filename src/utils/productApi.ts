import { Product } from './mockProducts';
import { db } from './firebase';
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  Timestamp,
} from 'firebase/firestore';

const COLLECTION = 'products';

export async function getProducts(): Promise<Product[]> {
  const snapshot = await getDocs(collection(db, COLLECTION));
  return snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() } as Product));
}

export async function addProduct(product: Omit<Product, 'id'>) {
  await addDoc(collection(db, COLLECTION), {
    ...product,
    createdAt: Timestamp.now(),
  });
}

export async function deleteProduct(id: string) {
  await deleteDoc(doc(db, COLLECTION, id));
}
