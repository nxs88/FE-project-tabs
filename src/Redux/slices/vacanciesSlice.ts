import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { Vacancie } from '../../types/CardInfo';

type VacanciesState = {
  vacancies: Vacancie[];
};

const initialState: VacanciesState = {
  vacancies: [],
};

export const fetchVacancies = createAsyncThunk(
  'vacancies/fetchVacancies',
  async () => {
    try {
      const response = await fetch(
        'https://api.hh.ru/vacancies?industry=7&professional_role=96'
      );
      const result = await response.json();
      return result.items;
    } catch (error) {
      console.error('Ошибка получения данных:', error);
    }
  }
);

const vacanciesSlice = createSlice({
  name: 'vacancies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchVacancies.fulfilled, (state, action) => {
      state.vacancies = action.payload;
    });
  },
});
export const selectVacancies = (state: RootState) => state.vacancies.vacancies;
export default vacanciesSlice.reducer;
