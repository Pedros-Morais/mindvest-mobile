import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withDelay,
  interpolate,
} from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

const { width, height } = Dimensions.get('window');

interface ParticleProps {
  delay: number;
  color: string;
  size: number;
  startX: number;
  startY: number;
}

const Particle: React.FC<ParticleProps> = ({ delay, color, size, startX, startY }) => {
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0);

  useEffect(() => {
    translateY.value = withDelay(
      delay,
      withRepeat(
        withTiming(-height * 0.3, { duration: 2000 }),
        -1,
        false
      )
    );
    
    opacity.value = withDelay(
      delay,
      withRepeat(
        withTiming(1, { duration: 500 }, () => {
          opacity.value = withTiming(0, { duration: 1500 });
        }),
        -1,
        false
      )
    );

    scale.value = withDelay(
      delay,
      withRepeat(
        withTiming(1, { duration: 2000 }),
        -1,
        false
      )
    );
  }, [delay]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: startX },
        { translateY: translateY.value },
        { scale: scale.value }
      ],
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View
      style={[
        styles.particle,
        {
          backgroundColor: color,
          width: size,
          height: size,
          borderRadius: size / 2,
          top: startY,
        },
        animatedStyle,
      ]}
    />
  );
};

interface ParticleEffectProps {
  isActive: boolean;
  particleCount?: number;
  colors?: string[];
}

export const ParticleEffect: React.FC<ParticleEffectProps> = ({
  isActive,
  particleCount = 8,
  colors: customColors,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const defaultColors = [
    colors.primary,
    colors.secondary,
    colors.success,
    colors.warning,
  ];
  
  const particleColors = customColors || defaultColors;

  if (!isActive) return null;

  return (
    <View style={styles.container} pointerEvents="none">
      {Array.from({ length: particleCount }).map((_, index) => (
        <Particle
          key={index}
          delay={index * 200}
          color={particleColors[index % particleColors.length]}
          size={Math.random() * 8 + 4}
          startX={Math.random() * width}
          startY={height * 0.8 + Math.random() * 100}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  particle: {
    position: 'absolute',
  },
});
