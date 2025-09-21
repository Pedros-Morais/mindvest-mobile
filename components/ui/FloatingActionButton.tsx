import React, { useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { spacing, borderRadius, shadows } from '@/styles/global';

interface FloatingActionButtonProps {
  onPress: () => void;
  icon?: string;
  size?: number;
  color?: string;
  pulse?: boolean;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onPress,
  icon = '➕',
  size = 56,
  color,
  pulse = false,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const scale = useSharedValue(1);
  const pulseScale = useSharedValue(1);
  const rotation = useSharedValue(0);

  useEffect(() => {
    if (pulse) {
      pulseScale.value = withRepeat(
        withSpring(1.1, { damping: 10, stiffness: 200 }),
        -1,
        true
      );
    } else {
      pulseScale.value = withSpring(1);
    }
  }, [pulse]);

  const handlePressIn = () => {
    scale.value = withSpring(0.9, { damping: 15, stiffness: 400 });
    rotation.value = withTiming(15, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 400 });
    rotation.value = withSpring(0, { damping: 15, stiffness: 400 });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value * pulseScale.value },
        { rotate: `${rotation.value}deg` }
      ],
    };
  });

  return (
    <Animated.View style={[animatedStyle]}>
      <TouchableOpacity
        style={[
          styles.fab,
          {
            backgroundColor: color || colors.primary,
            width: size,
            height: size,
            borderRadius: size / 2,
          }
        ]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        activeOpacity={1}
      >
        <Text style={[styles.icon, { fontSize: size * 0.4 }]}>
          {icon}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  fab: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: spacing.xl,
    right: spacing.md,
    ...shadows.lg,
  },
  icon: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
