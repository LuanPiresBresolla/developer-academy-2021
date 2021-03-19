import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useEffect, ReactNode } from 'react';

export const ProductsConext = createContext({} as ProductsConextData);

export interface ProductsConextData {
  products: Product[];
  createdProduct: (product: Product) => void;
  updatedProduct: (product: Product) => void;
  deleteProduct: (id: number) => void;
}

interface Product {
  id: number;
  name: string;
  price?: string;
  serie: string;
  manufacturing_date?: Date;
  manufacturer: string;
}

interface ProductsProviderProps {
  children: ReactNode;  
}

export function ProductsProvider({ children }: ProductsProviderProps) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts() {
      const products = await AsyncStorage.getItem('@stock/products');
      
      if(products) {
        const productsParse = JSON.parse(products) as Product[];        
        setProducts(productsParse);        
      }      
    }
    loadProducts();
  }, []);

  async function createdProduct(product: Product) {
    product.id = Math.floor((Math.random() * 100) + 1);
    setProducts([...products, product]);
    await AsyncStorage.setItem('@stock/products', JSON.stringify([...products, product]));
  }

  async function updatedProduct(product: Product) {
    const newListProducts = products.filter(item => item.id !== product.id);    
    newListProducts.unshift(product);
    setProducts(newListProducts);
    await AsyncStorage.setItem('@stock/products', JSON.stringify(newListProducts));     
  }

  async function deleteProduct(id: number) {          
    const newListProducts = products.filter(product => product.id !== id);
    await AsyncStorage.setItem('@stock/products', JSON.stringify(newListProducts));   
    setProducts(newListProducts);       
  }

  return (
    <ProductsConext.Provider 
      value={{ 
        createdProduct,
        updatedProduct,
        deleteProduct,
        products
      }}
    >
      {children}
    </ProductsConext.Provider>
  );
}