import { useNavigation } from '@react-navigation/native';
import React, { ReactNode } from 'react';
import { Feather } from '@expo/vector-icons';

import { Container, Title, HorizontalView } from "./styles";
import { BorderlessButton } from 'react-native-gesture-handler';

interface HeaderProps {
  title: string;
  goBack?: boolean;
  children?: ReactNode;
}

export function Header({ title, goBack, children }: HeaderProps) {
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  return(
    <Container>
      <HorizontalView>
        {goBack && (
          <BorderlessButton onPress={handleGoBack}>
            <Feather name="chevron-left" size={25} color="#fff" />
          </BorderlessButton>
        )}
      </HorizontalView>

      <Title>{title}</Title>

      <HorizontalView>
        {children && children}
      </HorizontalView>
    </Container>
  );
}