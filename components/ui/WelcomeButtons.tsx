import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { router } from 'expo-router';
import { AnimatedButton } from './AnimatedButton';

interface WelcomeButtonsProps {
  animatedStyle?: any;
}

export const WelcomeButtons: React.FC<WelcomeButtonsProps> = ({ animatedStyle }) => {
  const handleStartJourney = () => {
    router.push('/auth/signup');
  };

  const handleLogin = () => {
    router.push('/auth/login');
  };

  return (
    <Animated.View style={[styles.buttonsContainer, animatedStyle]}>
      <AnimatedButton
        title="Começar Jornada"
        onPress={handleStartJourney}
        variant="primary"
        size="large"
        style={styles.primaryButton}
      />
      <AnimatedButton
        title="Já tenho conta"
        onPress={handleLogin}
        variant="secondary"
        size="medium"
        style={styles.secondaryButton}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    width: '100%',
    paddingHorizontal: 20,
    gap: 16,
    marginBottom: 32,
  },
  primaryButton: {
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  secondaryButton: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
});
