import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { Vacancie } from '../../types/CardInfo';

type VacanciesState = {
  vacancies: Vacancie[];
  totalPages: number;
};

const initialState: VacanciesState = {
  vacancies: [],
  totalPages: 1,
};
type FetchVacanciesParams = {
  search: string;
  city: string;
  skills: string[];
  page: number;
};

export const fetchVacancies = createAsyncThunk<
  VacanciesState,
  FetchVacanciesParams
>('vacancies/fetchVacancies', async ({ search, city, skills, page }) => {
  const params = new URLSearchParams();
  if (search) {
    params.append('search_field', 'name');
    params.append('search_field', 'company_name');
    params.set('text', search);
  }

  if (city !== 'Все города') {
    const area =
      city === 'Москва' ? '1' : city === 'Санкт-Петербург' ? '2' : '';
    if (area) {
      params.set('area', area);
    }
  }

  params.set('per_page', '50');
  params.set('page', String(page - 1));

  try {
    const response = await fetch(
      `https://api.hh.ru/vacancies?industry=7&professional_role=96&${params.toString()}`
    );
    const result = await response.json();
    let vacancies: Vacancie[] = result.items ?? [];

    if (skills.length > 0) {
      const lowerSkills = skills.map((skill) => skill.toLowerCase());
      vacancies = vacancies.filter((vacancie) => {
        const req = vacancie.snippet?.requirement?.toLowerCase() || '';
        return lowerSkills.some((skill) => req.includes(skill));
      });
    }

    return {
      vacancies,
      totalPages: result.pages ?? 1,
    };
  } catch (error) {
    console.error('Ошибка получения данных:', error);
    return {
      vacancies: [],
      totalPages: 1,
    };
  }
});

const vacanciesSlice = createSlice({
  name: 'vacancies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchVacancies.fulfilled, (state, action) => {
      state.vacancies = action.payload.vacancies ?? [];
      state.totalPages = action.payload.totalPages ?? 1;
    });
  },
});
export const selectVacancies = (state: RootState) => state.vacancies.vacancies;
export default vacanciesSlice.reducer;
