import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withRepeat,
  withSequence,
  interpolate,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { spacing, borderRadius, shadows } from '@/styles/global';
import { LessonUnit, Lesson } from '@/modules/lessons/types';

const { width } = Dimensions.get('window');

interface AnimatedUnitCardProps {
  unit: LessonUnit;
  delay?: number;
}

export const AnimatedUnitCard: React.FC<AnimatedUnitCardProps> = ({ unit, delay = 0 }) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const scale = useSharedValue(0.9);
  const opacity = useSharedValue(0);
  const borderAnimation = useSharedValue(0);
  const glowAnimation = useSharedValue(0);

  useEffect(() => {
    // Entry animation
    opacity.value = withTiming(1, { duration: 600, easing: Easing.out(Easing.cubic) });
    scale.value = withSpring(1, { damping: 15, stiffness: 200 });
    
    // Continuous border animation for unlocked units
    if (unit.isUnlocked) {
      borderAnimation.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.sin) }),
          withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.sin) })
        ),
        -1,
        true
      );
      
      // Subtle glow effect
      glowAnimation.value = withRepeat(
        withSequence(
          withTiming(0.3, { duration: 1500, easing: Easing.inOut(Easing.sin) }),
          withTiming(0, { duration: 1500, easing: Easing.inOut(Easing.sin) })
        ),
        -1,
        true
      );
    }
  }, [unit.isUnlocked]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    };
  });

  const borderStyle = useAnimatedStyle(() => {
    const borderOpacity = interpolate(borderAnimation.value, [0, 1], [0.3, 1]);
    const borderWidth = interpolate(borderAnimation.value, [0, 1], [1, 3]);
    
    return {
      borderWidth: unit.isUnlocked ? borderWidth : 1,
      borderColor: unit.isUnlocked 
        ? `${colors.primary}${Math.round(borderOpacity * 255).toString(16).padStart(2, '0')}`
        : colors.border,
    };
  });

  const glowStyle = useAnimatedStyle(() => {
    const glowOpacity = interpolate(glowAnimation.value, [0, 1], [0, 0.4]);
    
    return {
      opacity: unit.isUnlocked ? glowOpacity : 0,
      transform: [{ scale: 1 + glowAnimation.value * 0.1 }],
    };
  });

  return (
    <Animated.View style={[styles.unitContainer, animatedStyle]}>
      {/* Glow effect */}
      <Animated.View style={[styles.glowContainer, glowStyle]}>
        <LinearGradient
          colors={[`${colors.primary}40`, `${colors.primary}10`, 'transparent']}
          style={styles.glowGradient}
        />
      </Animated.View>

      {/* Main card */}
      <Animated.View style={[styles.unitCard, { backgroundColor: colors.surface }, borderStyle]}>
        <LinearGradient
          colors={unit.isUnlocked 
            ? [`${colors.primary}05`, `${colors.surface}`, `${colors.primary}05`]
            : [colors.surface, colors.surface]
          }
          style={styles.cardGradient}
        >
          <View style={styles.unitHeader}>
            <View style={styles.unitIconContainer}>
              <View style={[
                styles.iconBackground,
                { 
                  backgroundColor: unit.isUnlocked ? `${unit.color}20` : `${colors.icon}20`,
                }
              ]}>
                <Text style={[
                  styles.unitIcon,
                  { opacity: unit.isUnlocked ? 1 : 0.5 }
                ]}>
                  {unit.icon}
                </Text>
              </View>
            </View>
            
            <View style={styles.unitTextContainer}>
              <Text style={[
                styles.unitTitle, 
                { 
                  color: unit.isUnlocked ? colors.text : colors.icon,
                  opacity: unit.isUnlocked ? 1 : 0.7
                }
              ]}>
                {unit.title}
              </Text>
              <Text style={[
                styles.unitDescription, 
                { 
                  color: colors.icon,
                  opacity: unit.isUnlocked ? 0.8 : 0.5
                }
              ]}>
                {unit.description}
              </Text>
            </View>

            {!unit.isUnlocked && (
              <View style={styles.lockContainer}>
                <Text style={styles.lockIcon}>🔒</Text>
              </View>
            )}
          </View>

          {unit.isUnlocked && (
            <View style={styles.progressSection}>
              <View style={styles.progressHeader}>
                <Text style={[styles.progressLabel, { color: colors.icon }]}>
                  Progresso
                </Text>
                <Text style={[styles.progressValue, { color: colors.primary }]}>
                  {Math.round(unit.progress)}%
                </Text>
              </View>
              
              <View style={[styles.progressBarContainer, { backgroundColor: `${colors.border}40` }]}>
                <Animated.View style={[
                  styles.progressBar,
                  { 
                    backgroundColor: colors.primary,
                    width: `${unit.progress}%`
                  }
                ]} />
                <LinearGradient
                  colors={[`${colors.primary}80`, `${colors.primary}40`, 'transparent']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={[styles.progressGlow, { width: `${unit.progress}%` }]}
                />
              </View>
            </View>
          )}
        </LinearGradient>
      </Animated.View>
    </Animated.View>
  );
};

interface AnimatedLessonNodeProps {
  lesson: Lesson;
  index: number;
  isLastInUnit: boolean;
  delay?: number;
}

export const AnimatedLessonNode: React.FC<AnimatedLessonNodeProps> = ({ 
  lesson, 
  index, 
  isLastInUnit, 
  delay = 0 
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const scale = useSharedValue(0.8);
  const opacity = useSharedValue(0);
  const pulseAnimation = useSharedValue(0);
  const slideX = useSharedValue(-50);

  const isCompleted = lesson.isCompleted;
  const isLocked = lesson.isLocked;
  const isActive = !isCompleted && !isLocked;

  useEffect(() => {
    // Entry animation with delay
    setTimeout(() => {
      opacity.value = withTiming(1, { duration: 500 });
      scale.value = withSpring(1, { damping: 12, stiffness: 200 });
      slideX.value = withSpring(0, { damping: 15, stiffness: 150 });
    }, delay);

    // Pulse animation for active lessons
    if (isActive) {
      pulseAnimation.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.sin) }),
          withTiming(0, { duration: 1000, easing: Easing.inOut(Easing.sin) })
        ),
        -1,
        true
      );
    }
  }, [delay, isActive]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        { scale: scale.value },
        { translateX: slideX.value }
      ],
    };
  });

  const nodeStyle = useAnimatedStyle(() => {
    const pulseScale = 1 + (pulseAnimation.value * 0.1);
    const glowOpacity = pulseAnimation.value * 0.3;
    
    return {
      transform: [{ scale: isActive ? pulseScale : 1 }],
      shadowOpacity: isActive ? 0.3 + glowOpacity : 0.1,
    };
  });

  const getNodeColor = () => {
    if (isCompleted) return colors.success;
    if (isActive) return colors.primary;
    return colors.border;
  };

  const getTextColor = () => {
    if (isCompleted || isActive) return colors.background;
    return colors.icon;
  };

  return (
    <Animated.View style={[styles.lessonNodeContainer, animatedStyle]}>
      {/* Lesson Node */}
      <Animated.View style={[
        styles.lessonNode,
        {
          backgroundColor: getNodeColor(),
          borderColor: isActive ? colors.primary : colors.border,
          shadowColor: isActive ? colors.primary : colors.text,
        },
        nodeStyle
      ]}>
        <TouchableOpacity
          style={styles.nodeButton}
          disabled={isLocked}
          activeOpacity={0.8}
        >
          <Text style={[
            styles.lessonNodeText,
            { color: getTextColor() }
          ]}>
            {isCompleted ? '✓' : isLocked ? '🔒' : index + 1}
          </Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Lesson Info Card */}
      <View style={[
        styles.lessonInfoCard,
        { 
          backgroundColor: colors.surface,
          borderColor: isActive ? `${colors.primary}40` : colors.border,
          borderWidth: isActive ? 2 : 1,
        }
      ]}>
        <BlurView intensity={10} style={styles.cardBlur}>
          <LinearGradient
            colors={isActive 
              ? [`${colors.primary}08`, colors.surface, `${colors.primary}08`]
              : [colors.surface, colors.surface]
            }
            style={styles.cardContent}
          >
            <View style={styles.lessonHeader}>
              <Text style={[styles.lessonTitle, { color: colors.text }]}>
                {lesson.title}
              </Text>
              {isActive && (
                <View style={[styles.activeBadge, { backgroundColor: colors.primary }]}>
                  <Text style={[styles.activeBadgeText, { color: colors.background }]}>
                    Atual
                  </Text>
                </View>
              )}
            </View>
            
            <Text style={[styles.lessonDescription, { color: colors.icon }]}>
              {lesson.description}
            </Text>
            
            <View style={styles.lessonMeta}>
              <View style={styles.metaItem}>
                <Text style={styles.metaIcon}>⏱️</Text>
                <Text style={[styles.metaText, { color: colors.icon }]}>
                  {lesson.estimatedTime} min
                </Text>
              </View>
              <View style={styles.metaItem}>
                <Text style={styles.metaIcon}>⭐</Text>
                <Text style={[styles.metaText, { color: colors.primary }]}>
                  +{lesson.xpReward} XP
                </Text>
              </View>
            </View>
          </LinearGradient>
        </BlurView>
      </View>

      {/* Path Connector */}
      {!isLastInUnit && (
        <View style={[
          styles.pathConnector,
          { 
            backgroundColor: isCompleted ? colors.success : `${colors.border}60`,
          }
        ]}>
          {isCompleted && (
            <LinearGradient
              colors={[colors.success, `${colors.success}80`]}
              style={styles.connectorGradient}
            />
          )}
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  // Unit Card Styles
  unitContainer: {
    marginBottom: spacing.xl,
    position: 'relative',
  },
  glowContainer: {
    position: 'absolute',
    top: -10,
    left: -10,
    right: -10,
    bottom: -10,
    borderRadius: borderRadius.lg + 10,
  },
  glowGradient: {
    flex: 1,
    borderRadius: borderRadius.lg + 10,
  },
  unitCard: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.lg,
  },
  cardGradient: {
    padding: spacing.lg,
  },
  unitHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  unitIconContainer: {
    marginRight: spacing.md,
  },
  iconBackground: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unitIcon: {
    fontSize: 28,
  },
  unitTextContainer: {
    flex: 1,
  },
  unitTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  unitDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  lockContainer: {
    padding: spacing.sm,
  },
  lockIcon: {
    fontSize: 24,
    opacity: 0.5,
  },
  progressSection: {
    marginTop: spacing.sm,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  progressLabel: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  progressValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  progressBarContainer: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    position: 'relative',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  progressGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    borderRadius: 4,
  },

  // Lesson Node Styles
  lessonNodeContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
    position: 'relative',
  },
  lessonNode: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    marginBottom: spacing.md,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 8,
  },
  nodeButton: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lessonNodeText: {
    fontSize: 18,
    fontWeight: '700',
  },
  lessonInfoCard: {
    width: width - spacing.md * 2,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.md,
  },
  cardBlur: {
    borderRadius: borderRadius.lg,
  },
  cardContent: {
    padding: spacing.lg,
  },
  lessonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  activeBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    marginLeft: spacing.sm,
  },
  activeBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  lessonDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  lessonMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaIcon: {
    fontSize: 14,
    marginRight: spacing.xs,
  },
  metaText: {
    fontSize: 12,
    fontWeight: '500',
  },
  pathConnector: {
    width: 4,
    height: spacing.xl,
    marginVertical: spacing.md,
    borderRadius: 2,
    position: 'relative',
    overflow: 'hidden',
  },
  connectorGradient: {
    flex: 1,
    borderRadius: 2,
  },
});
