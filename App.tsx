import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import { RobotoSlab_400Regular, RobotoSlab_500Medium, RobotoSlab_600SemiBold, useFonts } from '@expo-google-fonts/roboto-slab';

import { AppStack } from './src/routes/AppStack';
import { ProductsProvider } from './src/context/products';
import { OrderServiceProvider } from './src/context/orderServices';

LogBox.ignoreAllLogs();

export default function App() {
  let [fontsLoaded] = useFonts({
    RobotoSlab_400Regular,
    RobotoSlab_500Medium,
    RobotoSlab_600SemiBold,
  });

  if(!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <NavigationContainer>
      <OrderServiceProvider>
        <ProductsProvider>
          <StatusBar backgroundColor="#1B1B1F" barStyle="light-content" />
          <AppStack />
        </ProductsProvider>
      </OrderServiceProvider>
    </NavigationContainer>
  );
}