import React from 'react';
import { ScrollView } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { Header } from '../../components/Header';

import { Container, ProductContainer, ProductContent, Text } from './styles';
import { useProducts } from '../../hooks/useProducts';

export function ListProducts() {
  const { navigate } = useNavigation();
  const { products } = useProducts();

  return (
    <Container>
      <Header title="Lista de produtos">
        <BorderlessButton onPress={() => navigate('Product', { product: {} })}>
          <Feather name="plus-circle" size={25} color="#fff" />
        </BorderlessButton>
      </Header>

      <ScrollView 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={{ padding: '5%' }}
      >
        {products && products.map(product => (
          <ProductContainer key={product.id} onPress={() => navigate('Product', { product })}>
            <ProductContent>
              <Text style={{ fontWeight: 'bold' }}>ID:
                <Text numberOfLines={1} style={{ fontWeight: 'normal' }}> {product.id}</Text>
              </Text>

              <Text style={{ fontWeight: 'bold' }}>Nome:
                <Text numberOfLines={1} style={{ fontWeight: 'normal' }}> {product.name}</Text>
              </Text>

              <Text style={{ fontWeight: 'bold' }}>Nº série:
                <Text numberOfLines={1} style={{ fontWeight: 'normal' }}> {product.serie}</Text>
              </Text>

              <Text style={{ fontWeight: 'bold' }}>Fabricante:
                <Text numberOfLines={1} style={{ fontWeight: 'normal' }}> {product.manufacturer}</Text>
              </Text>
            </ProductContent>
            <Feather name="chevron-right" size={35} color="#737380" />
          </ProductContainer>
        ))}
      </ScrollView>
    </Container>
  );
};