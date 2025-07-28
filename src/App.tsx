import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import './App.scss';
import './reset.scss';
import Header from './modules/Header/Header';
import CardList from './modules/CardList/CardList';
import { theme } from './theme';
import VacancieFilter from './modules/Filters/VacancieFilter';
import CittyFilter from './modules/Filters/CittyFilter';
import TagsFilter from './modules/Filters/TagsFilter';
import { useEffect, useState } from 'react';
import { fetchVacancies, selectVacancies } from './Redux/slices/vacanciesSlice';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from './Redux/store';
import { selectCity, selectSkills } from './Redux/slices/filtersSlice';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const skills = useSelector(selectSkills);
  const city = useSelector(selectCity);
  const vacancies = useSelector(selectVacancies);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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
      <Header />
      <div className="container">
        <div className="info">
          <h2>Список вакансий </h2>
          <p>по профессии Frontend-разработчик</p>
        </div>
        <VacancieFilter />
        <div className="filters">
          <TagsFilter />
          <CittyFilter />
        </div>
        <CardList
          vacancies={vacancies}
          page={page}
          totalPages={totalPages}
          pageChange={setPage}
        />
      </div>
    </MantineProvider>
  );
}

export default App;
