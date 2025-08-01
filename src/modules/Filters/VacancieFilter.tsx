import { Button } from '@mantine/core';
import styles from './VacancieFilter.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../Redux/store';
import { fetchVacancies } from '../../Redux/slices/vacanciesSlice';
import {
  selectCity,
  selectSearch,
  selectSkills,
  setSearch,
} from '../../Redux/slices/filtersSlice';
import { useSearchParams } from 'react-router-dom';

export default function VacancieFilter() {
  const dispatch = useDispatch<AppDispatch>();
  const search = useSelector(selectSearch);
  const city = useSelector(selectCity);
  const skills = useSelector(selectSkills);
  const [searchParams, setSearchParams] = useSearchParams();

  const searchHandler = () => {
    dispatch(fetchVacancies({ search, city, skills, page: 1 }));
    searchParams.set('search', search);
    searchParams.set('city', city);
    setSearchParams(searchParams);
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
  };

  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      searchHandler();
    }
  };

  return (
    <div className={styles.filter}>
      <img
        className={styles.filterImg}
        src={`${import.meta.env.BASE_URL}assets/images/Vector.png`}
        alt="Lupa" //  =))
      />
      <input
        value={search}
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
        className={styles.filterInput}
        type="text"
        placeholder="Должность или название компании"
      ></input>

      <Button onClick={searchHandler} className={styles.filterBtn}>
        Найти
      </Button>
    </div>
  );
}
