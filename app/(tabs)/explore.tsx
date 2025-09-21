import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppStore } from '@/store/useStore';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { globalStyles, spacing, fonts, borderRadius, shadows } from '@/styles/global';
import { LessonUnit, Lesson } from '@/modules/lessons/types';

const { width } = Dimensions.get('window');

export default function LessonsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const {
    lessonUnits,
    setLessonUnits,
    lessonProgress,
    user
  } = useAppStore();

  // Mock lesson data
  useEffect(() => {
    if (lessonUnits.length === 0) {
      const mockUnits: LessonUnit[] = [
        {
          id: 'fundamentos',
          title: 'Fundamentos dos Investimentos',
          description: 'Aprenda os conceitos básicos para começar a investir',
          icon: '📚',
          color: '#FFD700',
          isUnlocked: true,
          progress: 60,
          lessons: [
            {
              id: 'fund_001',
              title: 'O que são Investimentos?',
              description: 'Entenda o conceito básico de investimento',
              category: 'fundamentos' as any,
              difficulty: 'iniciante' as any,
              estimatedTime: 10,
              xpReward: 50,
              isCompleted: true,
              isLocked: false,
              order: 1,
              questions: [],
              concepts: []
            },
            {
              id: 'fund_002',
              title: 'Risco vs Retorno',
              description: 'Compreenda a relação entre risco e retorno',
              category: 'fundamentos' as any,
              difficulty: 'iniciante' as any,
              estimatedTime: 15,
              xpReward: 75,
              isCompleted: false,
              isLocked: false,
              order: 2,
              questions: [],
              concepts: []
            },
            {
              id: 'fund_003',
              title: 'Diversificação',
              description: 'Aprenda a importância da diversificação',
              category: 'fundamentos' as any,
              difficulty: 'iniciante' as any,
              estimatedTime: 12,
              xpReward: 60,
              isCompleted: false,
              isLocked: true,
              order: 3,
              questions: [],
              concepts: []
            }
          ]
        },
        {
          id: 'acoes',
          title: 'Ações',
          description: 'Aprenda sobre o mercado de ações',
          icon: '📈',
          color: '#4CAF50',
          isUnlocked: false,
          progress: 0,
          lessons: []
        },
        {
          id: 'renda_fixa',
          title: 'Renda Fixa',
          description: 'Entenda os investimentos de renda fixa',
          icon: '🏦',
          color: '#2196F3',
          isUnlocked: false,
          progress: 0,
          lessons: []
        }
      ];
      setLessonUnits(mockUnits);
    }
  }, [lessonUnits, setLessonUnits]);

  const renderLessonNode = (lesson: Lesson, index: number, isLastInUnit: boolean) => {
    const isCompleted = lesson.isCompleted;
    const isLocked = lesson.isLocked;
    const isActive = !isCompleted && !isLocked;

    return (
      <View key={lesson.id} style={styles.lessonNodeContainer}>
        <TouchableOpacity
          style={[
            styles.lessonNode,
            {
              backgroundColor: isCompleted 
                ? colors.success 
                : isActive 
                  ? colors.primary 
                  : colors.border,
              borderColor: isActive ? colors.primary : colors.border,
            }
          ]}
          disabled={isLocked}
          activeOpacity={0.8}
        >
          <Text style={[
            styles.lessonNodeText,
            { 
              color: isCompleted || isActive ? colors.background : colors.icon 
            }
          ]}>
            {isCompleted ? '✓' : isLocked ? '🔒' : index + 1}
          </Text>
        </TouchableOpacity>
        
        <View style={[
          styles.lessonInfo,
          { backgroundColor: colors.surface, borderColor: colors.border }
        ]}>
          <Text style={[styles.lessonTitle, { color: colors.text }]}>
            {lesson.title}
          </Text>
          <Text style={[styles.lessonDescription, { color: colors.icon }]}>
            {lesson.description}
          </Text>
          <View style={styles.lessonMeta}>
            <Text style={[styles.lessonTime, { color: colors.icon }]}>
              ⏱️ {lesson.estimatedTime} min
            </Text>
            <Text style={[styles.lessonXP, { color: colors.primary }]}>
              +{lesson.xpReward} XP
            </Text>
          </View>
        </View>

        {!isLastInUnit && (
          <View style={[
            styles.pathConnector,
            { backgroundColor: isCompleted ? colors.success : colors.border }
          ]} />
        )}
      </View>
    );
  };

  const renderUnit = (unit: LessonUnit) => {
    return (
      <View key={unit.id} style={styles.unitContainer}>
        <View style={[
          styles.unitHeader,
          { backgroundColor: colors.surface, borderColor: colors.border }
        ]}>
          <View style={styles.unitTitleContainer}>
            <Text style={styles.unitIcon}>{unit.icon}</Text>
            <View style={styles.unitTextContainer}>
              <Text style={[styles.unitTitle, { color: colors.text }]}>
                {unit.title}
              </Text>
              <Text style={[styles.unitDescription, { color: colors.icon }]}>
                {unit.description}
              </Text>
            </View>
          </View>
          
          {unit.isUnlocked && (
            <View style={styles.unitProgress}>
              <Text style={[styles.unitProgressText, { color: colors.icon }]}>
                {Math.round(unit.progress)}%
              </Text>
              <View style={[styles.unitProgressBar, { backgroundColor: colors.border }]}>
                <View 
                  style={[
                    styles.unitProgressFill,
                    { 
                      backgroundColor: colors.primary,
                      width: `${unit.progress}%`
                    }
                  ]} 
                />
              </View>
            </View>
          )}
        </View>

        {unit.isUnlocked && unit.lessons.map((lesson, index) => 
          renderLessonNode(lesson, index, index === unit.lessons.length - 1)
        )}

        {!unit.isUnlocked && (
          <View style={[styles.lockedUnit, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.lockedText, { color: colors.icon }]}>
              🔒 Complete a unidade anterior para desbloquear
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={[globalStyles.safeContainer, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Lições
        </Text>
        <Text style={[styles.headerSubtitle, { color: colors.icon }]}>
          Sua jornada de aprendizado
        </Text>
      </View>

      <ScrollView 
        style={styles.container} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {lessonUnits.map(renderUnit)}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  headerTitle: {
    fontSize: fonts.size.title,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  headerSubtitle: {
    fontSize: fonts.size.md,
  },
  unitContainer: {
    marginBottom: spacing.xl,
  },
  unitHeader: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  unitTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  unitIcon: {
    fontSize: fonts.size.xxl,
    marginRight: spacing.md,
  },
  unitTextContainer: {
    flex: 1,
  },
  unitTitle: {
    fontSize: fonts.size.lg,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  unitDescription: {
    fontSize: fonts.size.sm,
  },
  unitProgress: {
    alignItems: 'flex-end',
  },
  unitProgressText: {
    fontSize: fonts.size.sm,
    marginBottom: spacing.xs,
  },
  unitProgressBar: {
    width: 80,
    height: 6,
    borderRadius: borderRadius.sm,
    overflow: 'hidden',
  },
  unitProgressFill: {
    height: '100%',
    borderRadius: borderRadius.sm,
  },
  lessonNodeContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  lessonNode: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
    ...shadows.md,
  },
  lessonNodeText: {
    fontSize: fonts.size.lg,
    fontWeight: 'bold',
  },
  lessonInfo: {
    width: width - spacing.md * 2,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    ...shadows.sm,
  },
  lessonTitle: {
    fontSize: fonts.size.md,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  lessonDescription: {
    fontSize: fonts.size.sm,
    marginBottom: spacing.sm,
  },
  lessonMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lessonTime: {
    fontSize: fonts.size.xs,
  },
  lessonXP: {
    fontSize: fonts.size.xs,
    fontWeight: 'bold',
  },
  pathConnector: {
    width: 4,
    height: spacing.lg,
    marginVertical: spacing.sm,
  },
  lockedUnit: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    alignItems: 'center',
    ...shadows.sm,
  },
  lockedText: {
    fontSize: fonts.size.sm,
    textAlign: 'center',
  },
});
