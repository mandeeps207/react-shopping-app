export interface Review {
  user: string;
  rating: number;
  comment: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  reviews?: Review[];
  image?: string;
}

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Product 1',
    price: 29.99,
    category: 'Electronics',
    reviews: [
      { user: 'Alice', rating: 5, comment: 'Great product!' },
      { user: 'Bob', rating: 4, comment: 'Works well.' },
    ],
    image: '',
  },
  {
    id: '2',
    name: 'Product 2',
    price: 49.99,
    category: 'Clothing',
    reviews: [
      { user: 'Carol', rating: 3, comment: 'Average quality.' },
    ],
    image: '',
  },
  {
    id: '3',
    name: 'Product 3',
    price: 19.99,
    category: 'Books',
    reviews: [],
    image: '',
  },
  { id: '4', name: 'Product 4', price: 99.99, category: 'Electronics', reviews: [], image: '' },
  { id: '5', name: 'Product 5', price: 15.99, category: 'Books', reviews: [], image: '' },
  { id: '6', name: 'Product 6', price: 39.99, category: 'Clothing', reviews: [], image: '' },
];
