import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  padding: 5%;
`;

export const SubmitButton = styled(RectButton)`
  width: 100%;
  height: 50px;
  background: #DC1637;
  margin-top: 2%;

  align-items: center;
  justify-content: center;
`;

export const SubmitButtonText = styled.Text`
  font-family: 'RobotoSlab_600SemiBold';
  color: #fff;
  font-size: 14px;
`;