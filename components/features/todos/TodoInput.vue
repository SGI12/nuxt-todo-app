<template>
  <div class="todo-input">
    <UiInput
      v-model="inputValue"
      placeholder="Добавить новую задачу..."
      @enter="handleAdd"
    />
    <UiButton
      :disabled="!inputValue.trim()"
      @click="handleAdd"
    >
      <template #icon>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 4V16M4 10H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </template>
      Добавить
    </UiButton>
  </div>
</template>

<script setup lang="ts">
const inputValue = ref('')

const emit = defineEmits<{
  'add': [text: string]
}>()

const handleAdd = () => {
  if (!inputValue.value.trim()) return

  emit('add', inputValue.value.trim())
  inputValue.value = ''
}
</script>

<style scoped>
.todo-input {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
}

@media (max-width: 640px) {
  .todo-input {
    flex-direction: column;
    align-items: stretch;
  }

  .todo-input > :last-child {
    width: 100%;
  }
}
</style>
