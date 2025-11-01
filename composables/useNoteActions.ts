import type { Note } from '@/types'

export const useNoteActions = () => {
  const notesStore = useNotesStore()
  const router = useRouter()

  const createNote = (title: string = 'Новая заметка'): void => {
    const newNote = notesStore.createNote(title)
    router.push(`/note/${newNote.id}`)
  }

  const editNote = (id: string): void => {
    router.push(`/note/${id}`)
  }

  const deleteNote = (id: string): void => {
    notesStore.deleteNote(id)
  }

  const getNote = (id: string): Note | undefined => {
    return notesStore.getNoteById(id)
  }

  const updateNote = (id: string, updates: Partial<Note>): void => {
    notesStore.updateNote(id, updates)
  }

  return {
    createNote,
    editNote,
    deleteNote,
    getNote,
    updateNote
  }
}
