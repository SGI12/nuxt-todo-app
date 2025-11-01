<template>
  <div class="todo-item">
    <UiCheckbox
      :model-value="todo.completed"
      :disabled="readOnly"
      @update:model-value="$emit('toggle', todo.id)"
    />

    <UiInput
      v-if="isEditing"
      ref="editInputRef"
      v-model="editText"
      class="todo-item__input"
      @blur="saveEdit"
      @enter="saveEdit"
      @esc="cancelEdit"
    />
    <span
      v-else
      :class="['todo-item__text', { 'todo-item__text--completed': todo.completed }]"
      @dblclick="startEdit"
    >
      {{ todo.text }}
    </span>

    <div v-if="!readOnly" class="todo-item__actions">
      <UiButton
        v-if="!isEditing"
        variant="ghost"
        size="sm"
        icon-only
        @click="startEdit"
      >
        <template #icon>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M11.333 2.00004C11.5081 1.82494 11.716 1.68605 11.9447 1.59129C12.1735 1.49653 12.4187 1.44775 12.6663 1.44775C12.914 1.44775 13.1592 1.49653 13.3879 1.59129C13.6167 1.68605 13.8246 1.82494 13.9997 2.00004C14.1748 2.17513 14.3137 2.383 14.4084 2.61178C14.5032 2.84055 14.552 3.08575 14.552 3.33337C14.552 3.58099 14.5032 3.82619 14.4084 4.05497C14.3137 4.28374 14.1748 4.49161 13.9997 4.66671L5.33301 13.3334L1.33301 14.6667L2.66634 10.6667L11.333 2.00004Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </template>
      </UiButton>
      <UiButton
        variant="ghost"
        size="sm"
        icon-only
        @click="$emit('delete', todo.id)"
      >
        <template #icon>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 4H3.33333H14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M5.33301 4.00004V2.66671C5.33301 2.31309 5.47348 1.97395 5.7235 1.7239C5.97353 1.47385 6.31267 1.33337 6.66634 1.33337H9.33301C9.68663 1.33337 10.0258 1.47385 10.2758 1.7239C10.5258 1.97395 10.6663 2.31309 10.6663 2.66671V4.00004M12.6663 4.00004V13.3334C12.6663 13.687 12.5259 14.0262 12.2758 14.2762C12.0258 14.5263 11.6867 14.6667 11.333 14.6667H4.66634C4.31272 14.6667 3.97358 14.5263 3.72353 14.2762C3.47348 14.0262 3.33301 13.687 3.33301 13.3334V4.00004H12.6663Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </template>
      </UiButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TodoItem } from '@/types'

interface Props {
  todo: TodoItem
  readOnly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  readOnly: false
})

const emit = defineEmits<{
  'toggle': [id: string]
  'update': [id: string, text: string]
  'delete': [id: string]
}>()

const isEditing = ref(false)
const editText = ref('')
const editInputRef = ref<any>(null)

const startEdit = () => {
  if (props.readOnly) return
  editText.value = props.todo.text
  isEditing.value = true
  nextTick(() => {
    editInputRef.value?.$el.querySelector('input')?.focus()
    editInputRef.value?.$el.querySelector('input')?.select()
  })
}

const saveEdit = () => {
  if (editText.value.trim() && editText.value !== props.todo.text) {
    emit('update', props.todo.id, editText.value.trim())
  }
  isEditing.value = false
}

const cancelEdit = () => {
  isEditing.value = false
  editText.value = ''
}
</script>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  transition: all 0.2s;
}

.todo-item:hover {
  border-color: #d1d5db;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.todo-item__input {
  flex: 1;
}

.todo-item__text {
  flex: 1;
  color: #111827;
  font-size: 0.9375rem;
  line-height: 1.5;
  word-break: break-word;
  cursor: pointer;
  padding: 0.25rem 0;
}

.todo-item__text--completed {
  text-decoration: line-through;
  color: #9ca3af;
}

.todo-item__actions {
  display: flex;
  gap: 0.25rem;
  opacity: 0;
  transition: opacity 0.2s;
}

.todo-item:hover .todo-item__actions {
  opacity: 1;
}

@media (max-width: 640px) {
  .todo-item__actions {
    opacity: 1;
  }

  .todo-item {
    padding: 0.625rem;
  }
}
</style>
