import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchFromStrapi } from '../../lib/strapi';

interface Service {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description: string;
  icon: {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    url: string;
  } | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface ServicesState {
  services: Service[];
  isLoading: boolean;
  error: string | null;
  isLoaded: boolean;
}

const initialState: ServicesState = {
  services: [],
  isLoading: false,
  error: null,
  isLoaded: false,
};

// Async thunk for fetching services
export const fetchServices = createAsyncThunk(
  'services/fetchServices',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchFromStrapi('/services?populate=*');
      return data.data || [];
    } catch (error: any) {
      console.error('Error fetching services:', error);
      return rejectWithValue(error.message || 'Failed to fetch services');
    }
  }
);

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action: PayloadAction<Service[]>) => {
        state.isLoading = false;
        state.services = action.payload;
        state.isLoaded = true;
        state.error = null;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isLoaded = true;
      });
  },
});

export const { clearError } = servicesSlice.actions;
export default servicesSlice.reducer;
