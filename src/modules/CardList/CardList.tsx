import styles from './CardList.module.scss';
import VacancieCard from './VacancieCard';
import CittyFilter from '../Filters/CittyFilter';
import type { Vacancie } from '../../types/CardInfo';
import { Pagination } from '@mantine/core';

type CardListProps = {
  vacancies: Vacancie[];
  page: number;
  totalPages: number;
  pageChange: (page: number) => void;
};

export default function CardList({
  vacancies,
  page,
  totalPages,
  pageChange,
}: CardListProps) {
  return (
    <main className={styles.main}>
      <CittyFilter />
      {vacancies.map((vacancie) => (
        <VacancieCard key={vacancie.id} vacancie={vacancie} />
      ))}
      {totalPages > 1 && (
        <Pagination
          pb={25}
          withEdges
          total={totalPages}
          value={page}
          onChange={pageChange}
        ></Pagination>
      )}
    </main>
  );
}
