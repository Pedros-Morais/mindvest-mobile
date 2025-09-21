import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSpring,
  withSequence,
  interpolate,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

const { width, height } = Dimensions.get('window');

interface FloatingCubeProps {
  size?: number;
  color?: string;
  delay?: number;
  duration?: number;
}

export const FloatingCube: React.FC<FloatingCubeProps> = ({
  size = 60,
  color,
  delay = 0,
  duration = 3000,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const rotateX = useSharedValue(0);
  const rotateY = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    // Rotação 3D contínua
    rotateX.value = withRepeat(
      withTiming(360, { duration: duration }),
      -1,
      false
    );
    
    rotateY.value = withRepeat(
      withTiming(360, { duration: duration * 1.5 }),
      -1,
      false
    );
    
    // Movimento flutuante
    translateY.value = withRepeat(
      withSequence(
        withTiming(-20, { duration: duration / 2 }),
        withTiming(20, { duration: duration / 2 })
      ),
      -1,
      true
    );
    
    // Pulsação sutil
    scale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: duration / 3 }),
        withTiming(0.9, { duration: duration / 3 }),
        withTiming(1, { duration: duration / 3 })
      ),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotateX: `${rotateX.value}deg` },
        { rotateY: `${rotateY.value}deg` },
        { translateY: translateY.value },
        { scale: scale.value },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        styles.cube,
        {
          width: size,
          height: size,
          backgroundColor: color || colors.primary,
        },
        animatedStyle,
      ]}
    />
  );
};

interface FloatingSphereProps {
  size?: number;
  color?: string;
  delay?: number;
}

export const FloatingSphere: React.FC<FloatingSphereProps> = ({
  size = 40,
  color,
  delay = 0,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    // Entrada animada
    scale.value = withSpring(1, { damping: 15, stiffness: 200 });
    opacity.value = withTiming(1, { duration: 800 });
    
    // Movimento orbital
    translateX.value = withRepeat(
      withTiming(50, { duration: 4000 }),
      -1,
      true
    );
    
    translateY.value = withRepeat(
      withSequence(
        withTiming(-30, { duration: 2000 }),
        withTiming(30, { duration: 2000 })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
      ],
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View
      style={[
        styles.sphere,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color || colors.secondary,
        },
        animatedStyle,
      ]}
    />
  );
};

interface ParallaxBackgroundProps {
  children: React.ReactNode;
}

export const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({ children }) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  return (
    <View style={[styles.parallaxContainer, { backgroundColor: colors.background }]}>
      {/* Elementos 3D de fundo - apenas círculos */}
      <View style={styles.backgroundElements}>
        <View style={[styles.element, styles.element1]}>
          <FloatingSphere size={80} color={colors.primary + '20'} />
        </View>
        <View style={[styles.element, styles.element2]}>
          <FloatingSphere size={60} color={colors.secondary + '30'} />
        </View>
        <View style={[styles.element, styles.element3]}>
          <FloatingSphere size={40} color={colors.success + '25'} />
        </View>
        <View style={[styles.element, styles.element4]}>
          <FloatingSphere size={30} color={colors.warning + '40'} />
        </View>
        <View style={[styles.element, styles.element5]}>
          <FloatingSphere size={25} color={colors.primary + '15'} />
        </View>
        <View style={[styles.element, styles.element6]}>
          <FloatingSphere size={35} color={'#FFD700' + '20'} />
        </View>
      </View>
      
      {/* Gradiente overlay */}
      <View style={[styles.gradientOverlay, { 
        backgroundColor: colorScheme === 'dark' 
          ? 'rgba(0, 0, 0, 0.3)' 
          : 'rgba(255, 255, 255, 0.1)' 
      }]} />
      
      {/* Conteúdo */}
      {children}
    </View>
  );
};

interface MorphingShapeProps {
  isActive: boolean;
  color?: string;
}

export const MorphingShape: React.FC<MorphingShapeProps> = ({ isActive, color }) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const borderRadius = useSharedValue(50);
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  useEffect(() => {
    if (isActive) {
      // Morphing animation
      borderRadius.value = withRepeat(
        withSequence(
          withTiming(10, { duration: 1000 }),
          withTiming(50, { duration: 1000 }),
          withTiming(25, { duration: 1000 })
        ),
        -1,
        false
      );
      
      scale.value = withRepeat(
        withSequence(
          withSpring(1.2, { damping: 10 }),
          withSpring(0.8, { damping: 10 }),
          withSpring(1, { damping: 10 })
        ),
        -1,
        false
      );
      
      rotation.value = withRepeat(
        withTiming(360, { duration: 3000 }),
        -1,
        false
      );
    } else {
      borderRadius.value = withSpring(50);
      scale.value = withSpring(1);
      rotation.value = withSpring(0);
    }
  }, [isActive]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      borderRadius: borderRadius.value,
      transform: [
        { scale: scale.value },
        { rotate: `${rotation.value}deg` }
      ],
    };
  });

  return (
    <Animated.View
      style={[
        styles.morphingShape,
        {
          backgroundColor: color || colors.primary,
        },
        animatedStyle,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  cube: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  sphere: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 10,
  },
  parallaxContainer: {
    flex: 1,
    position: 'relative',
  },
  backgroundElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  element: {
    position: 'absolute',
  },
  element1: {
    top: '10%',
    left: '10%',
  },
  element2: {
    top: '20%',
    right: '15%',
  },
  element3: {
    top: '60%',
    left: '20%',
  },
  element4: {
    top: '70%',
    right: '10%',
  },
  element5: {
    top: '40%',
    left: '70%',
  },
  element6: {
    top: '30%',
    right: '30%',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
  },
  morphingShape: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoGlow: {
    position: 'absolute',
    backgroundColor: '#FFD700',
    opacity: 0.3,
  },
  morphingLogo: {
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  logoGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  logoText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});

// Logo 3D melhorado com design mais elegante
export const MorphingLogo: React.FC<{ size?: number }> = ({ size = 100 }) => {
  const rotationY = useSharedValue(0);
  const scale = useSharedValue(1);
  const glowOpacity = useSharedValue(0.3);

  useEffect(() => {
    rotationY.value = withRepeat(
      withTiming(360, { duration: 8000, easing: Easing.linear }),
      -1,
      false
    );

    scale.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );

    glowOpacity.value = withRepeat(
      withSequence(
        withTiming(0.8, { duration: 1500 }),
        withTiming(0.3, { duration: 1500 })
      ),
      -1,
      true
    );
  }, []);

  const logoStyle = useAnimatedStyle(() => ({
    width: size,
    height: size,
    borderRadius: size * 0.25,
    transform: [
      { rotateY: `${rotationY.value}deg` },
      { scale: scale.value }
    ],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  return (
    <View style={styles.logoContainer}>
      {/* Glow effect */}
      <Animated.View style={[styles.logoGlow, glowStyle, { width: size * 1.3, height: size * 1.3, borderRadius: size * 0.32 }]} />
      
      {/* Main logo */}
      <Animated.View style={[styles.morphingLogo, logoStyle]}>
        <LinearGradient
          colors={['#FFD700', '#FFC107', '#FF9800']}
          style={styles.logoGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={[styles.logoText, { fontSize: size * 0.35 }]}>M</Text>
        </LinearGradient>
      </Animated.View>
    </View>
  );
};
