import { useSelector } from 'react-redux';
import { selectVacancies } from '../../Redux/slices/vacanciesSlice';
import styles from './CardList.module.scss';
import VacancieCard from './VacancieCard';

export default function CardList() {
  const vacancies = useSelector(selectVacancies);

  return (
    <main className={styles.main}>
      {vacancies.map((vacancie) => (
        <VacancieCard key={vacancie.id} vacancie={vacancie} />
      ))}
    </main>
  );
}
