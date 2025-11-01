import type { Ref } from 'vue'
import type { TodoItem } from '@/types'

export const useTodoActions = (noteId: Ref<string>) => {
  const notesStore = useNotesStore()

  const addTodo = (text: string): TodoItem | null => {
    if (!text.trim()) return null
    return notesStore.addTodo(noteId.value, text.trim())
  }

  const updateTodo = (todoId: string, updates: Partial<TodoItem>): void => {
    notesStore.updateTodo(noteId.value, todoId, updates)
  }

  const toggleTodo = (todoId: string): void => {
    const note = notesStore.getNoteById(noteId.value)
    if (!note) return

    const todo = note.todos.find(t => t.id === todoId)
    if (todo) {
      updateTodo(todoId, { completed: !todo.completed })
    }
  }

  const deleteTodo = (todoId: string): void => {
    notesStore.deleteTodo(noteId.value, todoId)
  }

  const updateTodoText = (todoId: string, text: string): void => {
    if (!text.trim()) return
    updateTodo(todoId, { text: text.trim() })
  }

  return {
    addTodo,
    updateTodo,
    toggleTodo,
    deleteTodo,
    updateTodoText
  }
}
