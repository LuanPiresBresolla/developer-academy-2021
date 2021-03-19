import { useContext } from 'react';
import { OrderServiceConextData, OrderServiceConext } from '../context/orderServices';

export function useOrderServices(): OrderServiceConextData {
  const context = useContext(OrderServiceConext);
  if (!context) {
    throw new Error('useOrderServices must be used within an OrderServicesProvider');
  }
  return context;
}
