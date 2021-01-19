import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import Main from '../screens/Main';
import Favorite from '../screens/Favorite';

const Tab = createBottomTabNavigator();

const AppRoutes: React.FC = () => (
  <NavigationContainer>
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: () => {
          let iconName: string;

          if (route.name === 'Herois') {
            iconName = 'list';
          } else if (route.name === 'Favoriros') {
            iconName = 'heart';
          }
          return <Icon name={iconName} size={16} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#EB2227',
        labelPosition: 'beside-icon',
      }}>
      <Tab.Screen name="Herois" component={Main} />
      <Tab.Screen name="Favoriros" component={Favorite} />
    </Tab.Navigator>
  </NavigationContainer>
);

export default AppRoutes;
