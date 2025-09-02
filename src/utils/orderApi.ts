
import { db } from './firebase';
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  Timestamp,
} from 'firebase/firestore';
import { Product } from './mockProducts';

export interface Order {
  id?: string;
  userId: string;
  items: (Product & { quantity: number })[];
  total: number;
  createdAt: Timestamp;
}

const COLLECTION = 'orders';

export async function addOrder(order: Omit<Order, 'id' | 'createdAt'>) {
  await addDoc(collection(db, COLLECTION), {
    ...order,
    createdAt: Timestamp.now(),
  });
}

export async function getOrders(userId: string): Promise<Order[]> {
  const q = query(collection(db, COLLECTION), where('userId', '==', userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() } as Order));
}
