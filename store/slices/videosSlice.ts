import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchFromStrapi } from '../../lib/strapi';

interface BackgroundMedia {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  url: string;
  mime: string;
  size: number;
}

interface Video {
  id: number;
  documentId: string;
  title?: string;
  description?: string;
  background: BackgroundMedia[];  // Array of media items
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface VideosState {
  videos: Video[];
  isLoading: boolean;
  error: string | null;
  isLoaded: boolean;
}

const initialState: VideosState = {
  videos: [],
  isLoading: false,
  error: null,
  isLoaded: false,
};

// Async thunk for fetching videos
export const fetchVideos = createAsyncThunk(
  'videos/fetchVideos',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchFromStrapi('/videos?populate=*');
      console.log('Fetched videos from API:', data.data);
      return data.data || [];
    } catch (error: any) {
      console.error('Error fetching videos:', error);
      return rejectWithValue(error.message || 'Failed to fetch videos');
    }
  }
);

const videosSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchVideos.fulfilled, (state, action: PayloadAction<Video[]>) => {
        state.isLoading = false;
        state.videos = action.payload;
        state.isLoaded = true;
        state.error = null;
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isLoaded = true;
      });
  },
});

export const { clearError } = videosSlice.actions;
export default videosSlice.reducer;
