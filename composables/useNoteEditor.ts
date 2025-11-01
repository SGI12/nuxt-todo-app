import type { Ref } from 'vue'
import type { TodoItem, HistoryState } from '@/types'

export const useNoteEditor = (noteId: Ref<string>) => {
  const notesStore = useNotesStore()
  const router = useRouter()
  const { canUndo, canRedo, saveState, undo, redo, initHistory } = useHistory()
  const { confirm } = useConfirmDialog()

  const currentTitle = ref('')
  const currentTodos = ref<TodoItem[]>([])

  const originalNote = computed(() => notesStore.getNoteById(noteId.value))

  const hasChanges = computed(() => {
    if (!originalNote.value) return false
    return (
      currentTitle.value !== originalNote.value.title ||
      JSON.stringify(currentTodos.value) !== JSON.stringify(originalNote.value.todos)
    )
  })

  const completedCount = computed(() => {
    return currentTodos.value.filter(todo => todo.completed).length
  })

  const totalCount = computed(() => currentTodos.value.length)

  const initEditor = () => {
    if (!originalNote.value) {
      router.push('/')
      return false
    }

    currentTitle.value = originalNote.value.title
    currentTodos.value = JSON.parse(JSON.stringify(originalNote.value.todos))

    initHistory({
      title: currentTitle.value,
      todos: currentTodos.value
    })

    return true
  }

  const saveToHistory = () => {
    saveState({
      title: currentTitle.value,
      todos: JSON.parse(JSON.stringify(currentTodos.value))
    })
  }

  const handleUndo = () => {
    const state = undo()
    if (state) {
      currentTitle.value = state.title
      currentTodos.value = state.todos
    }
  }

  const handleRedo = () => {
    const state = redo()
    if (state) {
      currentTitle.value = state.title
      currentTodos.value = state.todos
    }
  }

  const updateTitle = (title: string) => {
    currentTitle.value = title
    saveToHistory()
  }

  const addTodo = (text: string) => {
    if (!text.trim()) return

    const newTodo: TodoItem = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      text: text.trim(),
      completed: false,
      createdAt: Date.now()
    }

    currentTodos.value.push(newTodo)
    saveToHistory()
  }

  const toggleTodo = (id: string) => {
    const todo = currentTodos.value.find(t => t.id === id)
    if (todo) {
      todo.completed = !todo.completed
      saveToHistory()
    }
  }

  const updateTodoText = (id: string, text: string) => {
    const todo = currentTodos.value.find(t => t.id === id)
    if (todo) {
      todo.text = text
      saveToHistory()
    }
  }

  const deleteTodo = (id: string) => {
    const index = currentTodos.value.findIndex(t => t.id === id)
    if (index !== -1) {
      currentTodos.value.splice(index, 1)
      saveToHistory()
    }
  }

  const saveNote = () => {
    if (!originalNote.value) return

    notesStore.updateNote(noteId.value, {
      title: currentTitle.value,
      todos: currentTodos.value
    })

    router.push('/')
  }

  const cancelEditing = async () => {
    if (hasChanges.value) {
      const confirmed = await confirm({
        title: 'Отменить изменения?',
        message: 'У вас есть несохраненные изменения. Вы действительно хотите их отменить?',
        confirmText: 'Да, отменить',
        cancelText: 'Продолжить редактирование'
      })

      if (!confirmed) return
    }

    router.push('/')
  }

  const deleteNote = async () => {
    const confirmed = await confirm({
      title: 'Удалить заметку?',
      message: 'Вы действительно хотите удалить эту заметку? Это действие нельзя будет отменить.',
      confirmText: 'Удалить',
      cancelText: 'Отмена'
    })

    if (confirmed) {
      notesStore.deleteNote(noteId.value)
      router.push('/')
    }
  }

  const handleBack = () => {
    cancelEditing()
  }

  return {
    currentTitle,
    currentTodos,
    originalNote,
    hasChanges,
    completedCount,
    totalCount,
    canUndo,
    canRedo,
    initEditor,
    updateTitle,
    addTodo,
    toggleTodo,
    updateTodoText,
    deleteTodo,
    saveNote,
    cancelEditing,
    deleteNote,
    handleBack,
    handleUndo,
    handleRedo
  }
}
