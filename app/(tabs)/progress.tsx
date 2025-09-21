import React from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppStore } from '@/store/useStore';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { globalStyles, spacing, fonts, borderRadius, shadows } from '@/styles/global';

const { width } = Dimensions.get('window');

export default function ProgressScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const {
    user,
    getCurrentStreak,
    getTotalXP,
    getCompletedLessonsCount,
    getUnlockedAchievementsCount,
    userAchievements,
    achievements
  } = useAppStore();

  const weeklyData = [
    { day: 'Dom', xp: 0, completed: false },
    { day: 'Seg', xp: 50, completed: true },
    { day: 'Ter', xp: 75, completed: true },
    { day: 'Qua', xp: 100, completed: true },
    { day: 'Qui', xp: 25, completed: true },
    { day: 'Sex', xp: 80, completed: true },
    { day: 'Sáb', xp: 0, completed: false },
  ];

  const currentLevel = user?.level || 1;
  const currentLevelProgress = user?.stats?.currentLevelProgress || 0;
  const nextLevelXP = currentLevel * 200; // Simple calculation
  const currentLevelXP = Math.round((currentLevelProgress / 100) * nextLevelXP);

  return (
    <SafeAreaView style={[globalStyles.safeContainer, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Seu Progresso
        </Text>
        <Text style={[styles.headerSubtitle, { color: colors.icon }]}>
          Acompanhe sua evolução
        </Text>
      </View>

      <ScrollView 
        style={styles.container} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Level Progress */}
        <View style={[styles.levelCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.levelHeader}>
            <Text style={[styles.levelTitle, { color: colors.text }]}>
              Nível {currentLevel}
            </Text>
            <Text style={[styles.levelXP, { color: colors.primary }]}>
              {currentLevelXP} / {nextLevelXP} XP
            </Text>
          </View>
          <View style={[styles.levelProgressBar, { backgroundColor: colors.border }]}>
            <View 
              style={[
                styles.levelProgressFill,
                { 
                  backgroundColor: colors.primary,
                  width: `${currentLevelProgress}%`
                }
              ]} 
            />
          </View>
          <Text style={[styles.levelProgressText, { color: colors.icon }]}>
            {Math.round(currentLevelProgress)}% para o próximo nível
          </Text>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.statNumber, { color: colors.primary }]}>
              {getTotalXP()}
            </Text>
            <Text style={[styles.statLabel, { color: colors.icon }]}>
              XP Total
            </Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.statNumber, { color: colors.streak }]}>
              {getCurrentStreak()}
            </Text>
            <Text style={[styles.statLabel, { color: colors.icon }]}>
              Sequência
            </Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.statNumber, { color: colors.success }]}>
              {getCompletedLessonsCount()}
            </Text>
            <Text style={[styles.statLabel, { color: colors.icon }]}>
              Lições
            </Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.statNumber, { color: colors.warning }]}>
              {getUnlockedAchievementsCount()}
            </Text>
            <Text style={[styles.statLabel, { color: colors.icon }]}>
              Conquistas
            </Text>
          </View>
        </View>

        {/* Weekly Activity */}
        <View style={[styles.weeklyCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Atividade Semanal
          </Text>
          <View style={styles.weeklyChart}>
            {weeklyData.map((day, index) => (
              <View key={index} style={styles.dayColumn}>
                <View style={styles.barContainer}>
                  <View 
                    style={[
                      styles.xpBar,
                      { 
                        backgroundColor: day.completed ? colors.primary : colors.border,
                        height: Math.max((day.xp / 100) * 60, 4)
                      }
                    ]} 
                  />
                </View>
                <Text style={[styles.dayLabel, { color: colors.icon }]}>
                  {day.day}
                </Text>
                <Text style={[styles.xpLabel, { color: colors.text }]}>
                  {day.xp}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Achievements */}
        <View style={[styles.achievementsCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.achievementsHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Conquistas Recentes
            </Text>
            <TouchableOpacity>
              <Text style={[styles.viewAllText, { color: colors.primary }]}>
                Ver todas
              </Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.achievementsList}>
            <View style={styles.achievementItem}>
              <Text style={styles.achievementIcon}>🎯</Text>
              <View style={styles.achievementContent}>
                <Text style={[styles.achievementTitle, { color: colors.text }]}>
                  Primeiro Passo
                </Text>
                <Text style={[styles.achievementDescription, { color: colors.icon }]}>
                  Complete sua primeira lição
                </Text>
              </View>
              <Text style={[styles.achievementXP, { color: colors.primary }]}>
                +25 XP
              </Text>
            </View>
            
            <View style={styles.achievementItem}>
              <Text style={styles.achievementIcon}>⭐</Text>
              <View style={styles.achievementContent}>
                <Text style={[styles.achievementTitle, { color: colors.text }]}>
                  Perfeição
                </Text>
                <Text style={[styles.achievementDescription, { color: colors.icon }]}>
                  Obtenha 100% de acerto em uma lição
                </Text>
              </View>
              <Text style={[styles.achievementXP, { color: colors.primary }]}>
                +75 XP
              </Text>
            </View>
          </View>
        </View>

        {/* Study Time */}
        <View style={[styles.studyTimeCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Tempo de Estudo
          </Text>
          <View style={styles.studyTimeStats}>
            <View style={styles.studyTimeStat}>
              <Text style={[styles.studyTimeNumber, { color: colors.primary }]}>
                {user?.stats?.totalTimeSpent || 0}
              </Text>
              <Text style={[styles.studyTimeLabel, { color: colors.icon }]}>
                minutos totais
              </Text>
            </View>
            <View style={styles.studyTimeStat}>
              <Text style={[styles.studyTimeNumber, { color: colors.success }]}>
                {Math.round((user?.stats?.totalTimeSpent || 0) / 7)}
              </Text>
              <Text style={[styles.studyTimeLabel, { color: colors.icon }]}>
                média diária
              </Text>
            </View>
          </View>
        </View>
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
  levelCard: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    marginBottom: spacing.lg,
    ...shadows.sm,
  },
  levelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  levelTitle: {
    fontSize: fonts.size.xl,
    fontWeight: 'bold',
  },
  levelXP: {
    fontSize: fonts.size.md,
    fontWeight: '600',
  },
  levelProgressBar: {
    height: 12,
    borderRadius: borderRadius.sm,
    overflow: 'hidden',
    marginBottom: spacing.sm,
  },
  levelProgressFill: {
    height: '100%',
    borderRadius: borderRadius.sm,
  },
  levelProgressText: {
    fontSize: fonts.size.sm,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  statCard: {
    width: (width - spacing.md * 3) / 2,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: spacing.sm,
    ...shadows.sm,
  },
  statNumber: {
    fontSize: fonts.size.xxl,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: fonts.size.sm,
  },
  weeklyCard: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    marginBottom: spacing.lg,
    ...shadows.sm,
  },
  sectionTitle: {
    fontSize: fonts.size.lg,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  weeklyChart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 100,
  },
  dayColumn: {
    alignItems: 'center',
    flex: 1,
  },
  barContainer: {
    height: 60,
    justifyContent: 'flex-end',
    marginBottom: spacing.xs,
  },
  xpBar: {
    width: 20,
    borderRadius: borderRadius.sm,
  },
  dayLabel: {
    fontSize: fonts.size.xs,
    marginBottom: spacing.xs,
  },
  xpLabel: {
    fontSize: fonts.size.xs,
    fontWeight: '600',
  },
  achievementsCard: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    marginBottom: spacing.lg,
    ...shadows.sm,
  },
  achievementsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  viewAllText: {
    fontSize: fonts.size.sm,
    fontWeight: '600',
  },
  achievementsList: {
    gap: spacing.md,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  achievementIcon: {
    fontSize: fonts.size.xl,
    marginRight: spacing.md,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: fonts.size.md,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  achievementDescription: {
    fontSize: fonts.size.sm,
  },
  achievementXP: {
    fontSize: fonts.size.sm,
    fontWeight: 'bold',
  },
  studyTimeCard: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    ...shadows.sm,
  },
  studyTimeStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  studyTimeStat: {
    alignItems: 'center',
  },
  studyTimeNumber: {
    fontSize: fonts.size.xxl,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  studyTimeLabel: {
    fontSize: fonts.size.sm,
  },
});
