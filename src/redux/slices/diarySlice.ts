import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DiaryEntry {
  id: string;
  title: string;
  content: string;
  emotion: string;
  date: string;
  image?: string;
}

interface DiaryState {
  entries: DiaryEntry[];
  loading: boolean;
  error: string | null;
}

const initialState: DiaryState = {
  entries: [],
  loading: false,
  error: null,
};

const diarySlice = createSlice({
  name: 'diary',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    addEntry: (state, action: PayloadAction<DiaryEntry>) => {
      state.entries.push(action.payload);
    },
    setEntries: (state, action: PayloadAction<DiaryEntry[]>) => {
      state.entries = action.payload;
    },
    updateEntry: (state, action: PayloadAction<DiaryEntry>) => {
      const index = state.entries.findIndex(e => e.id === action.payload.id);
      if (index !== -1) {
        state.entries[index] = action.payload;
      }
    },
    deleteEntry: (state, action: PayloadAction<string>) => {
      state.entries = state.entries.filter(e => e.id !== action.payload);
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setLoading,
  addEntry,
  setEntries,
  updateEntry,
  deleteEntry,
  setError,
} = diarySlice.actions;

export default diarySlice.reducer;