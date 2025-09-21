import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

interface CleanLogoProps {
  size?: number;
}

export const CleanLogo: React.FC<CleanLogoProps> = ({ size = 80 }) => {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);

  useEffect(() => {
    // Simple entrance animation
    opacity.value = withTiming(1, { duration: 800, easing: Easing.out(Easing.ease) });
    scale.value = withTiming(1, { duration: 800, easing: Easing.out(Easing.back(1.2)) });

    // Subtle breathing animation
    setTimeout(() => {
      scale.value = withRepeat(
        withSequence(
          withTiming(1.02, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      );
    }, 1000);
  }, []);

  const logoStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[styles.container, logoStyle]}>
      <LinearGradient
        colors={['#FFD700', '#FFC107', '#FF9800']}
        style={[styles.logoGradient, { width: size, height: size, borderRadius: size * 0.25 }]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={[styles.logoText, { fontSize: size * 0.35 }]}>M</Text>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  logoText: {
    color: '#FFFFFF',
    fontWeight: '800',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
