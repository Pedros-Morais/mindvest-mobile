import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { spacing, fonts, borderRadius, shadows } from '@/styles/global';
import { Lesson } from '../types';

interface LessonCardProps {
  lesson: Lesson;
  onPress: () => void;
  isLocked?: boolean;
  isCompleted?: boolean;
}

export const LessonCard: React.FC<LessonCardProps> = ({
  lesson,
  onPress,
  isLocked = false,
  isCompleted = false
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'iniciante':
        return colors.success;
      case 'intermediario':
        return colors.warning;
      case 'avancado':
        return colors.error;
      default:
        return colors.primary;
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'iniciante':
        return 'Iniciante';
      case 'intermediario':
        return 'Intermediário';
      case 'avancado':
        return 'Avançado';
      default:
        return 'Iniciante';
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          borderColor: isCompleted ? colors.success : isLocked ? colors.border : colors.primary,
          opacity: isLocked ? 0.6 : 1
        }
      ]}
      onPress={onPress}
      disabled={isLocked}
      activeOpacity={0.8}
    >
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { color: colors.text }]}>
            {lesson.title}
          </Text>
          {isCompleted && (
            <Text style={styles.completedIcon}>✅</Text>
          )}
          {isLocked && (
            <Text style={styles.lockedIcon}>🔒</Text>
          )}
        </View>
        <View style={[
          styles.difficultyBadge,
          { backgroundColor: getDifficultyColor(lesson.difficulty) }
        ]}>
          <Text style={[styles.difficultyText, { color: colors.background }]}>
            {getDifficultyLabel(lesson.difficulty)}
          </Text>
        </View>
      </View>

      <Text style={[styles.description, { color: colors.icon }]}>
        {lesson.description}
      </Text>

      <View style={styles.footer}>
        <View style={styles.metaInfo}>
          <Text style={[styles.metaText, { color: colors.icon }]}>
            ⏱️ {lesson.estimatedTime} min
          </Text>
          <Text style={[styles.metaText, { color: colors.primary }]}>
            +{lesson.xpReward} XP
          </Text>
        </View>
        
        <View style={[
          styles.startButton,
          {
            backgroundColor: isCompleted ? colors.success : colors.primary
          }
        ]}>
          <Text style={[styles.startButtonText, { color: colors.background }]}>
            {isCompleted ? 'Revisar' : 'Começar'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: fonts.size.lg,
    fontWeight: 'bold',
    flex: 1,
  },
  completedIcon: {
    fontSize: fonts.size.md,
    marginLeft: spacing.sm,
  },
  lockedIcon: {
    fontSize: fonts.size.md,
    marginLeft: spacing.sm,
  },
  difficultyBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  difficultyText: {
    fontSize: fonts.size.xs,
    fontWeight: '600',
  },
  description: {
    fontSize: fonts.size.sm,
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaInfo: {
    flex: 1,
  },
  metaText: {
    fontSize: fonts.size.xs,
    marginBottom: spacing.xs,
  },
  startButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.sm,
  },
  startButtonText: {
    fontSize: fonts.size.sm,
    fontWeight: '600',
  },
});
