import React, { useEffect } from 'react';
import { ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDelay,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';
import { spacing, borderRadius, shadows } from '@/styles/global';

interface AnimatedCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  delay?: number;
  duration?: number;
  springConfig?: {
    damping?: number;
    stiffness?: number;
  };
  onAnimationComplete?: () => void;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  style,
  delay = 0,
  duration = 600,
  springConfig = { damping: 15, stiffness: 200 },
  onAnimationComplete,
}) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(30);
  const scale = useSharedValue(0.95);

  useEffect(() => {
    const animate = () => {
      opacity.value = withDelay(
        delay,
        withTiming(1, { duration: duration * 0.8 })
      );
      
      translateY.value = withDelay(
        delay,
        withSpring(0, springConfig)
      );
      
      scale.value = withDelay(
        delay,
        withSpring(1, springConfig, (finished) => {
          if (finished && onAnimationComplete) {
            runOnJS(onAnimationComplete)();
          }
        })
      );
    };

    animate();
  }, [delay, duration, springConfig, onAnimationComplete]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        { translateY: translateY.value },
        { scale: scale.value },
      ],
    };
  });

  return (
    <Animated.View style={[style, animatedStyle]}>
      {children}
    </Animated.View>
  );
};

export const FadeInView: React.FC<{
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  style?: ViewStyle;
}> = ({ children, delay = 0, duration = 500, style }) => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withDelay(
      delay,
      withTiming(1, { duration })
    );
  }, [delay, duration]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View style={[style, animatedStyle]}>
      {children}
    </Animated.View>
  );
};

export const SlideInView: React.FC<{
  children: React.ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';
  delay?: number;
  distance?: number;
  style?: ViewStyle;
}> = ({ 
  children, 
  direction = 'up', 
  delay = 0, 
  distance = 50,
  style 
}) => {
  const translateX = useSharedValue(
    direction === 'left' ? -distance : direction === 'right' ? distance : 0
  );
  const translateY = useSharedValue(
    direction === 'up' ? distance : direction === 'down' ? -distance : 0
  );
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateX.value = withDelay(
      delay,
      withSpring(0, { damping: 20, stiffness: 200 })
    );
    translateY.value = withDelay(
      delay,
      withSpring(0, { damping: 20, stiffness: 200 })
    );
    opacity.value = withDelay(
      delay,
      withTiming(1, { duration: 400 })
    );
  }, [delay, distance]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  return (
    <Animated.View style={[style, animatedStyle]}>
      {children}
    </Animated.View>
  );
};

export const PulseView: React.FC<{
  children: React.ReactNode;
  isActive?: boolean;
  style?: ViewStyle;
}> = ({ children, isActive = false, style }) => {
  const scale = useSharedValue(1);

  useEffect(() => {
    if (isActive) {
      scale.value = withSpring(1.05, { damping: 10, stiffness: 200 });
    } else {
      scale.value = withSpring(1, { damping: 15, stiffness: 300 });
    }
  }, [isActive]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <Animated.View style={[style, animatedStyle]}>
      {children}
    </Animated.View>
  );
};
