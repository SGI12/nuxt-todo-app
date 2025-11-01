<template>
  <div class="ui-input">
    <label v-if="label" :for="inputId" class="ui-input__label">
      {{ label }}
      <span v-if="required" class="ui-input__required">*</span>
    </label>
    <div class="ui-input__wrapper">
      <span v-if="$slots.prefix" class="ui-input__prefix">
        <slot name="prefix" />
      </span>
      <input
        :id="inputId"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :class="[
          'ui-input__field',
          { 'ui-input__field--error': error }
        ]"
        @input="handleInput"
        @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)"
        @keyup.enter="$emit('enter')"
        @keyup.esc="$emit('esc')"
      />
      <span v-if="$slots.suffix" class="ui-input__suffix">
        <slot name="suffix" />
      </span>
    </div>
    <span v-if="error" class="ui-input__error">{{ error }}</span>
    <span v-else-if="hint" class="ui-input__hint">{{ hint }}</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: string
  type?: 'text' | 'email' | 'password' | 'number' | 'search'
  label?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  error?: string
  hint?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'text',
  disabled: false,
  required: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'blur': [event: FocusEvent]
  'focus': [event: FocusEvent]
  'enter': []
  'esc': []
}>()

const inputId = `input-${Math.random().toString(36).slice(2, 9)}`

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<style scoped>
.ui-input {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.ui-input__label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.ui-input__required {
  color: #ef4444;
}

.ui-input__wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.ui-input__field {
  flex: 1;
  padding: 0.625rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  color: #111827;
  background-color: white;
  transition: all 0.2s;
  outline: none;
}

.ui-input__field:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.ui-input__field:disabled {
  background-color: #f3f4f6;
  cursor: not-allowed;
}

.ui-input__field--error {
  border-color: #ef4444;
}

.ui-input__field--error:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.ui-input__prefix,
.ui-input__suffix {
  position: absolute;
  display: flex;
  align-items: center;
  color: #6b7280;
}

.ui-input__prefix {
  left: 0.75rem;
}

.ui-input__suffix {
  right: 0.75rem;
}

.ui-input__field:has(~ .ui-input__prefix) {
  padding-left: 2.5rem;
}

.ui-input__field:has(~ .ui-input__suffix) {
  padding-right: 2.5rem;
}

.ui-input__error {
  font-size: 0.875rem;
  color: #ef4444;
}

.ui-input__hint {
  font-size: 0.875rem;
  color: #6b7280;
}
</style>
