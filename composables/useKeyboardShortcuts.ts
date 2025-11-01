export const useKeyboardShortcuts = (handlers: {
  onUndo?: () => void
  onRedo?: () => void
  onSave?: () => void
}) => {
  const handleKeydown = (e: KeyboardEvent) => {
    const isCtrlOrCmd = e.ctrlKey || e.metaKey

    if (isCtrlOrCmd && e.key === 'z' && !e.shiftKey) {
      e.preventDefault()
      handlers.onUndo?.()
    }
    else if (isCtrlOrCmd && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
      e.preventDefault()
      handlers.onRedo?.()
    }
    else if (isCtrlOrCmd && e.key === 's') {
      e.preventDefault()
      handlers.onSave?.()
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKeydown)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown)
  })
}
