import { createSlice } from '@reduxjs/toolkit';

export interface IPayload {
  payload: {
    [key: string]: any;
  };
}
export interface NoteForm {
  id?: number;
  title: string;
  content: string;
  bgColor: string;
}

export interface RootObject {
  form: NoteForm;
  notes: NoteForm[];
  idCounter: number;
  currentNote: NoteForm;
}
const initialState: RootObject = {
  form: {
    title: '',
    content: '',
    bgColor: '',
  },
  notes: [],
  idCounter: 2,
  currentNote: {
    id: undefined,
    title: '',
    content: '',
    bgColor: '',
  },
};

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    updateForm: (state, { payload }: IPayload) => {
      state.form = {
        ...state.form,
        ...payload,
      };
    },
    submitForm: (state) => {
      const newNote = {
        ...state.form,
        id: state.idCounter, // Assign the current counter value as the ID of the note
      };
      state.notes.push(newNote);
      state.form = initialState.form; // Reset the form after submission
      state.idCounter++; // Increment the counter for next note
    },
    updateCurrentNote: (state, { payload }: IPayload) => {
      state.currentNote = { ...state.currentNote, ...payload };
    },
    updateNote: (state) => {
      const noteToUpdate = state.notes.find(
        (note) => note.id === state.currentNote.id
      );
      if (noteToUpdate) Object.assign(noteToUpdate, state.currentNote);
      state.currentNote = initialState.currentNote;
    },
    deleteNote: (state, action: { payload: { id: number } }) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload.id);
    },

    resetForm: (state) => {
      state.form = initialState.form;
    },
    resetNotes: (state) => {
      state.notes = [];
    },
  },
});

export const {
  updateForm,
  submitForm,
  resetForm,
  resetNotes,
  updateNote,
  deleteNote,
  updateCurrentNote,
} = notesSlice.actions;

export default notesSlice.reducer;
