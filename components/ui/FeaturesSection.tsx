import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { FeatureCard } from './FeatureCard';

interface FeaturesSectionProps {
  animatedStyle?: any;
}

const featuresData = [
  {
    icon: 'book-outline' as const,
    title: 'Lições Interativas',
    description: 'Aprenda investimentos de forma prática e envolvente',
    gradientColors: ['#4CAF50', '#45A049', '#388E3C'],
    delay: 0,
  },
  {
    icon: 'flag-outline' as const,
    title: 'Metas Diárias',
    description: 'Estabeleça objetivos e acompanhe seu progresso',
    gradientColors: ['#FF9800', '#F57C00', '#E65100'],
    delay: 200,
  },
  {
    icon: 'trophy-outline' as const,
    title: 'Conquistas',
    description: 'Desbloqueie medalhas e celebre suas vitórias',
    gradientColors: ['#FFD700', '#FFC107', '#FF8F00'],
    delay: 400,
  },
];

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ animatedStyle }) => {
  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.featuresGrid}>
        {featuresData.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            gradientColors={feature.gradientColors}
            delay={feature.delay}
          />
        ))}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  featuresGrid: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 32,
    paddingHorizontal: 20,
  },
});
