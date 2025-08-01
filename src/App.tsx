import { Navigate, Route, Routes, useSearchParams } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import './App.scss';
import './reset.scss';
import { theme } from './theme';
import { useEffect, useState } from 'react';
import { fetchVacancies, selectVacancies } from './Redux/slices/vacanciesSlice';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from './Redux/store';
import {
  selectCity,
  selectSkills,
  setAddSkill,
  setCity,
  setSearch,
} from './Redux/slices/filtersSlice';
import MainLayout from './layouts/MainLayout';
import SearchVacanciePage from './pages/SearchVacanciePage';
import SingleVacanciePage from './pages/SingleVacanciePage';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const skills = useSelector(selectSkills);
  const city = useSelector(selectCity);
  const vacancies = useSelector(selectVacancies);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const search = searchParams.get('search') || '';
    const cityUrl = searchParams.get('city') || 'Все города';
    const skillsUrl = searchParams.get('skills')?.split(',') || [];
    dispatch(setSearch(search));
    dispatch(setCity(cityUrl));
    skillsUrl.forEach((skill) => dispatch(setAddSkill(skill)));
    dispatch(
      fetchVacancies({ search, city: cityUrl, skills: skillsUrl, page: 1 })
    );
  }, [dispatch, searchParams]);

  useEffect(() => {
    const load = async () => {
      const action = await dispatch(
        fetchVacancies({ search: '', city, skills, page })
      );
      const { totalPages } = action.payload as { totalPages: number };
      setTotalPages(totalPages);
    };

    load();
  }, [dispatch, city, skills, page]);

  return (
    <MantineProvider theme={theme}>
      <Routes>
        <Route path="/FE-project/" element={<MainLayout />}>
          <Route index element={<Navigate to="vacancies" replace />} />
          <Route
            path="vacancies"
            element={
              <SearchVacanciePage
                vacancies={vacancies}
                page={page}
                totalPages={totalPages}
                pageChange={setPage}
              />
            }
          />
          <Route
            path="vacancies/:id"
            element={<SingleVacanciePage vacancies={vacancies} />}
          />
        </Route>
      </Routes>
    </MantineProvider>
  );
}

export default App;
