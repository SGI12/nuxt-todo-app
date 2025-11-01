<template>
  <div class="page-container">
    <header class="page-header">
      <div class="header-top">
        <UiButton variant="secondary" @click="editor.handleBack">
          <template #icon>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </template>
          Назад
        </UiButton>
        <div class="header-actions">
          <UiButton
            variant="ghost"
            size="sm"
            icon-only
            :disabled="!editor.canUndo.value"
            @click="editor.handleUndo"
            title="Отменить (Ctrl+Z)"
          >
            <template #icon>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3.33301 10.0001H14.9997C15.8837 10.0001 16.7316 10.3513 17.3567 10.9764C17.9818 11.6015 18.333 12.4494 18.333 13.3334C18.333 14.2175 17.9818 15.0653 17.3567 15.6904C16.7316 16.3155 15.8837 16.6667 14.9997 16.6667H13.333" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6.66634 6.66675L3.33301 10.0001L6.66634 13.3334" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </template>
          </UiButton>
          <UiButton
            variant="ghost"
            size="sm"
            icon-only
            :disabled="!editor.canRedo.value"
            @click="editor.handleRedo"
            title="Повторить (Ctrl+Y)"
          >
            <template #icon>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M16.667 10.0001H5.00033C4.11627 10.0001 3.26843 10.3513 2.64331 10.9764C2.01818 11.6015 1.66699 12.4494 1.66699 13.3334C1.66699 14.2175 2.01818 15.0653 2.64331 15.6904C3.26843 16.3155 4.11627 16.6667 5.00033 16.6667H6.66699" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M13.333 6.66675L16.6663 10.0001L13.333 13.3334" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </template>
          </UiButton>
        </div>
      </div>
    </header>

    <main class="main-content">
      <UiCard variant="elevated" class="note-editor">
        <div class="note-title-section">
          <UiInput
            v-model="editor.currentTitle.value"
            placeholder="Название заметки"
            size="lg"
            @input="editor.updateTitle(editor.currentTitle.value)"
          />
        </div>

        <div class="todos-section">
          <div class="section-header">
            <h2>Задачи</h2>
            <span class="todos-count">
              {{ completedCount }}/{{ totalCount }} выполнено
            </span>
          </div>

          <TodoInput @add="editor.addTodo" />

          <TodosList
            :todos="editor.currentTodos.value"
            @toggle="editor.toggleTodo"
            @update="editor.updateTodoText"
            @delete="editor.deleteTodo"
          />
        </div>

        <template #footer>
          <div class="note-actions">
            <UiButton variant="danger" @click="editor.deleteNote">
              <template #icon>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M2.5 5H4.16667H17.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M6.66699 5.00004V3.33337C6.66699 2.89135 6.84259 2.46742 7.15515 2.15486C7.46771 1.8423 7.89163 1.66671 8.33366 1.66671H11.667C12.109 1.66671 12.5329 1.8423 12.8455 2.15486C13.1581 2.46742 13.3337 2.89135 13.3337 3.33337V5.00004M15.8337 5.00004V16.6667C15.8337 17.1087 15.6581 17.5327 15.3455 17.8452C15.0329 18.1578 14.609 18.3334 14.167 18.3334H5.83366C5.39163 18.3334 4.96771 18.1578 4.65515 17.8452C4.34259 17.5327 4.16699 17.1087 4.16699 16.6667V5.00004H15.8337Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </template>
              Удалить заметку
            </UiButton>
            <UiButton
              v-if="editor.hasChanges.value"
              variant="secondary"
              @click="editor.cancelEditing"
            >
              <template #icon>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </template>
              Отменить изменения
            </UiButton>
            <UiButton
              variant="primary"
              :disabled="!editor.hasChanges.value"
              @click="handleSave"
            >
              <template #icon>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M15.8337 17.5H4.16699C3.72497 17.5 3.30104 17.3244 2.98848 17.0118C2.67592 16.6993 2.50033 16.2754 2.50033 15.8333V4.16667C2.50033 3.72464 2.67592 3.30072 2.98848 2.98816C3.30104 2.67559 3.72497 2.5 4.16699 2.5H13.3337L17.5003 6.66667V15.8333C17.5003 16.2754 17.3247 16.6993 17.0122 17.0118C16.6996 17.3244 16.2757 17.5 15.8337 17.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M14.167 17.5V10.8333H5.83366V17.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M5.83366 2.5V6.66667H12.5003" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </template>
              Сохранить
            </UiButton>
          </div>
        </template>
      </UiCard>
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
const route = useRoute()
const notesStore = useNotesStore()
const confirmDialog = useConfirmDialog()

const noteId = computed(() => route.params.id as string)
const editor = useNoteEditor(noteId)

const { completedCount, totalCount } = editor

onMounted(() => {
  notesStore.initStore()
  editor.initEditor()
})

useKeyboardShortcuts({
  onUndo: editor.handleUndo,
  onRedo: editor.handleRedo,
  onSave: () => {
    if (editor.hasChanges.value) {
      editor.saveNote()
    }
  }
})

const handleSave = () => {
  editor.saveNote()
}

useHead({
  title: computed(() => editor.currentTitle.value || 'Редактирование заметки'),
  meta: [
    { name: 'description', content: 'Редактирование заметки и управление задачами' }
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
  max-width: 900px;
  margin: 0 auto 2rem;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.header-actions {
  display: flex;
  gap: 0.5rem;
}

.main-content {
  max-width: 900px;
  margin: 0 auto;
}

.note-editor {
  padding: 0;
}

.note-title-section {
  padding: 1.5rem;
  border-bottom: 1px solid #f3f4f6;
}

.todos-section {
  padding: 1.5rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.section-header h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
}

.todos-count {
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.25rem 0.75rem;
  background-color: #f3f4f6;
  border-radius: 12px;
}

.note-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.note-actions > * {
  flex: 1;
  min-width: 150px;
}

@media (max-width: 768px) {
  .page-container {
    padding: 1.5rem 1rem;
  }

  .note-title-section,
  .todos-section {
    padding: 1rem;
  }

  .note-actions {
    flex-direction: column;
  }

  .note-actions > * {
    width: 100%;
    min-width: auto;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>
