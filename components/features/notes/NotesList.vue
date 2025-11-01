<template>
  <div class="notes-list">
    <div v-if="notes.length === 0" class="notes-list-empty">
      <slot name="empty">
        <div class="notes-list-empty__content">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            <circle cx="60" cy="60" r="50" fill="#F3F4F6"/>
            <path d="M40 50H80M40 60H70M40 70H75" stroke="#9CA3AF" stroke-width="3" stroke-linecap="round"/>
          </svg>
          <h2>Пока нет заметок</h2>
          <p>Создайте свою первую заметку, чтобы начать работу</p>
        </div>
      </slot>
    </div>

    <div v-else class="notes-list-grid">
      <NoteCard
        v-for="note in notes"
        :key="note.id"
        :note="note"
        @edit="$emit('edit', $event)"
        @delete="$emit('delete', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Note } from '@/types'

interface Props {
  notes: Note[]
}

defineProps<Props>()

defineEmits<{
  'edit': [id: string]
  'delete': [id: string]
}>()
</script>

<style scoped>
.notes-list {
  width: 100%;
}

.notes-list-empty {
  background: white;
  border-radius: 16px;
  padding: 4rem 2rem;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.notes-list-empty__content svg {
  margin: 0 auto 2rem;
}

.notes-list-empty__content h2 {
  color: #111827;
  font-size: 1.875rem;
  font-weight: 700;
  margin: 0 0 0.75rem 0;
}

.notes-list-empty__content p {
  color: #6b7280;
  font-size: 1.125rem;
  margin: 0;
}

.notes-list-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .notes-list-grid {
    grid-template-columns: 1fr;
  }

  .notes-list-empty {
    padding: 3rem 1.5rem;
  }

  .notes-list-empty__content h2 {
    font-size: 1.5rem;
  }
}
</style>
