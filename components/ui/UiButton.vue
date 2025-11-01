<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="[
      'ui-button',
      `ui-button--${variant}`,
      `ui-button--${size}`,
      { 'ui-button--icon-only': iconOnly, 'ui-button--loading': loading }
    ]"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="ui-button__spinner"></span>
    <span v-else-if="$slots.icon" class="ui-button__icon">
      <slot name="icon" />
    </span>
    <span v-if="!iconOnly" class="ui-button__content">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  iconOnly?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false,
  loading: false,
  iconOnly: false
})

defineEmits<{
  'click': [event: MouseEvent]
}>()
</script>

<style scoped>
.ui-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
  position: relative;
}

.ui-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.ui-button--sm {
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
}

.ui-button--md {
  padding: 0.625rem 1.25rem;
  font-size: 0.9375rem;
}

.ui-button--lg {
  padding: 0.875rem 1.5rem;
  font-size: 1rem;
}

.ui-button--icon-only {
  padding: 0.625rem;
}

.ui-button--icon-only.ui-button--sm {
  padding: 0.375rem;
}

.ui-button--icon-only.ui-button--lg {
  padding: 0.875rem;
}

.ui-button--primary {
  background-color: #3b82f6;
  color: white;
}

.ui-button--primary:hover:not(:disabled) {
  background-color: #2563eb;
}

.ui-button--secondary {
  background-color: #f3f4f6;
  color: #374151;
}

.ui-button--secondary:hover:not(:disabled) {
  background-color: #e5e7eb;
}

.ui-button--danger {
  background-color: #ef4444;
  color: white;
}

.ui-button--danger:hover:not(:disabled) {
  background-color: #dc2626;
}

.ui-button--ghost {
  background-color: transparent;
  color: #6b7280;
}

.ui-button--ghost:hover:not(:disabled) {
  background-color: #f3f4f6;
}

.ui-button--loading {
  pointer-events: none;
}

.ui-button__spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.ui-button__icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.ui-button__content {
  display: flex;
  align-items: center;
}
</style>
