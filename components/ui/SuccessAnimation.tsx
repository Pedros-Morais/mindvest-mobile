import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
  withDelay,
  withRepeat,
  runOnJS,
} from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { spacing, fonts, borderRadius } from '@/styles/global';

interface SuccessAnimationProps {
  isVisible: boolean;
  message?: string;
  onComplete?: () => void;
  duration?: number;
}

export const SuccessAnimation: React.FC<SuccessAnimationProps> = ({
  isVisible,
  message = 'Parabéns! 🎉',
  onComplete,
  duration = 2000,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50);
  const checkScale = useSharedValue(0);
  const sparkleRotation = useSharedValue(0);

  useEffect(() => {
    if (isVisible) {
      // Main container animation
      opacity.value = withTiming(1, { duration: 300 });
      scale.value = withSpring(1, { damping: 15, stiffness: 200 });
      translateY.value = withSpring(0, { damping: 20, stiffness: 300 });
      
      // Check mark animation
      checkScale.value = withDelay(
        200,
        withSequence(
          withSpring(1.3, { damping: 10, stiffness: 300 }),
          withSpring(1, { damping: 15, stiffness: 400 })
        )
      );
      
      // Sparkle rotation
      sparkleRotation.value = withRepeat(
        withTiming(360, { duration: 1000 }),
        -1,
        false
      );
      
      // Auto hide
      const timer = setTimeout(() => {
        opacity.value = withTiming(0, { duration: 300 });
        scale.value = withTiming(0.8, { duration: 300 });
        translateY.value = withTiming(-30, { duration: 300 });
        
        if (onComplete) {
          setTimeout(() => runOnJS(onComplete)(), 300);
        }
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onComplete]);

  const containerStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        { scale: scale.value },
        { translateY: translateY.value }
      ],
    };
  });

  const checkStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: checkScale.value }],
    };
  });

  const sparkleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${sparkleRotation.value}deg` }],
    };
  });

  if (!isVisible) return null;

  return (
    <View style={styles.overlay}>
      <Animated.View style={[
        styles.container,
        { backgroundColor: colors.surface, borderColor: colors.success },
        containerStyle
      ]}>
        <Animated.View style={[styles.sparkleContainer, sparkleStyle]}>
          <Text style={styles.sparkle}>✨</Text>
          <Text style={[styles.sparkle, styles.sparkle2]}>✨</Text>
          <Text style={[styles.sparkle, styles.sparkle3]}>✨</Text>
        </Animated.View>
        
        <Animated.View style={[
          styles.checkContainer,
          { backgroundColor: colors.success },
          checkStyle
        ]}>
          <Text style={styles.checkMark}>✓</Text>
        </Animated.View>
        
        <Text style={[styles.message, { color: colors.text }]}>
          {message}
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    minWidth: 200,
    position: 'relative',
  },
  sparkleContainer: {
    position: 'absolute',
    width: 100,
    height: 100,
  },
  sparkle: {
    position: 'absolute',
    fontSize: 20,
  },
  sparkle2: {
    top: 10,
    right: 10,
  },
  sparkle3: {
    bottom: 10,
    left: 10,
  },
  checkContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  checkMark: {
    fontSize: 30,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  message: {
    fontSize: fonts.size.lg,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
