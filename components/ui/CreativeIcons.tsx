import React from 'react';
import { View, StyleSheet } from 'react-native';
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

interface CreativeIconProps {
  name: string;
  size?: number;
  color?: string;
  isActive?: boolean;
}

export const CreativeIcon: React.FC<CreativeIconProps> = ({ 
  name, 
  size = 24, 
  color, 
  isActive = false 
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const iconColor = color || (isActive ? colors.primary : colors.icon);
  
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const bounce = useSharedValue(0);

  React.useEffect(() => {
    if (isActive) {
      // Bounce animation for active state
      bounce.value = withRepeat(
        withSpring(-2, { damping: 10, stiffness: 200 }),
        2,
        true
      );
      
      // Scale animation
      scale.value = withSpring(1.1, { damping: 15, stiffness: 300 });
    } else {
      bounce.value = withSpring(0);
      scale.value = withSpring(1);
    }
  }, [isActive]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { translateY: bounce.value },
        { rotate: `${rotation.value}deg` }
      ],
    };
  });

  const getIconComponent = () => {
    switch (name) {
      case 'home':
        return <HomeIcon size={size} color={iconColor} isActive={isActive} />;
      case 'lessons':
        return <LessonsIcon size={size} color={iconColor} isActive={isActive} />;
      case 'progress':
        return <ProgressIcon size={size} color={iconColor} isActive={isActive} />;
      case 'achievements':
        return <AchievementsIcon size={size} color={iconColor} isActive={isActive} />;
      default:
        return <HomeIcon size={size} color={iconColor} isActive={isActive} />;
    }
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {getIconComponent()}
    </Animated.View>
  );
};

const HomeIcon: React.FC<{ size: number; color: string; isActive: boolean }> = ({ size, color, isActive }) => {
  const sparkle = useSharedValue(0);
  
  React.useEffect(() => {
    if (isActive) {
      sparkle.value = withRepeat(
        withTiming(1, { duration: 1000 }),
        -1,
        true
      );
    } else {
      sparkle.value = withTiming(0);
    }
  }, [isActive]);

  const sparkleStyle = useAnimatedStyle(() => {
    const opacity = interpolate(sparkle.value, [0, 0.5, 1], [0.3, 1, 0.3]);
    return { opacity };
  });

  return (
    <View style={[styles.iconWrapper, { width: size, height: size }]}>
      <View style={[styles.house, { borderBottomColor: color, borderBottomWidth: size * 0.6 }]}>
        <View style={[styles.houseTop, { 
          borderLeftWidth: size * 0.3,
          borderRightWidth: size * 0.3,
          borderBottomWidth: size * 0.25,
          borderBottomColor: color,
        }]} />
        <View style={[styles.door, { 
          backgroundColor: color,
          width: size * 0.2,
          height: size * 0.3,
        }]} />
      </View>
      {isActive && (
        <Animated.View style={[styles.sparkle, sparkleStyle]}>
          <View style={[styles.sparkleItem, { backgroundColor: color }]} />
          <View style={[styles.sparkleItem, { backgroundColor: color }]} />
        </Animated.View>
      )}
    </View>
  );
};

const LessonsIcon: React.FC<{ size: number; color: string; isActive: boolean }> = ({ size, color, isActive }) => {
  const pageFlip = useSharedValue(0);
  
  React.useEffect(() => {
    if (isActive) {
      pageFlip.value = withRepeat(
        withTiming(1, { duration: 800 }),
        -1,
        true
      );
    } else {
      pageFlip.value = withTiming(0);
    }
  }, [isActive]);

  const pageStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(pageFlip.value, [0, 0.5, 1], [0, 180, 0]);
    return {
      transform: [{ rotateY: `${rotateY}deg` }]
    };
  });

  return (
    <View style={[styles.iconWrapper, { width: size, height: size }]}>
      <View style={[styles.book, { 
        borderColor: color,
        width: size * 0.8,
        height: size * 0.9,
      }]}>
        <Animated.View style={[styles.bookPage, pageStyle, { backgroundColor: color }]} />
        <View style={[styles.bookSpine, { backgroundColor: color }]} />
      </View>
    </View>
  );
};

const ProgressIcon: React.FC<{ size: number; color: string; isActive: boolean }> = ({ size, color, isActive }) => {
  const progress = useSharedValue(0);
  
  React.useEffect(() => {
    if (isActive) {
      progress.value = withRepeat(
        withTiming(1, { duration: 1500 }),
        -1,
        false
      );
    } else {
      progress.value = withTiming(0.7);
    }
  }, [isActive]);

  const barStyle = useAnimatedStyle(() => {
    const height = interpolate(progress.value, [0, 1], [size * 0.2, size * 0.8]);
    return { height };
  });

  return (
    <View style={[styles.iconWrapper, { width: size, height: size }]}>
      <View style={styles.chartContainer}>
        <View style={[styles.chartBar, { backgroundColor: color, height: size * 0.4 }]} />
        <Animated.View style={[styles.chartBar, barStyle, { backgroundColor: color }]} />
        <View style={[styles.chartBar, { backgroundColor: color, height: size * 0.6 }]} />
      </View>
    </View>
  );
};

const AchievementsIcon: React.FC<{ size: number; color: string; isActive: boolean }> = ({ size, color, isActive }) => {
  const glow = useSharedValue(0);
  
  React.useEffect(() => {
    if (isActive) {
      glow.value = withRepeat(
        withTiming(1, { duration: 1000 }),
        -1,
        true
      );
    } else {
      glow.value = withTiming(0);
    }
  }, [isActive]);

  const glowStyle = useAnimatedStyle(() => {
    const scale = interpolate(glow.value, [0, 1], [1, 1.2]);
    const opacity = interpolate(glow.value, [0, 1], [1, 0.7]);
    return {
      transform: [{ scale }],
      opacity,
    };
  });

  return (
    <View style={[styles.iconWrapper, { width: size, height: size }]}>
      <Animated.View style={[styles.trophy, glowStyle]}>
        <View style={[styles.trophyTop, { 
          backgroundColor: color,
          width: size * 0.6,
          height: size * 0.4,
        }]} />
        <View style={[styles.trophyBase, { 
          backgroundColor: color,
          width: size * 0.8,
          height: size * 0.2,
        }]} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  // Home Icon Styles
  house: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    position: 'relative',
  },
  houseTop: {
    position: 'absolute',
    top: 0,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  door: {
    position: 'absolute',
    bottom: 0,
    borderRadius: 2,
  },
  sparkle: {
    position: 'absolute',
    top: -5,
    right: -5,
  },
  sparkleItem: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    margin: 1,
  },
  // Book Icon Styles
  book: {
    borderWidth: 2,
    borderRadius: 2,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookPage: {
    width: '80%',
    height: '80%',
    borderRadius: 1,
    opacity: 0.3,
  },
  bookSpine: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 3,
  },
  // Chart Icon Styles
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
  },
  chartBar: {
    width: 6,
    borderRadius: 3,
    marginHorizontal: 1,
  },
  // Trophy Icon Styles
  trophy: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  trophyTop: {
    borderRadius: 8,
    marginBottom: 2,
  },
  trophyBase: {
    borderRadius: 4,
  },
});
