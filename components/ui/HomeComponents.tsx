import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withTiming,
  withRepeat,
  withSequence
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

// Animated Card Component
interface AnimatedCardProps {
  children: React.ReactNode;
  delay?: number;
  style?: any;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({ children, delay = 0, style }) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(30);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      opacity.value = withTiming(1, { duration: 600 });
      translateY.value = withSpring(0, { damping: 20, stiffness: 300 });
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[styles.card, animatedStyle, style]}>
      {children}
    </Animated.View>
  );
};

// Progress Bar Component
interface ProgressBarProps {
  progress: number;
  color?: string;
  backgroundColor?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  color = '#FFD700', 
  backgroundColor = '#E0E0E0' 
}) => {
  const progressWidth = useSharedValue(0);

  React.useEffect(() => {
    progressWidth.value = withTiming(progress, { duration: 1000 });
  }, [progress]);

  const progressStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value}%`,
  }));

  return (
    <View style={[styles.progressContainer, { backgroundColor }]}>
      <Animated.View style={[styles.progressFill, { backgroundColor: color }, progressStyle]} />
    </View>
  );
};

// Streak Counter Component
interface StreakCounterProps {
  streak: number;
  isActive?: boolean;
}

export const StreakCounter: React.FC<StreakCounterProps> = ({ streak, isActive = false }) => {
  const scale = useSharedValue(1);
  const glowOpacity = useSharedValue(0.3);

  React.useEffect(() => {
    if (isActive) {
      scale.value = withRepeat(
        withSequence(
          withTiming(1.1, { duration: 800 }),
          withTiming(1, { duration: 800 })
        ),
        -1,
        true
      );
      
      glowOpacity.value = withRepeat(
        withSequence(
          withTiming(0.8, { duration: 1000 }),
          withTiming(0.3, { duration: 1000 })
        ),
        -1,
        true
      );
    }
  }, [isActive]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  return (
    <View style={styles.streakContainer}>
      {isActive && (
        <Animated.View style={[styles.streakGlow, glowStyle]} />
      )}
      <Animated.View style={[styles.streakBadge, animatedStyle]}>
        <LinearGradient
          colors={['#FF6B35', '#F7931E', '#FFD700']}
          style={styles.streakGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Ionicons name="flame" size={20} color="#FFFFFF" />
          <Text style={styles.streakNumber}>{streak}</Text>
        </LinearGradient>
      </Animated.View>
      <Text style={styles.streakLabel}>dias</Text>
    </View>
  );
};

// Stat Card Component
interface StatCardProps {
  value: number | string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  delay?: number;
}

export const StatCard: React.FC<StatCardProps> = ({ value, label, icon, color, delay = 0 }) => {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      opacity.value = withTiming(1, { duration: 600 });
      scale.value = withSpring(1, { damping: 15, stiffness: 200 });
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[styles.statCard, animatedStyle]}>
      <View style={[styles.statIcon, { backgroundColor: color + '20' }]}>
        <Ionicons name={icon} size={24} color={color} />
      </View>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </Animated.View>
  );
};

// Quick Action Button Component
interface QuickActionProps {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  delay?: number;
}

export const QuickAction: React.FC<QuickActionProps> = ({ 
  title, 
  icon, 
  onPress, 
  variant = 'primary',
  delay = 0 
}) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);
  const scale = useSharedValue(1);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      opacity.value = withTiming(1, { duration: 600 });
      translateY.value = withSpring(0, { damping: 20, stiffness: 300 });
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateY: translateY.value },
      { scale: scale.value }
    ],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const isPrimary = variant === 'primary';

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          styles.quickActionButton,
          isPrimary ? styles.primaryAction : styles.secondaryAction
        ]}
      >
        {isPrimary ? (
          <LinearGradient
            colors={['#FFD700', '#FFC107', '#FF9800']}
            style={styles.actionGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons name={icon} size={20} color="#FFFFFF" />
            <Text style={styles.primaryActionText}>{title}</Text>
          </LinearGradient>
        ) : (
          <View style={styles.secondaryActionContent}>
            <Ionicons name={icon} size={18} color="#666" />
            <Text style={styles.secondaryActionText}>{title}</Text>
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  progressContainer: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginVertical: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  streakContainer: {
    alignItems: 'center',
    position: 'relative',
    marginTop: -8,
  },
  streakGlow: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFD700',
    top: -5,
  },
  streakBadge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
  streakGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 4,
  },
  streakNumber: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  streakLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    fontWeight: '500',
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  quickActionButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginVertical: 6,
  },
  primaryAction: {
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  secondaryAction: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  actionGradient: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  primaryActionText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryActionContent: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  secondaryActionText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '600',
  },
});
