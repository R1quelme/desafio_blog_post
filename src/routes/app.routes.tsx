import React from "react";
import { Platform } from 'react-native';
import { useTheme } from 'styled-components';
import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

import { Dashboard } from "../screens/Dashboard"; 
import { Register } from "../screens/Register";
import { View } from "../screens/View";
import { Api } from "../screens/ScreenApi";
import { Posts } from "../screens/Posts";

export function TabRoutes(){
    const theme = useTheme();

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.colors.secondary,
                tabBarInactiveTintColor: theme.colors.text,
                tabBarLabelPosition: 'beside-icon',
                tabBarStyle: {
                    height: 88,
                    paddingVertical: Platform.OS === 'ios' ? 10 : 0,
                }
            }}
        >
            <Tab.Screen 
                name="Dashboard"
                component={Dashboard}
                options={{
                    tabBarIcon: (({size, color}) => 
                        <MaterialIcons 
                            name="account-circle"
                            size={size}
                            color={color}
                        />
                    )
                }}
            />
            <Tab.Screen 
                name="Posts"
                component={Posts}
                options={{
                    tabBarIcon: (({size, color}) => 
                        <MaterialIcons 
                            name="account-circle"
                            size={size}
                            color={color}
                        />
                    )
                }}
            />
            <Tab.Screen 
                name="Publicar"
                component={Register}
                options={{
                    tabBarIcon: (({size, color}) => 
                        <MaterialIcons 
                            name="app-registration"
                            size={size}
                            color={color}
                        />
                    )
                }}
            />
            <Tab.Screen 
                name="API"
                component={Api}
                options={{
                    tabBarIcon: (({size, color}) => 
                        <MaterialIcons 
                            name="api"
                            size={size}
                            color={color}
                        />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

export function AppRoutes() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen 
                name="App"
                component={TabRoutes}
            />
            <Stack.Screen 
                name="View"
                component={View}
            />
        </Stack.Navigator>
    )
}



