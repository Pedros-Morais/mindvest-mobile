import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { CleanLogo } from './CleanLogo';

interface WelcomeHeaderProps {
  logoStyle?: any;
  titleStyle?: any;
  textColor: string;
  primaryColor: string;
}

export const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({
  logoStyle,
  titleStyle,
  textColor,
  primaryColor,
}) => {
  return (
    <>
      {/* Logo 3D */}
      <Animated.View style={[styles.logoContainer, logoStyle]}>
        <CleanLogo size={80} />
      </Animated.View>

      {/* Título */}
      <Animated.View style={[styles.titleContainer, titleStyle]}>
        <Text style={[styles.title, { color: textColor }]}>
          MindVest
        </Text>
        <Text style={[styles.tagline, { color: primaryColor }]}>
          Invista no seu futuro
        </Text>
        <Text style={[styles.subtitle, { color: textColor + '90' }]}>
          Aprenda a investir de forma inteligente e divertida, como se fosse um jogo!
        </Text>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    position: 'relative',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 6,
    letterSpacing: -0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  tagline: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    fontWeight: '500',
    paddingHorizontal: 10,
  },
});
