import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Shield, Settings, Globe } from 'lucide-react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppProvider } from '../context/AppContext';
import HomeScreen from '../screens/HomeScreen';
import LocationsScreen from '../screens/LocationsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { colors, font, fontSize } from '../theme';

const Tab = createBottomTabNavigator();

const NAV_THEME = {
  ...DarkTheme,
  dark: true,
  colors: {
    ...DarkTheme.colors,
    background: colors.bg,
    card: colors.surface,
    text: colors.text,
    border: colors.border,
    primary: colors.text,
    notification: colors.success,
  },
};

function TabBarIcon({ name, focused }: { name: 'home' | 'locations' | 'settings'; focused: boolean }) {
  const color = focused ? colors.text : colors.textDim;
  const size = 22;
  if (name === 'home') return <Shield size={size} color={color} strokeWidth={1.8} />;
  if (name === 'locations') return <Globe size={size} color={color} strokeWidth={1.8} />;
  return <Settings size={size} color={color} strokeWidth={1.8} />;
}

function RootTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.textDim,
        tabBarLabelStyle: {
          fontFamily: font.mono,
          fontSize: fontSize.xs,
          letterSpacing: 0.5,
          marginBottom: 4,
        },
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: StyleSheet.hairlineWidth,
          height: 62,
          paddingTop: 6,
        },
        tabBarIcon: ({ focused }) => {
          const key = route.name === 'Home' ? 'home' : route.name === 'Locations' ? 'locations' : 'settings';
          return <TabBarIcon name={key as 'home' | 'locations' | 'settings'} focused={focused} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Locations" component={LocationsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <NavigationContainer theme={NAV_THEME}>
          <View style={{ flex: 1, backgroundColor: colors.bg }}>
            <RootTabs />
          </View>
        </NavigationContainer>
      </AppProvider>
    </SafeAreaProvider>
  );
}
