import React, { useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
  runOnJS,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { spacing, borderRadius, shadows } from '@/styles/global';

const { width } = Dimensions.get('window');

interface TabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

export const AnimatedTabBar: React.FC<TabBarProps> = ({ state, descriptors, navigation }) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const insets = useSafeAreaInsets();
  
  const filteredRoutes = state.routes.filter((route: any) => ['index', 'explore', 'progress', 'topics'].includes(route.name));
  const tabWidth = width / filteredRoutes.length;
  const translateX = useSharedValue(0);

  useEffect(() => {
    translateX.value = withSpring(state.index * tabWidth, {
      damping: 20,
      stiffness: 200,
    });
  }, [state.index, tabWidth]);

  const indicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const onTabPress = (route: any, index: number) => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!event.defaultPrevented) {
      navigation.navigate(route.name);
    }
  };

  return (
    <View style={[
      styles.container,
      { 
        backgroundColor: colors.surface,
        paddingBottom: insets.bottom,
        borderTopColor: colors.border
      }
    ]}>
      {/* Simple animated indicator */}
      <Animated.View
        style={[
          styles.indicator,
          {
            backgroundColor: colors.primary,
            width: tabWidth * 0.6,
            left: tabWidth * 0.2,
          },
          indicatorStyle,
        ]}
      />

      {/* Tab Buttons */}
      <View style={styles.tabsContainer}>
        {state.routes.filter((route: any) => ['index', 'explore', 'progress', 'topics'].includes(route.name)).map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          return (
            <TouchableOpacity
              key={route.key}
              style={[styles.tab, { width: tabWidth }]}
              onPress={() => onTabPress(route, index)}
              activeOpacity={0.7}
            >
              <AnimatedTabIcon
                route={route}
                isFocused={isFocused}
                options={options}
                colors={colors}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

interface AnimatedTabIconProps {
  route: any;
  isFocused: boolean;
  options: any;
  colors: any;
}

const AnimatedTabIcon: React.FC<AnimatedTabIconProps> = ({ route, isFocused, options, colors }) => {
  const scale = useSharedValue(isFocused ? 1.2 : 1);
  const translateY = useSharedValue(isFocused ? -4 : 0);
  const opacity = useSharedValue(isFocused ? 1 : 0.6);

  useEffect(() => {
    scale.value = withSpring(isFocused ? 1.2 : 1, {
      damping: 15,
      stiffness: 300,
    });
    translateY.value = withSpring(isFocused ? -4 : 0, {
      damping: 15,
      stiffness: 300,
    });
    opacity.value = withTiming(isFocused ? 1 : 0.6, { duration: 200 });
  }, [isFocused]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { translateY: translateY.value }
      ],
      opacity: opacity.value,
    };
  });

  const getCustomIcon = (routeName: string) => {
    switch (routeName) {
      case 'index':
        return '🏠';
      case 'explore':
        return '📚';
      case 'progress':
        return '📊';
      case 'topics':
        return '📝';
      default:
        return null; // Don't show unknown tabs
    }
  };

  return (
    <Animated.View style={[styles.iconContainer, animatedStyle]}>
      <View style={[
        styles.iconBackground,
        {
          backgroundColor: isFocused ? colors.primary : 'transparent',
        }
      ]}>
        <Animated.Text style={[
          styles.iconText,
          { color: isFocused ? colors.background : colors.icon }
        ]}>
          {getCustomIcon(route.name)}
        </Animated.Text>
      </View>
      <Animated.Text style={[
        styles.labelText,
        { 
          color: isFocused ? colors.primary : colors.icon,
          fontWeight: isFocused ? '600' : '400'
        }
      ]}>
        {options.title}
      </Animated.Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    borderTopWidth: 1,
    ...shadows.sm,
  },
  indicator: {
    position: 'absolute',
    top: 0,
    height: 3,
    borderRadius: borderRadius.sm,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingTop: spacing.sm,
    paddingHorizontal: spacing.xs,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBackground: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  iconText: {
    fontSize: 20,
  },
  labelText: {
    fontSize: 11,
    textAlign: 'center',
  },
});
