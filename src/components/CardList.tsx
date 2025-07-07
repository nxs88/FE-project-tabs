import Card from './Card';
import type { Launch } from '../types/Launch';
import styles from './CardList.module.scss'

type CardListProps = {
  data:Launch[] | null
}

export default function CardList({data}:CardListProps) {
  return (
  
    <div className={styles.cardList}>
      {data?.map(launch => 
      <Card  key={launch.flight_number} launch ={launch}/>

      )}
    </div>
  );
}
