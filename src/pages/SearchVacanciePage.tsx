import VacancieFilter from '../modules/Filters/VacancieFilter';
import TagsFilter from '../modules/Filters/TagsFilter';
import CittyFilter from '../modules/Filters/CittyFilter';
import CardList from '../modules/CardList/CardList';
import type { Vacancie } from '../types/CardInfo';

type SearchVacanciePageProps = {
  vacancies: Vacancie[];
  page: number;
  totalPages: number;
  pageChange: (page: number) => void;
};

export default function SearchVacanciePage({
  vacancies,
  page,
  totalPages,
  pageChange,
}: SearchVacanciePageProps) {
  return (
    <>
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
          pageChange={pageChange}
        />
      </div>
    </>
  );
}
