import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const ProductContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;

  background: #DEDEE3;
  padding: 5%;
  border-radius: 5px;
  margin-bottom: 2%;
`;

export const ProductContent = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

export const Text = styled.Text`
  font-family: 'RobotoSlab_400Regular';
  color: #47474D;
  font-size: 14px;
`;

export const Price = styled.Text`
  font-family: 'RobotoSlab_400Regular';
  color: #DC1637;
  font-size: 14px;
`;