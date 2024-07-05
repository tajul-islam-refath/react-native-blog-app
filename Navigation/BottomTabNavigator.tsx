import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Posts from '../pages/Posts';
import MyPosts from '../pages/MyPosts';
import NewPost from '../pages/NewPost';
import Profile from '../pages/Profile';

// screen type checking
export type RootTabParamList = {
  MyPosts: undefined;
  New: undefined;
  Posts: undefined;
  Profile: {Id: string; title: string};
  Details: {Id: string, title:string};
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Posts"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
      }}>
      <Tab.Screen
        name="Posts"
        component={Posts}
        options={{
          unmountOnBlur: true,
          tabBarLabel: 'Posts',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="format-list-bulleted-square"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MyPosts"
        component={MyPosts}
        options={{
          unmountOnBlur: true,
          tabBarLabel: 'My Posts',
          title: 'My Posts',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="format-list-bulleted-square"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="New"
        component={NewPost}
        options={{
          tabBarLabel: 'New Post',
          title: 'New Post',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="newspaper-plus"
              color={color}
              size={size}
            />
          ),
        }}
      />
  
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="face-man-profile"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
