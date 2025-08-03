import { Tabs } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../Redux/store';
import {
  selectCity,
  selectSkills,
  setCity,
} from '../../Redux/slices/filtersSlice';
import styles from './CityFilter.module.scss';
import { useEffect } from 'react';
import { fetchVacancies } from '../../Redux/slices/vacanciesSlice';
import { useNavigate } from 'react-router-dom';

export default function CittyFilter() {
  const dispatch = useDispatch<AppDispatch>();
  const city = useSelector(selectCity);
  const skills = useSelector(selectSkills);
  const navigate = useNavigate();

  const changeHandler = (value: string) => {
    if (!value) return;
    dispatch(setCity(value));

    const cityPath =
      value === 'Москва'
        ? 'moscow'
        : value === 'Санкт-Петербург'
        ? 'petersburg'
        : '';

    if (cityPath) {
      navigate(`${cityPath}`);
    }

    dispatch(fetchVacancies({ search: '', city: value, skills, page: 1 }));
  };

  useEffect(() => {
    dispatch(fetchVacancies({ search: '', city, skills, page: 1 }));
  }, [dispatch, city, skills]);

  return (
    <div className={styles.cityFilter}>
      <Tabs value={city} onChange={(value) => changeHandler(value || '')}>
        <Tabs.List className={styles.tabsList}>
          <Tabs.Tab value="Москва">Москва</Tabs.Tab>
          <Tabs.Tab value="Санкт-Петербург">Санкт-Петербург</Tabs.Tab>
        </Tabs.List>
      </Tabs>
    </div>
  );
}
