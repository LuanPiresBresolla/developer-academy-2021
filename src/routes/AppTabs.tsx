import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ListOrderService } from '../screens/ListOrderService';
import { ListProducts } from '../screens/ListProducts';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppTabs() {
  return (
    <Navigator
      tabBarOptions={{
        style: {
          elevation: 0,
          shadowOpacity: 0,
          height: 64,
        },
        tabStyle: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        },
        iconStyle: {
          flex: 0,
          width: 20,
          height: 20,
        },
        labelStyle: {
          fontFamily: 'RobotoSlab_600SemiBold',
          fontSize: 13,
          marginLeft: 16,
        },
        inactiveBackgroundColor: '#fafafc',
        activeBackgroundColor: '#F4F5F6',
        inactiveTintColor: '#AEAEB3',
        activeTintColor: '#DC1637',
      }}
    >
      <Screen name="Chamados" component={ListOrderService} />
      <Screen name="ListProducts" options={{ title: 'Produtos' }} component={ListProducts} />
    </Navigator>
    );
  }