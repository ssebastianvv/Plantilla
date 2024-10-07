import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addLike, getLikesForPost } from '../components/Formlike/like.controller';
import { LikeRequest } from '../interface/likes';

interface LikesState {
  likes: { [postId: string]: number }; // Mantener postId como string
}

const initialState: LikesState = {
  likes: {},
};

// Acción para agregar un like
export const likePost = createAsyncThunk(
  'likes/likePost',
  async (likeRequest: LikeRequest) => {
    await addLike(likeRequest);
    return likeRequest.post_id; // Devolver el post_id
  }
);

// Acción para obtener likes de un post
export const fetchLikesForPost = createAsyncThunk(
  'likes/fetchLikesForPost',
  async (postId: number) => { // Cambiado a número
    const response = await getLikesForPost(postId); // Pasar postId como número
    return { postId: String(postId), likes_count: response.likes.length }; // Convertir postId a string si es necesario
  }
);

const likesSlice = createSlice({
  name: 'likes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(likePost.fulfilled, (state, action) => {
        const postId = action.payload;
        state.likes[postId] = (state.likes[postId] || 0) + 1; // Incrementar el conteo de likes
      })
      .addCase(fetchLikesForPost.fulfilled, (state, action) => {
        const { postId, likes_count } = action.payload;
        state.likes[postId] = likes_count; // Actualizar el conteo de likes
      });
  },
});

export default likesSlice.reducer;
