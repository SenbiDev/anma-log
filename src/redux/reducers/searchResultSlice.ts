import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SearchResultType, SearchResultStateType } from '../../components/molecules/SearchResult/type';
import { fetchSearchList } from '../../utils/api';
import { RootState } from '../store';

interface SearchResultState {
  value: SearchResultStateType[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: SearchResultState = {
  value: [],
  status: 'idle',
};

export const searchResultListAsync = createAsyncThunk(
  'searchResult',
  async ({ types, letter }: Omit<SearchResultType, 'navigation'>) => {
    const data = await fetchSearchList({ types, letter });
    return data;
  }
);

const searchResultSlice = createSlice({
  name: 'searchResult',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchResultListAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchResultListAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      })
      .addCase(searchResultListAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectSearchResult = (state: RootState) => state.searchResult;

export default searchResultSlice.reducer;