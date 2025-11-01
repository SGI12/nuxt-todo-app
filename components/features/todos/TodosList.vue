<template>
  <div class="todos-list">
    <div v-if="todos.length === 0" class="todos-list-empty">
      <slot name="empty">
        <p>Пока нет задач. Добавьте первую!</p>
      </slot>
    </div>

    <TransitionGroup v-else name="todo" tag="div" class="todos-list-items">
      <TodoItem
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        :read-only="readOnly"
        @toggle="$emit('toggle', $event)"
        @update="(id, text) => $emit('update', id, text)"
        @delete="$emit('delete', $event)"
      />
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import type { TodoItem } from '@/types'

interface Props {
  todos: TodoItem[]
  readOnly?: boolean
}

withDefaults(defineProps<Props>(), {
  readOnly: false
})

defineEmits<{
  'toggle': [id: string]
  'update': [id: string, text: string]
  'delete': [id: string]
}>()
</script>

<style scoped>
.todos-list {
  width: 100%;
}

.todos-list-items {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.todos-list-empty {
  padding: 3rem 2rem;
  text-align: center;
  color: #9ca3af;
  font-style: italic;
}

.todos-list-empty p {
  margin: 0;
}

.todo-move,
.todo-enter-active,
.todo-leave-active {
  transition: all 0.3s ease;
}

.todo-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.todo-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.todo-leave-active {
  position: absolute;
  width: calc(100% - 1.5rem);
}
</style>
