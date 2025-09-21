import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { spacing, fonts, borderRadius, shadows } from '@/styles/global';
import { Question, QuestionType } from '../types';

interface QuestionCardProps {
  question: Question;
  onAnswer: (answer: string, isCorrect: boolean) => void;
  showResult?: boolean;
  selectedAnswer?: string;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onAnswer,
  showResult = false,
  selectedAnswer
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [animatedValue] = useState(new Animated.Value(0));

  const handleAnswerPress = (answer: string) => {
    if (showResult) return;
    
    const isCorrect = Array.isArray(question.correctAnswer) 
      ? question.correctAnswer.includes(answer)
      : question.correctAnswer === answer;
    
    // Animate feedback
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    onAnswer(answer, isCorrect);
  };

  const getOptionStyle = (option: string) => {
    if (!showResult) {
      return [
        styles.option,
        { 
          backgroundColor: colors.surface,
          borderColor: colors.border 
        }
      ];
    }

    const isSelected = selectedAnswer === option;
    const isCorrect = Array.isArray(question.correctAnswer) 
      ? question.correctAnswer.includes(option)
      : question.correctAnswer === option;

    if (isCorrect) {
      return [
        styles.option,
        styles.correctOption,
        { 
          backgroundColor: colors.success,
          borderColor: colors.success 
        }
      ];
    }

    if (isSelected && !isCorrect) {
      return [
        styles.option,
        styles.incorrectOption,
        { 
          backgroundColor: colors.error,
          borderColor: colors.error 
        }
      ];
    }

    return [
      styles.option,
      { 
        backgroundColor: colors.surface,
        borderColor: colors.border,
        opacity: 0.5
      }
    ];
  };

  const getOptionTextStyle = (option: string) => {
    if (!showResult) {
      return [styles.optionText, { color: colors.text }];
    }

    const isSelected = selectedAnswer === option;
    const isCorrect = Array.isArray(question.correctAnswer) 
      ? question.correctAnswer.includes(option)
      : question.correctAnswer === option;

    if (isCorrect || (isSelected && !isCorrect)) {
      return [styles.optionText, { color: colors.background }];
    }

    return [styles.optionText, { color: colors.text }];
  };

  const renderMultipleChoice = () => (
    <View style={styles.optionsContainer}>
      {question.options?.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={getOptionStyle(option)}
          onPress={() => handleAnswerPress(option)}
          disabled={showResult}
          activeOpacity={0.8}
        >
          <Text style={getOptionTextStyle(option)}>
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderTrueFalse = () => (
    <View style={styles.trueFalseContainer}>
      <TouchableOpacity
        style={getOptionStyle('true')}
        onPress={() => handleAnswerPress('true')}
        disabled={showResult}
        activeOpacity={0.8}
      >
        <Text style={getOptionTextStyle('true')}>
          ✓ Verdadeiro
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={getOptionStyle('false')}
        onPress={() => handleAnswerPress('false')}
        disabled={showResult}
        activeOpacity={0.8}
      >
        <Text style={getOptionTextStyle('false')}>
          ✗ Falso
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <Animated.View 
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          transform: [{
            scale: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0.98]
            })
          }]
        }
      ]}
    >
      <Text style={[styles.questionText, { color: colors.text }]}>
        {question.question}
      </Text>

      {question.type === QuestionType.MULTIPLE_CHOICE && renderMultipleChoice()}
      {question.type === QuestionType.TRUE_FALSE && renderTrueFalse()}

      {showResult && (
        <View style={[
          styles.explanationContainer,
          { backgroundColor: colors.lesson, borderColor: colors.border }
        ]}>
          <Text style={[styles.explanationTitle, { color: colors.text }]}>
            💡 Explicação
          </Text>
          <Text style={[styles.explanationText, { color: colors.text }]}>
            {question.explanation}
          </Text>
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  questionText: {
    fontSize: fonts.size.lg,
    fontWeight: '600',
    lineHeight: 28,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  optionsContainer: {
    gap: spacing.md,
  },
  trueFalseContainer: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  option: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    alignItems: 'center',
    ...shadows.sm,
  },
  correctOption: {
    ...shadows.md,
  },
  incorrectOption: {
    ...shadows.md,
  },
  optionText: {
    fontSize: fonts.size.md,
    fontWeight: '500',
    textAlign: 'center',
  },
  explanationContainer: {
    marginTop: spacing.lg,
    padding: spacing.md,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
  },
  explanationTitle: {
    fontSize: fonts.size.md,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  explanationText: {
    fontSize: fonts.size.sm,
    lineHeight: 20,
  },
});
