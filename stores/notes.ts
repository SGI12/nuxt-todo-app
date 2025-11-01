import { defineStore } from 'pinia'
import type { Note, TodoItem } from '~/types'

export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: [] as Note[],
    isLoaded: false
  }),

  getters: {
    allNotes: (state): Note[] => {
      return [...state.notes].sort((a, b) => b.updatedAt - a.updatedAt)
    },

    getNoteById: (state) => {
      return (id: string): Note | undefined => {
        return state.notes.find(note => note.id === id)
      }
    },

    totalNotes: (state): number => {
      return state.notes.length
    }
  },

  actions: {
    initStore() {
      if (process.client && !this.isLoaded) {
        const stored = localStorage.getItem('notes')
        if (stored) {
          try {
            this.notes = JSON.parse(stored)
          } catch (e) {
            console.error('Failed to parse notes from localStorage', e)
            this.notes = []
          }
        }
        this.isLoaded = true
      }
    },

    saveToLocalStorage() {
      if (process.client) {
        localStorage.setItem('notes', JSON.stringify(this.notes))
      }
    },

    createNote(title: string = 'Новая заметка'): Note {
      const newNote: Note = {
        id: this.generateId(),
        title,
        todos: [],
        createdAt: Date.now(),
        updatedAt: Date.now()
      }
      this.notes.push(newNote)
      this.saveToLocalStorage()
      return newNote
    },

    updateNote(id: string, updates: Partial<Note>) {
      const index = this.notes.findIndex(note => note.id === id)
      if (index !== -1) {
        this.notes[index] = {
          ...this.notes[index],
          ...updates,
          updatedAt: Date.now()
        }
        this.saveToLocalStorage()
      }
    },

    deleteNote(id: string) {
      const index = this.notes.findIndex(note => note.id === id)
      if (index !== -1) {
        this.notes.splice(index, 1)
        this.saveToLocalStorage()
      }
    },

    addTodo(noteId: string, text: string): TodoItem | null {
      const note = this.notes.find(n => n.id === noteId)
      if (note) {
        const newTodo: TodoItem = {
          id: this.generateId(),
          text,
          completed: false,
          createdAt: Date.now()
        }
        note.todos.push(newTodo)
        note.updatedAt = Date.now()
        this.saveToLocalStorage()
        return newTodo
      }
      return null
    },

    updateTodo(noteId: string, todoId: string, updates: Partial<TodoItem>) {
      const note = this.notes.find(n => n.id === noteId)
      if (note) {
        const todoIndex = note.todos.findIndex(t => t.id === todoId)
        if (todoIndex !== -1) {
          note.todos[todoIndex] = {
            ...note.todos[todoIndex],
            ...updates
          }
          note.updatedAt = Date.now()
          this.saveToLocalStorage()
        }
      }
    },

    deleteTodo(noteId: string, todoId: string) {
      const note = this.notes.find(n => n.id === noteId)
      if (note) {
        const todoIndex = note.todos.findIndex(t => t.id === todoId)
        if (todoIndex !== -1) {
          note.todos.splice(todoIndex, 1)
          note.updatedAt = Date.now()
          this.saveToLocalStorage()
        }
      }
    },

    generateId(): string {
      return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
    }
  }
})
