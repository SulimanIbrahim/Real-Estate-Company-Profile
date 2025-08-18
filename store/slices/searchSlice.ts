import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchResult {
  id: string;
  title: string;
  type: 'team' | 'service';
  description?: string;
  image?: string;
}

interface SearchState {
  query: string;
  results: SearchResult[];
  isLoading: boolean;
  hasSearched: boolean;
}

const initialState: SearchState = {
  query: '',
  results: [],
  isLoading: false,
  hasSearched: false,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setResults: (state, action: PayloadAction<SearchResult[]>) => {
      state.results = action.payload;
      state.hasSearched = true;
    },
    setSearchLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    clearSearch: (state) => {
      state.query = '';
      state.results = [];
      state.hasSearched = false;
    },
  },
});

export const { setQuery, setResults, setSearchLoading, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
