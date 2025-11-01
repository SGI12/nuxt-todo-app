export const useConfirmDialog = () => {
  const isOpen = useState('confirmDialog-isOpen', () => false)
  const dialogConfig = useState('confirmDialog-config', () => ({
    title: 'Подтверждение',
    message: 'Вы уверены?',
    confirmText: 'Подтвердить',
    cancelText: 'Отмена'
  }))
  const resolveCallback = useState<((value: boolean) => void) | null>('confirmDialog-resolve', () => null)

  const confirm = (config?: {
    title?: string
    message?: string
    confirmText?: string
    cancelText?: string
  }): Promise<boolean> => {
    return new Promise((resolve) => {
      dialogConfig.value = {
        title: config?.title || 'Подтверждение',
        message: config?.message || 'Вы уверены?',
        confirmText: config?.confirmText || 'Подтвердить',
        cancelText: config?.cancelText || 'Отмена'
      }
      resolveCallback.value = resolve
      isOpen.value = true
    })
  }

  const handleConfirm = () => {
    resolveCallback.value?.(true)
    isOpen.value = false
    resolveCallback.value = null
  }

  const handleCancel = () => {
    resolveCallback.value?.(false)
    isOpen.value = false
    resolveCallback.value = null
  }

  return {
    isOpen,
    dialogConfig,
    confirm,
    handleConfirm,
    handleCancel
  }
}
