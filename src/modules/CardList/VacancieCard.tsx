import { Card, Button } from '@mantine/core';
import styles from './VacancieCard.module.scss';
import type { Vacancie } from '../../types/CardInfo';
import { Link } from 'react-router-dom';

type CardProps = {
  vacancie: Vacancie;
  isSinglePage?: boolean;
};
export default function VacancieCard({
  vacancie,
  isSinglePage = false,
}: CardProps) {
  return (
    <Card className={styles.card}>
      <h2 className={styles.cardName}>{vacancie.name}</h2>
      <div className={styles.cardInfo}>
        <p className={styles.cardSalary}>
          {vacancie.salary_range
            ? [
                vacancie.salary_range.from &&
                  `от ${vacancie.salary_range.from}`,
                vacancie.salary_range.to && `до ${vacancie.salary_range.to}`,
              ]
                .filter(Boolean)
                .join(' ') + ` ${vacancie.salary_range.currency}`
            : 'Зарплата не указана'}
        </p>
        <p className={styles.cardExp}>Опыт: {vacancie.experience.name}</p>
      </div>
      <p className={styles.cardEmp}>{vacancie.employer.name}</p>
      {vacancie.work_format.length > 0 && (
        <span className={styles.cardWf}>
          {vacancie.work_format.map((f) => f.name.toUpperCase()).join(' / ')}
        </span>
      )}
      <p className={styles.cardArea}>{vacancie.area.name}</p>
      <div className={styles.cardBtns}>
        {!isSinglePage && (
          <Button className={styles.detailsBtn}>
            <Link to={vacancie.id.toString()}>Смотреть вакансию</Link>
          </Button>
        )}
        <Button
          className={`${styles.feedbackBtn} ${
            isSinglePage ? styles.btnSinglePage : ''
          }`}
        >
          <a href={vacancie.apply_alternate_url}>
            {isSinglePage ? 'Откликнуться на hh.ru' : 'Откликнуться'}
          </a>
        </Button>
      </div>
    </Card>
  );
}
