import { StyleSheet } from 'react-native';

export const colors = {
  primary: '',
  secondary: '',
  background: '',
  text: '',
  white: '',
  error: ''
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32
};

export const fonts = {
  regular: 'System',
  bold: 'System',
  size: {
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24
  }
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md
  },
  title: {
    fontSize: fonts.size.lg,
    fontWeight: 'bold',
    color: colors.primary
  },
  text: {
    fontSize: fonts.size.md,
    color: colors.text
  }
});