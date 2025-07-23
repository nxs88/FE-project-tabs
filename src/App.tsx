import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import './App.scss';
import './reset.scss';
import Header from './modules/Header/Header';
import CardList from './modules/CardList/CardList';
import { theme } from './theme';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from './Redux/store';
import { fetchVacancies, selectVacancies } from './Redux/slices/vacanciesSlice';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const vacancies = useSelector(selectVacancies);

  useEffect(() => {
    dispatch(fetchVacancies());
  }, [dispatch]);

  return (
    <MantineProvider theme={theme}>
      <Header />
      <CardList />
    </MantineProvider>
  );
}

export default App;
