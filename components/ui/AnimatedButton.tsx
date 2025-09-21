import React, { useEffect } from 'react';
import { TouchableOpacity, Text, ViewStyle, TextStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { spacing, fonts, borderRadius, shadows } from '@/styles/global';

interface AnimatedButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: string;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  icon,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const scale = useSharedValue(1);
  const opacity = useSharedValue(disabled ? 0.6 : 1);
  const loadingRotation = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(disabled ? 0.6 : 1, { duration: 200 });
  }, [disabled]);

  useEffect(() => {
    if (loading) {
      loadingRotation.value = withTiming(360, { duration: 1000 }, (finished) => {
        if (finished) {
          loadingRotation.value = 0;
          loadingRotation.value = withTiming(360, { duration: 1000 });
        }
      });
    }
  }, [loading]);

  const handlePressIn = () => {
    if (!disabled && !loading) {
      scale.value = withSpring(0.95, { damping: 15, stiffness: 400 });
    }
  };

  const handlePressOut = () => {
    if (!disabled && !loading) {
      scale.value = withSpring(1, { damping: 15, stiffness: 400 });
    }
  };

  const handlePress = () => {
    if (!disabled && !loading) {
      // Add haptic feedback animation
      scale.value = withSpring(0.9, { damping: 10, stiffness: 400 }, () => {
        scale.value = withSpring(1, { damping: 15, stiffness: 400 });
      });
      
      setTimeout(() => {
        runOnJS(onPress)();
      }, 100);
    }
  };

  const getButtonColors = () => {
    switch (variant) {
      case 'primary':
        return {
          background: colors.primary,
          text: colors.background,
        };
      case 'secondary':
        return {
          background: colors.surface,
          text: colors.text,
        };
      case 'success':
        return {
          background: colors.success,
          text: colors.background,
        };
      case 'warning':
        return {
          background: colors.warning,
          text: colors.background,
        };
      case 'error':
        return {
          background: colors.error,
          text: colors.background,
        };
      default:
        return {
          background: colors.primary,
          text: colors.background,
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          paddingVertical: spacing.sm,
          paddingHorizontal: spacing.md,
          fontSize: fonts.size.sm,
        };
      case 'medium':
        return {
          paddingVertical: spacing.md,
          paddingHorizontal: spacing.lg,
          fontSize: fonts.size.md,
        };
      case 'large':
        return {
          paddingVertical: spacing.lg,
          paddingHorizontal: spacing.xl,
          fontSize: fonts.size.lg,
        };
      default:
        return {
          paddingVertical: spacing.md,
          paddingHorizontal: spacing.lg,
          fontSize: fonts.size.md,
        };
    }
  };

  const buttonColors = getButtonColors();
  const sizeStyles = getSizeStyles();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  const loadingStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${loadingRotation.value}deg` }],
    };
  });

  return (
    <Animated.View style={[animatedStyle]}>
      <TouchableOpacity
        style={[
          {
            backgroundColor: buttonColors.background,
            paddingVertical: sizeStyles.paddingVertical,
            paddingHorizontal: sizeStyles.paddingHorizontal,
            borderRadius: borderRadius.md,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            ...shadows.sm,
          },
          variant === 'secondary' && {
            borderWidth: 2,
            borderColor: colors.border,
          },
          style,
        ]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        disabled={disabled || loading}
        activeOpacity={1}
      >
        {loading && (
          <Animated.Text
            style={[
              {
                color: buttonColors.text,
                fontSize: sizeStyles.fontSize,
                marginRight: spacing.sm,
              },
              loadingStyle,
            ]}
          >
            ⟳
          </Animated.Text>
        )}
        
        {icon && !loading && (
          <Text
            style={{
              color: buttonColors.text,
              fontSize: sizeStyles.fontSize,
              marginRight: spacing.sm,
            }}
          >
            {icon}
          </Text>
        )}
        
        <Text
          style={[
            {
              color: buttonColors.text,
              fontSize: sizeStyles.fontSize,
              fontWeight: '600',
            },
            textStyle,
          ]}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};
