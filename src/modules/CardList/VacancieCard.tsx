import { Card, Button } from '@mantine/core';
import styles from './VacancieCard.module.scss';
import type { Vacancie } from '../../types/CardInfo';

type CardProps = {
  vacancie: Vacancie;
};
export default function VacancieCard({ vacancie }: CardProps) {
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
        <Button className={styles.detailsBtn}>Смотреть вакансию</Button>
        <Button className={styles.feedbackBtn}>Откликнуться</Button>
      </div>
    </Card>
  );
}
