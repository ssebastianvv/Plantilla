
import { configureStore } from '@reduxjs/toolkit';
import likesReducer from '../redux/LikesSlice';

const store = configureStore({
  reducer: {
    likes: likesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
