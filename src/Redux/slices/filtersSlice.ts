import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

type FiltersState = {
  search: string;
  city: string;
  skills: string[];
};

const initialState: FiltersState = {
  search: '',
  city: 'Все города',
  skills: ['TypeScript', 'React', 'Redux'],
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setAddSkill: (state, action) => {
      if (state.skills.includes(action.payload)) return;
      state.skills.push(action.payload);
    },
    setRemoveSkill: (state, action) => {
      state.skills = state.skills.filter((skill) => skill !== action.payload);
    },
  },
});

export const { setSearch, setCity, setAddSkill, setRemoveSkill } =
  filtersSlice.actions;

export const selectSearch = (state: RootState) => state.filters.search;
export const selectCity = (state: RootState) => state.filters.city;
export const selectSkills = (state: RootState) => state.filters.skills;

export default filtersSlice.reducer;
