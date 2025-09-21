import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

export const colors = {
  primary: '#FFD700',
  secondary: '#FFC107',
  accent: '#FFEB3B',
  background: '#FFFFFF',
  surface: '#FAFAFA',
  text: '#2C2C2C',
  white: '#FFFFFF',
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  streak: '#FF6B35',
  border: '#E0E0E0',
  shadow: 'rgba(0, 0, 0, 0.1)'
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48
};

export const fonts = {
  regular: 'System',
  medium: 'System',
  bold: 'System',
  size: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
    title: 28
  }
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999
};

export const shadows = {
  sm: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  }
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md
  },
  safeContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: fonts.size.title,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.md
  },
  subtitle: {
    fontSize: fonts.size.xl,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm
  },
  text: {
    fontSize: fonts.size.md,
    color: colors.text,
    lineHeight: 24
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.sm
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm
  },
  buttonText: {
    fontSize: fonts.size.md,
    fontWeight: '600',
    color: colors.text
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.border,
    borderRadius: borderRadius.sm,
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: borderRadius.sm
  }
});