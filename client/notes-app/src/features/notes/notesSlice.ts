import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { 
  fetchNotes, 
  fetchNoteById, 
  createNote, 
  updateNote, 
  deleteNote,
  shareNote
} from '../../api/notesApi';
import { Note, NoteUpdatePayload, ShareNotePayload } from '../../types/noteTypes';
import { RootState } from '../../store/store';
import axios from 'axios';

interface NotesState {
  notes: Note[];
  currentNote: Note | null;
  sharedNotes: Note[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: NotesState = {
  notes: [],
  currentNote: null,
  sharedNotes: [],
  status: 'idle',
  error: null
};

export const getNotes = createAsyncThunk<Note[], void, { state: RootState }>(
  'notes/fetchNotes',
  async () => {
    return await fetchNotes();
  }
);

export const getNoteById = createAsyncThunk<Note, string, { state: RootState }>(
  'notes/fetchNoteById', 
  async (id: string) => {
    return await fetchNoteById(id);
  }
);

export const addNote = createAsyncThunk<Note, string, { state: RootState }>(
  'notes/createNote',
  async (title: string) => {
    return await createNote(title);
  }
);

export const saveNote = createAsyncThunk<Note, NoteUpdatePayload, { state: RootState }>(
  'notes/updateNote',
  async (payload: NoteUpdatePayload) => {
    return await updateNote(payload);
  }
);

export const removeNote = createAsyncThunk<string, string, { state: RootState }>(
  'notes/deleteNote',
  async (id: string) => {
    await deleteNote(id);
    return id;
  }
);

export const shareNoteWithUser = createAsyncThunk<void, ShareNotePayload, { state: RootState }>(
  'notes/shareNote',
  async (payload: ShareNotePayload) => {
    await shareNote(payload);
  }
);

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    updateCurrentNoteContent: (state, action: PayloadAction<string>) => {
      if (state.currentNote) {
        state.currentNote.content = action.payload;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getNotes.fulfilled, (state, action: PayloadAction<Note[]>) => {
        state.status = 'succeeded';
        state.notes = action.payload;
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch notes';
      })
      .addCase(getNoteById.fulfilled, (state, action: PayloadAction<Note>) => {
        state.currentNote = action.payload;
      })
      .addCase(addNote.fulfilled, (state, action: PayloadAction<Note>) => {
        state.notes.push(action.payload);
      })
      .addCase(saveNote.fulfilled, (state, action: PayloadAction<Note>) => {
        const index = state.notes.findIndex(note => note._id === action.payload._id);
        if (index !== -1) {
          state.notes[index] = action.payload;
        }
        if (state.currentNote?._id === action.payload._id) {
          state.currentNote = action.payload;
        }
      })
      .addCase(removeNote.fulfilled, (state, action: PayloadAction<string>) => {
        state.notes = state.notes.filter(note => note._id !== action.payload);
        if (state.currentNote?._id === action.payload) {
          state.currentNote = null;
        }
      })
      .addCase(fetchSharedNotes.fulfilled, (state, action: PayloadAction<Note[]>) => {
        state.sharedNotes = action.payload;
      });
  }
});

export const fetchSharedNotes = createAsyncThunk(
  'notes/fetchShared',
  async () => {
    const response = await axios.get('/api/notes/shared');
    return response.data;
  }
);

export const { updateCurrentNoteContent } = notesSlice.actions;

export const selectAllNotes = (state: RootState) => state.notes.notes;
export const selectCurrentNote = (state: RootState) => state.notes.currentNote;
export const selectNotesStatus = (state: RootState) => state.notes.status;
export const selectNotesError = (state: RootState) => state.notes.error;
export const selectSharedNotes = (state: RootState) => state.notes.sharedNotes;

export default notesSlice.reducer;
