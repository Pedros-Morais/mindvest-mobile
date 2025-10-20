import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { AnimatedTabBar } from '@/components/ui/AnimatedTabBar';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      tabBar={(props) => <AnimatedTabBar {...props} />}
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarStyle: {
          display: 'none', // Hide default tab bar since we're using custom one
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Lições',
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progresso',
        }}
      />
      <Tabs.Screen
        name="topics"
        options={{
          title: 'Tópicos',
        }}
      />
    </Tabs>
  );
}
