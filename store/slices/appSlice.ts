import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  language: 'en' | 'ar';
  isLoading: boolean;
  isSearchOpen: boolean;
  isMobileMenuOpen: boolean;
}

const initialState: AppState = {
  language: 'en',
  isLoading: false,
  isSearchOpen: false,
  isMobileMenuOpen: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<'en' | 'ar'>) => {
      state.language = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    toggleSearch: (state) => {
      state.isSearchOpen = !state.isSearchOpen;
    },
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    closeAllModals: (state) => {
      state.isSearchOpen = false;
      state.isMobileMenuOpen = false;
    },
  },
});

export const { setLanguage, setLoading, toggleSearch, toggleMobileMenu, closeAllModals } = appSlice.actions;
export default appSlice.reducer;
