import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, ScrollView, TextInput, Alert, Modal, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { spacing, fonts, borderRadius, shadows } from '@/styles/global';
import { AnimatedCard } from '@/components/ui/AnimatedCard';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { FloatingActionButton } from '@/components/ui/FloatingActionButton';
import { SuccessAnimation } from '@/components/ui/SuccessAnimation';
import { TopicsService } from '@/modules/topics/services/topicsService';
import type { Topic, TopicInput } from '@/modules/topics/types';
import { useForm } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const topicSchema = z.object({
  title: z.string().min(3, 'Título deve ter ao menos 3 caracteres'),
  body: z.string().min(10, 'Descrição deve ter ao menos 10 caracteres'),
});

type TopicForm = z.infer<typeof topicSchema>;

export default function TopicsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editingTopic, setEditingTopic] = useState<Topic | null>(null);
  const [success, setSuccess] = useState<{ visible: boolean; message: string }>({ visible: false, message: '' });

  const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<TopicForm>({
    resolver: zodResolver(topicSchema),
    defaultValues: { title: '', body: '' },
  });

  useEffect(() => {
    loadTopics();
  }, []);

  const loadTopics = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await TopicsService.list();
      setTopics(data);
    } catch (e: any) {
      console.error('Falha ao carregar tópicos', e);
      setError('Não foi possível carregar os tópicos. Verifique sua conexão.');
    } finally {
      setLoading(false);
    }
  };

  const openNewModal = () => {
    setEditingTopic(null);
    reset({ title: '', body: '' });
    setModalVisible(true);
  };

  const openEditModal = (topic: Topic) => {
    setEditingTopic(topic);
    reset({ title: topic.title, body: topic.body });
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setEditingTopic(null);
  };

  const onSubmit = async (data: TopicForm) => {
    try {
      if (editingTopic) {
        const optimistic = topics.map(t => t.id === editingTopic.id ? { ...t, ...data } : t);
        setTopics(optimistic);
        const updated = await TopicsService.update(editingTopic.id, data as TopicInput);
        setTopics(prev => prev.map(t => t.id === updated.id ? updated : t));
        setSuccess({ visible: true, message: 'Tópico atualizado!' });
      } else {
        const created = await TopicsService.create(data as TopicInput);
        setTopics(prev => [{ ...created, id: created.id ?? Math.floor(Math.random() * 100000) }, ...prev]);
        setSuccess({ visible: true, message: 'Tópico criado!' });
      }
      closeModal();
    } catch (e: any) {
      Alert.alert('Erro', 'Não foi possível salvar. Tente novamente.');
    }
  };

  const handleDelete = async (topic: Topic) => {
    Alert.alert('Excluir', 'Deseja excluir este tópico?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: async () => {
        const prev = [...topics];
        try {
          setTopics(t => t.filter(x => x.id !== topic.id));
          await TopicsService.remove(topic.id);
          setSuccess({ visible: true, message: 'Tópico excluído!' });
        } catch (e: any) {
          Alert.alert('Erro', 'Falha ao excluir. Tente novamente.');
          // rollback if necessary (already removed visually)
          setTopics(prev);
        }
      }}
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.title, { color: colors.text }]}>Tópicos</Text>

        {loading && (
          <View style={styles.centered}> 
            <ActivityIndicator color={colors.primary} />
            <Text style={{ color: colors.text, marginTop: spacing.sm }}>Carregando...</Text>
          </View>
        )}

        {!!error && (
          <View style={[styles.errorBox, { borderColor: colors.error }]}> 
            <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
            <AnimatedButton title="Tentar novamente" onPress={loadTopics} variant="secondary" />
          </View>
        )}

        {!loading && !error && topics.map((topic) => (
          <AnimatedCard key={topic.id} style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.cardTitle, { color: colors.text }]}>{topic.title}</Text>
              <Text style={[styles.cardBody, { color: colors.icon }]}>{topic.body}</Text>
            </View>
            <View style={styles.actions}>
              <AnimatedButton title="Editar" onPress={() => openEditModal(topic)} size="small" />
              <AnimatedButton title="Excluir" onPress={() => handleDelete(topic)} variant="secondary" size="small" />
            </View>
          </AnimatedCard>
        ))}

      </ScrollView>

      <FloatingActionButton icon="＋" onPress={openNewModal} />

      {/* Sucesso */}
      <SuccessAnimation 
        isVisible={success.visible}
        message={success.message}
        onComplete={() => setSuccess({ visible: false, message: '' })}
      />

      {/* Modal de Formulário */}
      <Modal visible={modalVisible} transparent animationType="slide" onRequestClose={closeModal}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}> 
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              {editingTopic ? 'Editar Tópico' : 'Novo Tópico'}
            </Text>

            <Controller
              control={control}
              name="title"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder="Título"
                  placeholderTextColor={colors.icon}
                  style={[styles.input, { borderColor: colors.border, color: colors.text }]}
                  autoCapitalize="sentences"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            {errors.title && <Text style={[styles.errorField, { color: colors.error }]}>{errors.title.message}</Text>}

            <Controller
              control={control}
              name="body"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder="Descrição"
                  placeholderTextColor={colors.icon}
                  style={[styles.textArea, { borderColor: colors.border, color: colors.text }]}
                  multiline
                  numberOfLines={4}
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            {errors.body && <Text style={[styles.errorField, { color: colors.error }]}>{errors.body.message}</Text>}

            <View style={styles.modalActions}>
              <AnimatedButton title="Cancelar" variant="secondary" onPress={closeModal} />
              <AnimatedButton title={editingTopic ? 'Salvar' : 'Criar'} onPress={handleSubmit(onSubmit)} loading={isSubmitting} />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
  },
  title: {
    fontSize: fonts.size.title,
    fontWeight: 'bold',
    marginBottom: spacing.md,
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.lg,
  },
  errorBox: {
    borderWidth: 1,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    backgroundColor: '#FFF5F5',
    gap: spacing.sm,
  },
  errorText: {
    fontSize: fonts.size.md,
    fontWeight: '500',
  },
  card: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    backgroundColor: '#FFFFFF',
    marginBottom: spacing.md,
    ...shadows.sm,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  cardTitle: {
    fontSize: fonts.size.lg,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  cardBody: {
    fontSize: fonts.size.md,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  modalContent: {
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
  },
  modalTitle: {
    fontSize: fonts.size.xl,
    fontWeight: '700',
    marginBottom: spacing.md,
  },
  input: {
    borderWidth: 1,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: fonts.size.md,
    marginBottom: spacing.sm,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: fonts.size.md,
    marginBottom: spacing.md,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  errorField: {
    fontSize: fonts.size.sm,
    marginBottom: spacing.sm,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.sm,
  }
});