<template>
  <Teleport to="body">
    <Transition name="ui-dialog">
      <div v-if="modelValue" class="ui-dialog-overlay" @click.self="handleOverlayClick">
        <div :class="['ui-dialog', `ui-dialog--${size}`]">
          <div v-if="$slots.header || title" class="ui-dialog__header">
            <slot name="header">
              <h3 class="ui-dialog__title">{{ title }}</h3>
            </slot>
            <button
              v-if="closable"
              class="ui-dialog__close"
              @click="handleClose"
              aria-label="Закрыть"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
          <div class="ui-dialog__body">
            <slot />
          </div>
          <div v-if="$slots.footer" class="ui-dialog__footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  closable?: boolean
  closeOnOverlay?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  closable: true,
  closeOnOverlay: true
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'close': []
}>()

const handleClose = () => {
  emit('update:modelValue', false)
  emit('close')
}

const handleOverlayClick = () => {
  if (props.closeOnOverlay) {
    handleClose()
  }
}
</script>

<style scoped>
.ui-dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  overflow-y: auto;
}

.ui-dialog {
  background: white;
  border-radius: 12px;
  width: 100%;
  max-height: 90vh;
  overflow: auto;
  box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15);
  animation: slideDown 0.3s ease;
}

.ui-dialog--sm {
  max-width: 400px;
}

.ui-dialog--md {
  max-width: 500px;
}

.ui-dialog--lg {
  max-width: 700px;
}

.ui-dialog--xl {
  max-width: 900px;
}

.ui-dialog__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.ui-dialog__title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
}

.ui-dialog__close {
  padding: 0.5rem;
  border: none;
  background: none;
  color: #6b7280;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ui-dialog__close:hover {
  background-color: #f3f4f6;
  color: #111827;
}

.ui-dialog__body {
  padding: 1.5rem;
}

.ui-dialog__footer {
  padding: 1.5rem;
  border-top: 1px solid #e5e7eb;
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  flex-wrap: wrap;
}

.ui-dialog-enter-active,
.ui-dialog-leave-active {
  transition: opacity 0.3s;
}

.ui-dialog-enter-from,
.ui-dialog-leave-to {
  opacity: 0;
}

@keyframes slideDown {
  from {
    transform: translateY(-50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@media (max-width: 640px) {
  .ui-dialog {
    margin: 0;
    max-height: 100vh;
    border-radius: 0;
  }

  .ui-dialog__header,
  .ui-dialog__body,
  .ui-dialog__footer {
    padding: 1rem;
  }

  .ui-dialog__title {
    font-size: 1.125rem;
  }

  .ui-dialog__footer {
    flex-direction: column-reverse;
    gap: 0.5rem;
  }

  .ui-dialog__footer :deep(button) {
    width: 100%;
    justify-content: center;
  }
}
</style>
