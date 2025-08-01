import { Select } from '@mantine/core';
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
import { useSearchParams } from 'react-router-dom';

export default function CittyFilter() {
  const dispatch = useDispatch<AppDispatch>();
  const city = useSelector(selectCity);
  const skills = useSelector(selectSkills);
  const [searchParams, setSearchParams] = useSearchParams();

  const changeHandler = (value: string) => {
    dispatch(setCity(value));
    searchParams.set('city', value);
    setSearchParams(searchParams);
    dispatch(fetchVacancies({ search: '', city: value, skills, page: 1 }));
  };

  useEffect(() => {
    dispatch(fetchVacancies({ search: '', city, skills, page: 1 }));
  }, [dispatch, city, skills]);

  return (
    <div className={styles.cityFilter}>
      <div className={styles.citySelector}>
        <Select
          value={city}
          onChange={(value) => {
            if (value) changeHandler(value);
          }}
          leftSection={
            <img
              className={styles.cityFilterMark}
              src={`${import.meta.env.BASE_URL}assets/images/Mark.png`}
              alt="Mark"
            />
          }
          placeholder="Все города"
          data={['Все города', 'Москва', 'Санкт-Петербург']}
        />
      </div>
    </div>
  );
}
