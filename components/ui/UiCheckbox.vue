<template>
  <label class="ui-checkbox">
    <input
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      class="ui-checkbox__input"
      @change="handleChange"
    />
    <span class="ui-checkbox__box">
      <svg v-if="modelValue" width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M2 6L5 9L10 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </span>
    <span v-if="$slots.default || label" class="ui-checkbox__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean
  label?: string
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  disabled: false
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'change': [value: boolean]
}>()

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.checked)
  emit('change', target.checked)
}
</script>

<style scoped>
.ui-checkbox {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  user-select: none;
}

.ui-checkbox__input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.ui-checkbox__box {
  position: relative;
  height: 20px;
  width: 20px;
  background-color: white;
  border: 2px solid #d1d5db;
  border-radius: 4px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: white;
}

.ui-checkbox:hover .ui-checkbox__box {
  border-color: #3b82f6;
}

.ui-checkbox__input:checked ~ .ui-checkbox__box {
  background-color: #3b82f6;
  border-color: #3b82f6;
}

.ui-checkbox__input:disabled ~ .ui-checkbox__box {
  opacity: 0.5;
  cursor: not-allowed;
}

.ui-checkbox__label {
  color: #374151;
  font-size: 0.9375rem;
}

.ui-checkbox__input:checked ~ .ui-checkbox__label {
  color: #111827;
}
</style>
