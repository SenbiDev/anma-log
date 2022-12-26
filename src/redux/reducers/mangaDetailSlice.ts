import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { MangaDetailScreenStateType } from '../../screens/Stack/MangaDetailScreen/type';
import { fetchMangaDetail } from '../../utils/api';
import { RootState } from '../store';

interface mangaDetailState {
  value: Partial<MangaDetailScreenStateType>;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: mangaDetailState = {
  value: {},
  status: 'idle',
};

export const mangaDetailAsync = createAsyncThunk(
  'mangaDetail',
  async (mal_id: number) => {
    const data = await fetchMangaDetail(mal_id);
    return data;
  }
);

export const setMangaDetailToInitial = createAsyncThunk(
    'setMangaDetailToInitial',
    async () => {
      return {};
    }
);

const mangaDetailSlice = createSlice({
  name: 'mangaDetail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(mangaDetailAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(mangaDetailAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload!!;
      })
      .addCase(mangaDetailAsync.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(setMangaDetailToInitial.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(setMangaDetailToInitial.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      })
      .addCase(setMangaDetailToInitial.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectMangaDetail = (state: RootState) => state.mangaDetail.value;

export default mangaDetailSlice.reducer;