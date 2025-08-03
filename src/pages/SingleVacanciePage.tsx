import { Navigate, useParams } from 'react-router-dom';
import type { Vacancie } from '../types/CardInfo';
import VacancieCard from '../modules/CardList/VacancieCard';
import styles from './SingleVacanciePage.module.scss';

type SingleVacanciePageProps = {
  vacancies: Vacancie[];
};

export default function SingleVacanciePage({
  vacancies,
}: SingleVacanciePageProps) {
  const params = useParams();
  const vacancie = vacancies.find(
    (vacancie) => vacancie.id.toString() === params.id
  ) as Vacancie;
  if (!vacancie) {
    return <Navigate to="/FE-project-tabs/not-found" replace />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {' '}
        <VacancieCard vacancie={vacancie} isSinglePage={true} />
      </div>
      <div className={styles.cardInfo}>
        <p>{vacancie.snippet?.requirement}</p>
        <p>{vacancie.snippet?.responsibility}</p>
      </div>
    </div>
  );
}
