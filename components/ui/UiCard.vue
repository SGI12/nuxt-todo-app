<template>
  <div
    :class="[
      'ui-card',
      `ui-card--${variant}`,
      { 'ui-card--hoverable': hoverable, 'ui-card--clickable': clickable }
    ]"
    @click="handleClick"
  >
    <div v-if="$slots.header" class="ui-card__header">
      <slot name="header" />
    </div>
    <div class="ui-card__body">
      <slot />
    </div>
    <div v-if="$slots.footer" class="ui-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'default' | 'bordered' | 'elevated'
  hoverable?: boolean
  clickable?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'default',
  hoverable: false,
  clickable: false
})

const emit = defineEmits<{
  'click': [event: MouseEvent]
}>()

const handleClick = (event: MouseEvent) => {
  emit('click', event)
}
</script>

<style scoped>
.ui-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s;
}

.ui-card--default {
  border: 1px solid #e5e7eb;
}

.ui-card--bordered {
  border: 2px solid #e5e7eb;
}

.ui-card--elevated {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.ui-card--hoverable:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

.ui-card--clickable {
  cursor: pointer;
}

.ui-card__header {
  padding: 1.5rem;
  border-bottom: 1px solid #f3f4f6;
}

.ui-card__body {
  padding: 1.5rem;
}

.ui-card__footer {
  padding: 1.5rem;
  border-top: 1px solid #f3f4f6;
  background-color: #f9fafb;
}

@media (max-width: 640px) {
  .ui-card__header,
  .ui-card__body,
  .ui-card__footer {
    padding: 1rem;
  }
}
</style>
