import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import store from './redux/store';

// Screens
import HomeScreen from './screens/HomeScreen';
import AddDiaryScreen from './screens/AddDiaryScreen';
import ProfileScreen from './screens/ProfileScreen';
import TodoListScreen from './screens/TodoListScreen';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: true,
            tabBarActiveTintColor: '#FF6B9D',
            tabBarInactiveTintColor: '#999',
          }}>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'Memories',
              tabBarLabel: 'Memories',
            }}
          />
          <Tab.Screen
            name="TodoList"
            component={TodoListScreen}
            options={{
              title: 'To-Do List',
              tabBarLabel: 'To-Do',
            }}
          />
          <Tab.Screen
            name="AddDiary"
            component={AddDiaryScreen}
            options={{
              title: 'Add Memory',
              tabBarLabel: 'Add',
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              title: 'Profile',
              tabBarLabel: 'Profile',
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
