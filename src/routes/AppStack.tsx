import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { AppTabs } from './AppTabs';
import { Product } from '../screens/ListProducts/Product';
import { OrderService } from '../screens/ListOrderService/OrderService';

const { Navigator, Screen } = createStackNavigator();

export function AppStack() {
  return (
    <Navigator    
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="AppTabs" component={AppTabs} />
      <Screen name="Product" component={Product} />
      <Screen name="OrderService" component={OrderService} />
    </Navigator>
    );
  }