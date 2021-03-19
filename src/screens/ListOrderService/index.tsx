import React from 'react';
import { ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { BorderlessButton } from 'react-native-gesture-handler';

import { Header } from '../../components/Header';

import { Container } from './styles';
import { useOrderServices } from '../../hooks/useOrderServices';
import { OrderServiceItem } from './OrderserviceItem';

export function ListOrderService() {
  const { navigate } = useNavigation();
  const { orderServices } = useOrderServices();
  
  return (   
    <Container>
      <Header title="Controle de chamados">
        <BorderlessButton onPress={() => navigate('OrderService', { orderService: null })}>
          <Feather name="plus-circle" size={25} color="#fff" />
        </BorderlessButton>
      </Header>

      <ScrollView 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={{ padding: '5%' }}
      >
        {orderServices && orderServices.map(orderService => (
          <OrderServiceItem key={orderService.id} orderService={orderService} />
        ))}
      </ScrollView>
    </Container>
  );
};