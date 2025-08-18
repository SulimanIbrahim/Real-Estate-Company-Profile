import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slices/appSlice';
import searchReducer from './slices/searchSlice';
import servicesReducer from './slices/servicesSlice';
import videosReducer from './slices/videosSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    search: searchReducer,
    services: servicesReducer,
    videos: videosReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
