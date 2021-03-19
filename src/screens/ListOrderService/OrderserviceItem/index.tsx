import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { differenceInDays, format } from 'date-fns';
import React, { useMemo } from 'react';

import { Container, OrderServiceContainer, OrderServiceContent, Text, ViewFinished, TextBold } from './styles';

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

interface OrderServiceItemProps {
  orderService: OrderService;
}

export function OrderServiceItem({ orderService }: OrderServiceItemProps) {
  const { navigate } = useNavigation();

  const createdAt = useMemo(() => {
    return format(new Date(orderService.created_at), "dd'/'MM'/'yyyy");
  }, []);

  const daysOpen = useMemo(() => {
    const difference = differenceInDays(new Date(orderService.created_at), new Date());
    return `${difference} dias`;
  }, []);

  return (
    <Container>
      <OrderServiceContainer 
        onPress={() => navigate('OrderService', { orderService })}      
      >
        <OrderServiceContent>
          <Text style={{ fontWeight: 'bold' }}>ID:
            <Text numberOfLines={1} style={{ fontWeight: 'normal' }}> {orderService.id}</Text>
          </Text>
          
          <Text style={{ fontWeight: 'bold' }}>Produto:
            <Text numberOfLines={1} style={{ fontWeight: 'normal' }}> {orderService.product.name}</Text>
          </Text>
          
          <Text style={{ fontWeight: 'bold' }}>Título:
            <Text numberOfLines={1} style={{ fontWeight: 'normal' }}> {orderService.title}</Text>
          </Text>
          
          <Text style={{ fontWeight: 'bold' }}>Data de abertura:
            <Text style={{ fontWeight: 'normal' }}> {createdAt}</Text>
          </Text>
          
          <Text style={{ fontWeight: 'bold' }}>Aberto à:
            <Text numberOfLines={1} style={{ fontWeight: 'normal' }}> {daysOpen}</Text>
          </Text>
        </OrderServiceContent>
        <Feather name="chevron-right" size={35} color="#737380" />
      </OrderServiceContainer>

      <ViewFinished open={!!orderService.finished_at}>
        <TextBold open={!!orderService.finished_at}>{!!orderService.finished_at ? 'Finalizado' : 'Aberto'}</TextBold>
      </ViewFinished>
      
    </Container>
  );
}