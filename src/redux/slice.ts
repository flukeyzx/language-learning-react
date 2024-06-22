import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: StateType = {
  loading: false,
  result: [],
  words: [],
};

const rootSlice = createSlice({
  name: "root",
  initialState,
  reducers: {
    getWordsRequest: (state: StateType) => {
      state.loading = true;
    },
    getWordsSuccess: (state: StateType, action: PayloadAction<WordType[]>) => {
      state.loading = false;
      state.words = action.payload;
    },
    getWordsFailed: (state: StateType, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    saveResult: (state: StateType, action: PayloadAction<string[]>) => {
      state.loading = false;
      state.result = action.payload;
    },
    clearState: (state: StateType) => {
      state.loading = false;
      state.result = [];
      state.words = [];
      state.error = undefined;
    },
  },
});

export const {
  getWordsRequest,
  getWordsSuccess,
  getWordsFailed,
  saveResult,
  clearState,
} = rootSlice.actions;

export default rootSlice.reducer;
