import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Text, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppStore } from '@/store/useStore';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { globalStyles, spacing, fonts, borderRadius, shadows } from '@/styles/global';
import { LessonUnit, Lesson } from '@/modules/lessons/types';
import { AnimatedUnitCard, AnimatedLessonNode } from '@/components/ui/LessonComponents';
import { AnimatedCard } from '@/components/ui/AnimatedCard';

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

  const renderUnit = (unit: LessonUnit, index: number) => {
    return (
      <AnimatedUnitCard key={unit.id} unit={unit} delay={index * 200} />
    );
  };

  const renderLessons = (unit: LessonUnit) => {
    if (!unit.isUnlocked) return null;
    
    return unit.lessons.map((lesson, index) => (
      <AnimatedLessonNode
        key={lesson.id}
        lesson={lesson}
        index={index}
        isLastInUnit={index === unit.lessons.length - 1}
        delay={index * 150}
      />
    ));
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
        {lessonUnits.map((unit, index) => (
          <View key={unit.id}>
            {renderUnit(unit, index)}
            {renderLessons(unit)}
          </View>
        ))}
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
});
