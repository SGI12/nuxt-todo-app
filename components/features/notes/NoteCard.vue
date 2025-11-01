<template>
  <UiCard variant="elevated" hoverable>
    <template #header>
      <div class="note-card-header">
        <h3 class="note-card-header__title">{{ note.title || 'Без названия' }}</h3>
        <div class="note-card-header__meta">
          <span class="note-card-header__date">{{ formattedDate }}</span>
          <span class="note-card-header__stats">
            {{ completedCount }}/{{ note.todos.length }} выполнено
          </span>
        </div>
      </div>
    </template>

    <div class="note-card-body">
      <div v-if="note.todos.length > 0" class="note-card-todos">
        <div
          v-for="todo in previewTodos"
          :key="todo.id"
          class="note-card-todo"
        >
          <UiCheckbox :model-value="todo.completed" disabled />
          <span :class="['note-card-todo__text', { 'note-card-todo__text--completed': todo.completed }]">
            {{ todo.text }}
          </span>
        </div>
        <div v-if="note.todos.length > maxPreview" class="note-card-todos__more">
          +{{ note.todos.length - maxPreview }} ещё...
        </div>
      </div>
      <div v-else class="note-card-empty">
        <p>Нет задач</p>
      </div>
    </div>

    <template #footer>
      <div class="note-card-actions">
        <UiButton variant="primary" @click="$emit('edit', note.id)">
          <template #icon>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M11.333 2.00004C11.5081 1.82494 11.716 1.68605 11.9447 1.59129C12.1735 1.49653 12.4187 1.44775 12.6663 1.44775C12.914 1.44775 13.1592 1.49653 13.3879 1.59129C13.6167 1.68605 13.8246 1.82494 13.9997 2.00004C14.1748 2.17513 14.3137 2.383 14.4084 2.61178C14.5032 2.84055 14.552 3.08575 14.552 3.33337C14.552 3.58099 14.5032 3.82619 14.4084 4.05497C14.3137 4.28374 14.1748 4.49161 13.9997 4.66671L5.33301 13.3334L1.33301 14.6667L2.66634 10.6667L11.333 2.00004Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </template>
          Редактировать
        </UiButton>
        <UiButton variant="danger" @click="$emit('delete', note.id)">
          <template #icon>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 4H3.33333H14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M5.33301 4.00004V2.66671C5.33301 2.31309 5.47348 1.97395 5.7235 1.7239C5.97353 1.47385 6.31267 1.33337 6.66634 1.33337H9.33301C9.68663 1.33337 10.0258 1.47385 10.2758 1.7239C10.5258 1.97395 10.6663 2.31309 10.6663 2.66671V4.00004M12.6663 4.00004V13.3334C12.6663 13.687 12.5259 14.0262 12.2758 14.2762C12.0258 14.5263 11.6867 14.6667 11.333 14.6667H4.66634C4.31272 14.6667 3.97358 14.5263 3.72353 14.2762C3.47348 14.0262 3.33301 13.687 3.33301 13.3334V4.00004H12.6663Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </template>
          Удалить
        </UiButton>
      </div>
    </template>
  </UiCard>
</template>

<script setup lang="ts">
import type { Note } from '@/types'

interface Props {
  note: Note
  maxPreview?: number
}

const props = withDefaults(defineProps<Props>(), {
  maxPreview: 3
})

defineEmits<{
  'edit': [id: string]
  'delete': [id: string]
}>()

const previewTodos = computed(() => {
  return props.note.todos.slice(0, props.maxPreview)
})

const completedCount = computed(() => {
  return props.note.todos.filter(todo => todo.completed).length
})

const formattedDate = computed(() => {
  const date = new Date(props.note.updatedAt)
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
})
</script>

<style scoped>
.note-card-header {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.note-card-header__title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  word-break: break-word;
}

.note-card-header__meta {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  font-size: 0.875rem;
  color: #6b7280;
}

.note-card-header__stats {
  color: #3b82f6;
  font-weight: 500;
}

.note-card-body {
  min-height: 100px;
}

.note-card-todos {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.note-card-todo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #374151;
}

.note-card-todo__text {
  flex: 1;
  font-size: 0.875rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.note-card-todo__text--completed {
  text-decoration: line-through;
  color: #9ca3af;
}

.note-card-todos__more {
  padding: 0.5rem 0;
  font-size: 0.875rem;
  color: #6b7280;
  font-style: italic;
}

.note-card-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100px;
  color: #9ca3af;
  font-style: italic;
}

.note-card-empty p {
  margin: 0;
}

.note-card-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.note-card-actions > * {
  flex: 1;
  min-width: 140px;
}

@media (max-width: 640px) {
  .note-card-actions {
    flex-direction: column;
  }

  .note-card-actions > * {
    width: 100%;
    min-width: auto;
  }
}
</style>
