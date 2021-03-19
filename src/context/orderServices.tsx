import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { dateFormat } from '../utils/dateFormat';

export const OrderServiceConext = createContext({} as OrderServiceConextData);

export interface OrderServiceConextData {
  orderServices: OrderService[];
  createdOrderService: (orderService: OrderService) => void;
  updatedOrderService: (orderService: OrderService) => void;
  deleteOrderService: (id: number) => void;
}

interface Product {
  id: number;
  name: string;
  price?: string;
  serie: string;
  manufacturing_date?: Date;
  manufacturer: string;
}

interface OrderService {
  id: number;
  title: string;
  description: string;
  product: Product;
  created_at: Date;
  finished_at?: Date;
};

interface OrderServiceProviderProps {
  children: ReactNode;  
}

export function OrderServiceProvider({ children }: OrderServiceProviderProps) {
  const [orderServices, setOrderServices] = useState<OrderService[]>([]);

  useEffect(() => {
    async function loadOrderServices() {
      const orderServicesList = await AsyncStorage.getItem('@stock/order-services');
      
      if(orderServicesList) {
        const orderServicesListParse = JSON.parse(orderServicesList) as OrderService[];        
        setOrderServices(orderServicesListParse);        
      }      
    }
    loadOrderServices();
  }, []);

  async function createdOrderService(orderService: OrderService) {
    orderService.id = Math.floor((Math.random() * 100) + 1);
    setOrderServices([...orderServices, orderService]);
    await AsyncStorage.setItem('@stock/order-services', JSON.stringify([...orderServices, orderService]));     
  }

  async function updatedOrderService(orderService: OrderService) {    
    const newListProducts = orderServices.filter(item => item.id !== orderService.id);    
    newListProducts.unshift(orderService);
    setOrderServices(newListProducts);
    await AsyncStorage.setItem('@stock/order-services', JSON.stringify(newListProducts));     
  }

  async function deleteOrderService(id: number) {          
    const newListProducts = orderServices.filter(orderService => orderService.id !== id);
    await AsyncStorage.setItem('@stock/order-services', JSON.stringify(newListProducts));   
    setOrderServices(newListProducts);       
  }

  return (
    <OrderServiceConext.Provider 
      value={{
        createdOrderService,
        updatedOrderService,
        deleteOrderService,
        orderServices,
      }}
    >
      {children}
    </OrderServiceConext.Provider>
  );
}