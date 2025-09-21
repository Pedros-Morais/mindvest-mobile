import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Text, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { 
  AnimatedCard, 
  ProgressBar, 
  StreakCounter, 
  StatCard, 
  QuickAction 
} from '@/components/ui/HomeComponents';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  // Mock user data - in real app this would come from store/API
  const [userData] = useState({
    name: 'Teste',
    streak: 0,
    dailyGoal: { earned: 75, target: 100 },
    stats: {
      totalXP: 0,
      completedLessons: 0,
      level: 1
    },
    recentActivity: {
      title: 'Lição Concluída',
      description: '"O que são Investimentos?" - +50 XP',
      time: '2h'
    }
  });

  const progressPercentage = (userData.dailyGoal.earned / userData.dailyGoal.target) * 100;

  const handleContinueLearning = () => {
    router.push('/(tabs)/explore');
  };

  const handleProgress = () => {
    console.log('Navigate to progress');
  };

  const handleAchievements = () => {
    console.log('Navigate to achievements');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <AnimatedCard delay={100} style={styles.headerCard}>
          <View style={styles.header}>
            <View>
              <Text style={[styles.greeting, { color: colors.text }]}>
                Olá, {userData.name}!
              </Text>
              <Text style={[styles.subtitle, { color: colors.text + '80' }]}>
                Pronto para aprender sobre investimentos?
              </Text>
            </View>
            <StreakCounter streak={userData.streak} isActive={userData.streak > 0} />
          </View>
        </AnimatedCard>

        {/* Daily Goal Progress */}
        <AnimatedCard delay={200} style={styles.goalCard}>
          <View style={styles.goalHeader}>
            <Text style={[styles.goalTitle, { color: colors.text }]}>
              Meta Diária
            </Text>
            <Text style={[styles.goalXP, { color: '#FFD700' }]}>
              {userData.dailyGoal.earned} / {userData.dailyGoal.target} XP
            </Text>
          </View>
          <ProgressBar 
            progress={progressPercentage} 
            color="#FFD700" 
            backgroundColor="#E0E0E0" 
          />
          <Text style={[styles.progressText, { color: colors.text + '80' }]}>
            {Math.round(progressPercentage)}% concluído
          </Text>
        </AnimatedCard>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <StatCard
            value={userData.stats.totalXP}
            label="XP Total"
            icon="trophy-outline"
            color="#FFD700"
            delay={300}
          />
          <StatCard
            value={userData.stats.completedLessons}
            label="Lições"
            icon="book-outline"
            color="#4CAF50"
            delay={400}
          />
          <StatCard
            value={userData.stats.level}
            label="Nível"
            icon="trending-up-outline"
            color="#FF9800"
            delay={500}
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsContainer}>
          <QuickAction
            title="Continuar Aprendendo"
            icon="play-circle-outline"
            onPress={handleContinueLearning}
            variant="primary"
            delay={600}
          />
          
          <View style={styles.secondaryActions}>
            <View style={styles.secondaryActionItem}>
              <QuickAction
                title="Progresso"
                icon="bar-chart-outline"
                onPress={handleProgress}
                variant="secondary"
                delay={700}
              />
            </View>
            <View style={styles.secondaryActionItem}>
              <QuickAction
                title="Conquistas"
                icon="medal-outline"
                onPress={handleAchievements}
                variant="secondary"
                delay={800}
              />
            </View>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.activitySection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Atividade Recente
          </Text>
          <AnimatedCard delay={900} style={styles.activityCard}>
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
              </View>
              <View style={styles.activityContent}>
                <Text style={[styles.activityTitle, { color: colors.text }]}>
                  {userData.recentActivity.title}
                </Text>
                <Text style={[styles.activityDescription, { color: colors.text + '80' }]}>
                  {userData.recentActivity.description}
                </Text>
              </View>
              <Text style={[styles.activityTime, { color: colors.text + '60' }]}>
                {userData.recentActivity.time}
              </Text>
            </View>
          </AnimatedCard>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  headerCard: {
    marginTop: 10,
    marginBottom: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  goalCard: {
    marginVertical: 8,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  goalXP: {
    fontSize: 16,
    fontWeight: '700',
  },
  progressText: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    marginVertical: 16,
    gap: 8,
  },
  actionsContainer: {
    marginVertical: 16,
  },
  secondaryActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  secondaryActionItem: {
    flex: 1,
  },
  activitySection: {
    marginVertical: 16,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
  activityCard: {
    marginVertical: 0,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityIcon: {
    marginRight: 16,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  activityDescription: {
    fontSize: 14,
    fontWeight: '500',
  },
  activityTime: {
    fontSize: 12,
    fontWeight: '500',
  },
});
