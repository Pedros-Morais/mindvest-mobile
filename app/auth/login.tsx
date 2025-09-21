import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
  withDelay,
} from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { spacing, fonts, borderRadius } from '@/styles/global';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { ParallaxBackground, FloatingCube, FloatingSphere } from '@/components/ui/3DElements';
import { AuthService } from '@/modules/auth/services/authService';
import { useAppStore } from '@/store/useStore';

export default function LoginScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { setUser } = useAppStore();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Animações
  const containerOpacity = useSharedValue(0);
  const formTranslateY = useSharedValue(50);
  const titleScale = useSharedValue(0.8);
  const inputsOpacity = useSharedValue(0);
  const buttonOpacity = useSharedValue(0);

  useEffect(() => {
    // Animações de entrada
    containerOpacity.value = withTiming(1, { duration: 800 });
    
    titleScale.value = withDelay(200, withSpring(1, { damping: 15, stiffness: 200 }));
    
    formTranslateY.value = withDelay(400, withSpring(0, { damping: 20, stiffness: 300 }));
    
    inputsOpacity.value = withDelay(600, withTiming(1, { duration: 600 }));
    
    buttonOpacity.value = withDelay(800, withTiming(1, { duration: 600 }));
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    setIsLoading(true);
    
    try {
      const user = await AuthService.login(email, password);
      setUser(user);
      
      // Animação de sucesso antes de navegar
      titleScale.value = withSequence(
        withSpring(1.1, { damping: 10 }),
        withSpring(1, { damping: 15 })
      );
      
      setTimeout(() => {
        router.replace('/(tabs)');
      }, 500);
      
    } catch (error) {
      Alert.alert('Erro', error instanceof Error ? error.message : 'Erro ao fazer login');
    } finally {
      setIsLoading(false);
    }
  };

  const containerStyle = useAnimatedStyle(() => ({
    opacity: containerOpacity.value,
  }));

  const titleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: titleScale.value }],
  }));

  const formStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: formTranslateY.value }],
  }));

  const inputsStyle = useAnimatedStyle(() => ({
    opacity: inputsOpacity.value,
  }));

  const buttonStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
  }));

  return (
    <ParallaxBackground>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <Animated.View style={[styles.content, containerStyle]}>
            
            {/* Elementos 3D decorativos */}
            <View style={styles.decorativeElements}>
              <View style={styles.floatingElement1}>
                <FloatingCube size={30} color={colors.primary + '30'} duration={4000} />
              </View>
              <View style={styles.floatingElement2}>
                <FloatingSphere size={25} color={colors.secondary + '40'} />
              </View>
            </View>

            {/* Cabeçalho */}
            <Animated.View style={[styles.header, titleStyle]}>
              <Text style={[styles.title, { color: colors.text }]}>
                Bem-vindo de volta!
              </Text>
              <Text style={[styles.subtitle, { color: colors.icon }]}>
                Entre na sua conta para continuar aprendendo
              </Text>
            </Animated.View>

            {/* Formulário */}
            <Animated.View style={[styles.form, formStyle]}>
              <Animated.View style={[styles.inputContainer, inputsStyle]}>
                <Text style={[styles.inputLabel, { color: colors.text }]}>
                  Email
                </Text>
                <TextInput
                  style={[styles.input, { 
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                    color: colors.text 
                  }]}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="seu@email.com"
                  placeholderTextColor={colors.icon}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </Animated.View>

              <Animated.View style={[styles.inputContainer, inputsStyle]}>
                <Text style={[styles.inputLabel, { color: colors.text }]}>
                  Senha
                </Text>
                <TextInput
                  style={[styles.input, { 
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                    color: colors.text 
                  }]}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Sua senha"
                  placeholderTextColor={colors.icon}
                  secureTextEntry
                />
              </Animated.View>

              <Animated.View style={[styles.buttonContainer, buttonStyle]}>
                <AnimatedButton
                  title={isLoading ? "Entrando..." : "Entrar"}
                  onPress={handleLogin}
                  variant="primary"
                  size="large"
                  disabled={isLoading}
                  style={styles.loginButton}
                />

                <AnimatedButton
                  title="Criar nova conta"
                  onPress={() => router.push('/auth/signup')}
                  variant="secondary"
                  size="medium"
                  style={styles.signupButton}
                />
              </Animated.View>
            </Animated.View>

            {/* Link de volta */}
            <Animated.View style={[styles.backContainer, buttonStyle]}>
                <AnimatedButton
                  title="← Voltar"
                  onPress={() => router.back()}
                  variant="secondary"
                  size="small"
                />
            </Animated.View>
          </Animated.View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ParallaxBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 10,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    justifyContent: 'center',
  },
  decorativeElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  floatingElement1: {
    position: 'absolute',
    top: '15%',
    right: '10%',
  },
  floatingElement2: {
    position: 'absolute',
    bottom: '20%',
    left: '15%',
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl * 2,
    zIndex: 2,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: fonts.size.md,
    textAlign: 'center',
    lineHeight: 22,
  },
  form: {
    zIndex: 2,
  },
  inputContainer: {
    marginBottom: spacing.lg,
  },
  inputLabel: {
    fontSize: fonts.size.md,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  input: {
    height: 56,
    borderWidth: 2,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    fontSize: fonts.size.md,
  },
  buttonContainer: {
    marginTop: spacing.lg,
  },
  loginButton: {
    marginBottom: spacing.md,
  },
  signupButton: {
    backgroundColor: 'transparent',
  },
  backContainer: {
    alignItems: 'center',
    marginTop: spacing.xl,
    zIndex: 2,
  },
});
