<template>
  <div class="page-container">
    <header class="page-header">
      <div class="header-content">
        <h1 class="page-title">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M9 5H7C6.46957 5 5.96086 5.21071 5.58579 5.58579C5.21071 5.96086 5 6.46957 5 7V19C5 19.5304 5.21071 20.0391 5.58579 20.4142C5.96086 20.7893 6.46957 21 7 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V7C19 6.46957 18.7893 5.96086 18.4142 5.58579C18.0391 5.21071 17.5304 5 17 5H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9 5C9 4.46957 9.21071 3.96086 9.58579 3.58579C9.96086 3.21071 10.4696 3 11 3H13C13.5304 3 14.0391 3.21071 14.4142 3.58579C14.7893 3.96086 15 4.46957 15 5C15 5.53043 14.7893 6.03914 14.4142 6.41421C14.0391 6.78929 13.5304 7 13 7H11C10.4696 7 9.96086 6.78929 9.58579 6.41421C9.21071 6.03914 9 5.53043 9 5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Мои заметки
        </h1>
        <p class="page-subtitle">
          Всего заметок: {{ notesStore.totalNotes }}
        </p>
      </div>
      <UiButton size="lg" @click="handleCreateNote">
        <template #icon>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 4V16M4 10H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </template>
        Создать заметку
      </UiButton>
    </header>

    <main class="main-content">
      <NotesList
        :notes="notesStore.allNotes"
        @edit="handleEditNote"
        @delete="handleDeleteNote"
      >
        <template #empty>
          <div class="empty-state">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
              <circle cx="60" cy="60" r="50" fill="#F3F4F6"/>
              <path d="M40 50H80M40 60H70M40 70H75" stroke="#9CA3AF" stroke-width="3" stroke-linecap="round"/>
            </svg>
            <h2>Пока нет заметок</h2>
            <p>Создайте свою первую заметку, чтобы начать работу</p>
            <UiButton size="lg" @click="handleCreateNote">
              <template #icon>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 4V16M4 10H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </template>
              Создать первую заметку
            </UiButton>
          </div>
        </template>
      </NotesList>
    </main>

    <UiDialog
      v-model="confirmDialog.isOpen.value"
      :title="confirmDialog.dialogConfig.value.title"
      size="sm"
    >
      <p>{{ confirmDialog.dialogConfig.value.message }}</p>
      <template #footer>
        <UiButton variant="secondary" @click="confirmDialog.handleCancel">
          {{ confirmDialog.dialogConfig.value.cancelText }}
        </UiButton>
        <UiButton variant="danger" @click="confirmDialog.handleConfirm">
          {{ confirmDialog.dialogConfig.value.confirmText }}
        </UiButton>
      </template>
    </UiDialog>
  </div>
</template>

<script setup lang="ts">
const notesStore = useNotesStore()
const { createNote, editNote, deleteNote } = useNoteActions()
const confirmDialog = useConfirmDialog()

onMounted(() => {
  notesStore.initStore()
})

const handleCreateNote = () => {
  createNote('Новая заметка')
}

const handleEditNote = (id: string) => {
  editNote(id)
}

const handleDeleteNote = async (id: string) => {
  const confirmed = await confirmDialog.confirm({
    title: 'Удалить заметку?',
    message: 'Вы действительно хотите удалить эту заметку? Это действие нельзя будет отменить.',
    confirmText: 'Удалить',
    cancelText: 'Отмена'
  })

  if (confirmed) {
    deleteNote(id)
  }
}

useHead({
  title: 'Главная - Мои заметки',
  meta: [
    { name: 'description', content: 'Управляйте своими заметками и задачами легко и эффективно' }
  ]
})
</script>

<style scoped>
.page-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 1rem;
}

.page-header {
  max-width: 1200px;
  margin: 0 auto 2rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.header-content {
  flex: 1;
}

.page-title {
  color: white;
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.page-subtitle {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.125rem;
  margin: 0;
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.empty-state svg {
  margin: 0 auto;
}

.empty-state h2 {
  color: #111827;
  font-size: 1.875rem;
  font-weight: 700;
  margin: 0;
}

.empty-state p {
  color: #6b7280;
  font-size: 1.125rem;
  margin: 0;
}

@media (max-width: 768px) {
  .page-container {
    padding: 1.5rem 1rem;
  }

  .page-header {
    flex-direction: column;
    align-items: stretch;
  }

  .page-title {
    font-size: 2rem;
  }

  .empty-state h2 {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 1.75rem;
  }

  .page-title svg {
    width: 24px;
    height: 24px;
  }
}
</style>
