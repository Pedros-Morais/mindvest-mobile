import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ParallaxBackground } from '@/components/ui/3DElements';
import { WelcomeHeader } from '@/components/ui/WelcomeHeader';
import { WelcomeButtons } from '@/components/ui/WelcomeButtons';
import { FeaturesSection } from '@/components/ui/FeaturesSection';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Animações
  const logoOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.5);
  const titleTranslateY = useSharedValue(50);
  const titleOpacity = useSharedValue(0);
  const buttonsTranslateY = useSharedValue(30);
  const buttonsOpacity = useSharedValue(0);
  const featuresOpacity = useSharedValue(0);

  useEffect(() => {
    setIsLoaded(true);
    
    // Sequência de animações
    logoOpacity.value = withTiming(1, { duration: 800 });
    logoScale.value = withSpring(1, { damping: 15, stiffness: 200 });
    
    titleTranslateY.value = withDelay(300, withSpring(0, { damping: 20, stiffness: 300 }));
    titleOpacity.value = withDelay(300, withTiming(1, { duration: 600 }));
    
    buttonsTranslateY.value = withDelay(600, withSpring(0, { damping: 25, stiffness: 400 }));
    buttonsOpacity.value = withDelay(600, withTiming(1, { duration: 500 }));
    
    featuresOpacity.value = withDelay(900, withTiming(1, { duration: 700 }));
  }, []);

  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));

  const titleStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: titleTranslateY.value }],
    opacity: titleOpacity.value,
  }));

  const buttonsStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: buttonsTranslateY.value }],
    opacity: buttonsOpacity.value,
  }));

  const featuresStyle = useAnimatedStyle(() => ({
    opacity: featuresOpacity.value,
  }));

  return (
    <ParallaxBackground>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <WelcomeHeader
            logoStyle={logoStyle}
            titleStyle={titleStyle}
            textColor={colors.text}
            primaryColor={colors.primary}
          />

          <WelcomeButtons animatedStyle={buttonsStyle} />

          <FeaturesSection animatedStyle={featuresStyle} />
        </View>
      </SafeAreaView>
    </ParallaxBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 10,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
});
