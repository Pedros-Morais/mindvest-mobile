import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
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

export default function SignupScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { setUser } = useAppStore();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Animações
  const containerOpacity = useSharedValue(0);
  const formTranslateY = useSharedValue(60);
  const titleScale = useSharedValue(0.8);
  const inputsOpacity = useSharedValue(0);
  const buttonOpacity = useSharedValue(0);

  useEffect(() => {
    // Animações de entrada sequenciais
    containerOpacity.value = withTiming(1, { duration: 800 });
    
    titleScale.value = withDelay(200, withSpring(1, { damping: 15, stiffness: 200 }));
    
    formTranslateY.value = withDelay(400, withSpring(0, { damping: 20, stiffness: 300 }));
    
    inputsOpacity.value = withDelay(600, withTiming(1, { duration: 600 }));
    
    buttonOpacity.value = withDelay(800, withTiming(1, { duration: 600 }));
  }, []);

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres');
      return;
    }

    setIsLoading(true);
    
    try {
      const user = await AuthService.register(name, email, password);
      setUser(user);
      
      // Animação de sucesso
      titleScale.value = withSequence(
        withSpring(1.1, { damping: 10 }),
        withSpring(1, { damping: 15 })
      );
      
      Alert.alert(
        'Sucesso!', 
        'Conta criada com sucesso! Bem-vindo ao MindVest!',
        [
          {
            text: 'Começar',
            onPress: () => router.replace('/(tabs)')
          }
        ]
      );
      
    } catch (error) {
      Alert.alert('Erro', error instanceof Error ? error.message : 'Erro ao criar conta');
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
          <ScrollView 
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <Animated.View style={[styles.content, containerStyle]}>
              
              {/* Elementos 3D decorativos */}
              <View style={styles.decorativeElements}>
                <View style={styles.floatingElement1}>
                  <FloatingCube size={35} color={colors.success + '30'} duration={3500} />
                </View>
                <View style={styles.floatingElement2}>
                  <FloatingSphere size={28} color={colors.warning + '40'} />
                </View>
                <View style={styles.floatingElement3}>
                  <FloatingCube size={20} color={colors.primary + '25'} duration={5000} />
                </View>
              </View>

              {/* Cabeçalho */}
              <Animated.View style={[styles.header, titleStyle]}>
                <Text style={[styles.title, { color: colors.text }]}>
                  Crie sua conta
                </Text>
                <Text style={[styles.subtitle, { color: colors.icon }]}>
                  Comece sua jornada de investimentos hoje mesmo
                </Text>
              </Animated.View>

              {/* Formulário */}
              <Animated.View style={[styles.form, formStyle]}>
                <Animated.View style={[styles.inputContainer, inputsStyle]}>
                  <Text style={[styles.inputLabel, { color: colors.text }]}>
                    Nome completo
                  </Text>
                  <TextInput
                    style={[styles.input, { 
                      backgroundColor: colors.surface,
                      borderColor: colors.border,
                      color: colors.text 
                    }]}
                    value={name}
                    onChangeText={setName}
                    placeholder="Seu nome completo"
                    placeholderTextColor={colors.icon}
                    autoCapitalize="words"
                  />
                </Animated.View>

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
                    placeholder="Mínimo 6 caracteres"
                    placeholderTextColor={colors.icon}
                    secureTextEntry
                  />
                </Animated.View>

                <Animated.View style={[styles.inputContainer, inputsStyle]}>
                  <Text style={[styles.inputLabel, { color: colors.text }]}>
                    Confirmar senha
                  </Text>
                  <TextInput
                    style={[styles.input, { 
                      backgroundColor: colors.surface,
                      borderColor: colors.border,
                      color: colors.text 
                    }]}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder="Digite a senha novamente"
                    placeholderTextColor={colors.icon}
                    secureTextEntry
                  />
                </Animated.View>

                <Animated.View style={[styles.buttonContainer, buttonStyle]}>
                  <AnimatedButton
                    title={isLoading ? "Criando conta..." : "Criar conta"}
                    onPress={handleSignup}
                    variant="primary"
                    size="large"
                    disabled={isLoading}
                    style={styles.signupButton}
                  />

                  <AnimatedButton
                    title="Já tenho conta"
                    onPress={() => router.push('/auth/login')}
                    variant="secondary"
                    size="medium"
                    style={styles.loginButton}
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
          </ScrollView>
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
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    justifyContent: 'center',
    minHeight: '100%',
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
    top: '10%',
    right: '8%',
  },
  floatingElement2: {
    position: 'absolute',
    top: '30%',
    left: '10%',
  },
  floatingElement3: {
    position: 'absolute',
    bottom: '25%',
    right: '15%',
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
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
    marginBottom: spacing.md,
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
  signupButton: {
    marginBottom: spacing.md,
  },
  loginButton: {
    backgroundColor: 'transparent',
  },
  backContainer: {
    alignItems: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
    zIndex: 2,
  },
});
