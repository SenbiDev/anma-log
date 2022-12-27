import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AnimeDetailScreenStateType } from '../../screens/Stack/AnimeDetailScreen/type';
import { fetchAnimeDetail } from '../../utils/api';
import { RootState } from '../store';

interface animeDetailState {
  value: Partial<AnimeDetailScreenStateType>;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: animeDetailState = {
  value: {},
  status: 'idle',
};

export const animeDetailAsync = createAsyncThunk(
  'animeDetail',
  async (mal_id: number) => {
    const data = await fetchAnimeDetail(mal_id);
    return data;
  }
);

export const setAnimeDetailToInitial = createAsyncThunk(
    'setAnimeDetailToInitial',
    async () => {
      return {};
    }
);

const animeDetailSlice = createSlice({
  name: 'animeDetail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(animeDetailAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(animeDetailAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload!!;
      })
      .addCase(animeDetailAsync.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(setAnimeDetailToInitial.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(setAnimeDetailToInitial.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      })
      .addCase(setAnimeDetailToInitial.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectAnimeDetail = (state: RootState) => state.animeDetail;

export default animeDetailSlice.reducer;