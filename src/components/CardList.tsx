import Card from './Card';
import type { Launch } from '../types/Launch';
import styles from './CardList.module.scss';

type CardListProps = {
  data: Launch[] | null;
};

export default function CardList({ data }: CardListProps) {
  return (
    <>
      <h1>SpaceX Launches 2020</h1>
      <div className={styles.cardList}>
        {data?.map((launch) => (
          <Card key={launch.mission_name} launch={launch} />
        ))}
      </div>
    </>
  );
}
