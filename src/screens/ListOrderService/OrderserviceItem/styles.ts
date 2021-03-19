import styled from 'styled-components/native';

interface ViewFinishedProps {
  open: boolean;
}

export const Container = styled.View`
  flex: 1;
`;

export const OrderServiceContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;

  background: #DEDEE3;
  padding: 5%;
  border-radius: 5px;
  margin-bottom: 2%;
`;

export const OrderServiceContent = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

export const Text = styled.Text`
  font-family: 'RobotoSlab_400Regular';
  color: #47474D;
  font-size: 14px;
`;

export const ViewFinished = styled.View<ViewFinishedProps>`
  background: ${props => props.open ? '#DAF3E5' : '#FDEDEF'};
  height: 20px;
  width: 100%;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  margin-top: -3%;
  margin-bottom: 2%;
`;

export const TextBold = styled.Text<ViewFinishedProps>`
  font-family: 'RobotoSlab_600SemiBold';
  color: ${props => props.open ? '#03B252' : '#DC1637'};
  font-size: 14px;
`;