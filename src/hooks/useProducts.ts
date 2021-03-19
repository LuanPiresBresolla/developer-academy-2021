import { useContext } from 'react';
import { ProductsConext, ProductsConextData } from '../context/products';

export function useProducts(): ProductsConextData {
  const context = useContext(ProductsConext);
  if (!context) {
    throw new Error('useProducts must be used within an ProductsProvider');
  }
  return context;
}
