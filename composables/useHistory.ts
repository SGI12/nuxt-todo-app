import type { HistoryState } from '~/types'

export const useHistory = () => {
  const history = ref<HistoryState[]>([])
  const currentIndex = ref(-1)

  const canUndo = computed(() => currentIndex.value > 0)
  const canRedo = computed(() => currentIndex.value < history.value.length - 1)

  const saveState = (state: HistoryState) => {
    history.value = history.value.slice(0, currentIndex.value + 1)
    history.value.push(JSON.parse(JSON.stringify(state)))
    currentIndex.value = history.value.length - 1

    if (history.value.length > 50) {
      history.value.shift()
      currentIndex.value--
    }
  }

  const undo = (): HistoryState | null => {
    if (canUndo.value) {
      currentIndex.value--
      return JSON.parse(JSON.stringify(history.value[currentIndex.value]))
    }
    return null
  }

  const redo = (): HistoryState | null => {
    if (canRedo.value) {
      currentIndex.value++
      return JSON.parse(JSON.stringify(history.value[currentIndex.value]))
    }
    return null
  }

  const clearHistory = () => {
    history.value = []
    currentIndex.value = -1
  }

  const initHistory = (initialState: HistoryState) => {
    clearHistory()
    saveState(initialState)
  }

  return {
    canUndo,
    canRedo,
    saveState,
    undo,
    redo,
    clearHistory,
    initHistory
  }
}
