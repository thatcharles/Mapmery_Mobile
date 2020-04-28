import React, { Component } from 'react';
import {StyleSheet, Text, View, Button, TextInput,TouchableOpacity } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import ViewNotes from '../screens/ViewNotes'
import AddNotes from '../screens/AddNotes'
import Login from '../screens/Login'
import Test from '../screens/test'
import Home from '../screens/Home'
import Collection from '../screens/Collection'
import Profile from '../screens/Profile'
import TabBar from '../components/TabBar'
import { Ionicons} from '@expo/vector-icons'

/**
 * a mode property for the stack navigator. 
 * The value of this property is used to define a specific way to render styles and transitions. 
 * The default value of this property is card for screen transitions in iOS and Android.
 */

const ViewNotesNavigator = createStackNavigator(
  {
    ViewNotes: {
      screen: ViewNotes
    },
    AddNotes: {
      screen: AddNotes
    }
  },
  {
    initialRouteName: 'ViewNotes',
    headerMode: 'none',
    mode: 'modal'
  }
)

const iconSize = 35;
const HomeBottomTabNavigator = createBottomTabNavigator(
  {
      Home: {
        screen: Home,
        navigationOptions: {
          tabBarIcon: ({ focused, tintColor }) => {
            const iconName = `md-home${focused ? '' : ''}`;
            tintColor = focused ? '#FF0058' : 'white'
            return <Ionicons name={iconName} size={iconSize} color={tintColor} />;
          }
        }
      },
      Collection: {
        screen: Collection,
        navigationOptions: {
          tabBarIcon: ({ focused, tintColor }) => {
            const iconName = `md-journal${focused ? '' : ''}`;
            tintColor = focused ? '#FF0058' : 'white'
            return <Ionicons name={iconName} size={iconSize} color={tintColor} />;
          }
        }
      },
      Profile: {
        screen: Profile,
        navigationOptions: {
          tabBarIcon: ({ focused, tintColor }) => {
            const iconName = `md-person${focused ? '' : ''}`;
            tintColor = focused ? '#FF0058' : 'white'
            return <Ionicons name={iconName} size={iconSize} color={tintColor} />;
          }
        }
      },
      ViewNotes: {
        screen: ViewNotesNavigator,
        navigationOptions: {
          tabBarIcon: ({ focused, tintColor }) => {
            const iconName = `md-business${focused ? '' : ''}`;
            tintColor = focused ? '#FF0058' : 'white'
            return <Ionicons name={iconName} size={iconSize} color={tintColor} />;
          }
        }
      }
  },
  {
      initialRouteName: 'Home',
      tabBarComponent: TabBar,
      tabBarOptions: { 
        showLabel: true,
        style: {
          height: 55,
          backgroundColor: '#FF0058',
        },
        activeBackgroundColor: '#FFFFFF'
      },
      headerMode: 'none',
      mode: 'modal'
  }
)

const HomeStackNavigator = createStackNavigator(
  { 
      HomeBottomTabNavigator: HomeBottomTabNavigator
  },
  {
      headerMode: 'none',
      mode: 'modal'
  }
)

// Use createSwitchNavigator when ready
const SwitchNavigator = createStackNavigator(
  {
    Login:{
      screen: Login
    },
    /*
    ViewNotes: {
      screen: ViewNotes
    },
    AddNotes: {
      screen: AddNotes
    },
    */
    Home: {screen: HomeStackNavigator},
    Test: {
      screen: Test
    }
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
    mode: 'modal'
  }
)

export default createAppContainer(SwitchNavigator)