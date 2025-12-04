import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, PieChart, ShoppingCart, Calendar, Settings, Wallet, Plus } from 'lucide-react-native';
import { View } from 'react-native';

import DashboardScreen from '../screens/DashboardScreen';
import { useTheme } from '../context/ThemeContext';

// Placeholder screens for other tabs
const PlaceholderScreen = ({ title }: { title: string }) => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Home size={48} color="gray" />
    </View>
);

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => {
    const { theme, colors } = useTheme();
    const isDark = theme === 'dark';

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: isDark ? '#0F172A' : '#ffffff',
                    borderTopWidth: 0,
                    elevation: 0,
                    height: 70,
                    paddingBottom: 10,
                    paddingTop: 10,
                    position: 'absolute',
                    bottom: 20,
                    left: 20,
                    right: 20,
                    borderRadius: 35,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 10,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.5,
                },
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: 'gray',
                tabBarShowLabel: true,
                tabBarLabelStyle: {
                    fontSize: 10,
                    fontWeight: '600',
                }
            }}
        >
            <Tab.Screen
                name="Dashboard"
                component={DashboardScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size, focused }) => <Home color={color} size={24} strokeWidth={focused ? 2.5 : 2} />,
                }}
            />
            <Tab.Screen
                name="Budget"
                children={() => <PlaceholderScreen title="Budget" />}
                options={{
                    tabBarIcon: ({ color, size, focused }) => <Wallet color={color} size={24} strokeWidth={focused ? 2.5 : 2} />,
                }}
            />
            <Tab.Screen
                name="Add"
                children={() => <PlaceholderScreen title="Add" />}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <View
                            className="items-center justify-center"
                            style={{
                                width: 56,
                                height: 56,
                                borderRadius: 28,
                                backgroundColor: colors.primary,
                                top: -20,
                                shadowColor: colors.primary,
                                shadowOffset: { width: 0, height: 8 },
                                shadowOpacity: 0.5,
                                shadowRadius: 8,
                                elevation: 5,
                            }}
                        >
                            <Plus color="white" size={28} />
                        </View>
                    ),
                    tabBarLabel: () => null,
                }}
            />
            <Tab.Screen
                name="Shopping"
                children={() => <PlaceholderScreen title="Shopping" />}
                options={{
                    tabBarLabel: 'Analysis',
                    tabBarIcon: ({ color, size, focused }) => <PieChart color={color} size={24} strokeWidth={focused ? 2.5 : 2} />,
                }}
            />
            <Tab.Screen
                name="Settings"
                children={() => <PlaceholderScreen title="Settings" />}
                options={{
                    tabBarIcon: ({ color, size, focused }) => <Settings color={color} size={24} strokeWidth={focused ? 2.5 : 2} />,
                }}
            />
        </Tab.Navigator>
    );
};

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Main" component={TabNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
