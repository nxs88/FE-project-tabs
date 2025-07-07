import { Card as MantineCard, Image, Button } from '@mantine/core';
import styles from './Card.module.scss';
import type { Launch } from '../types/Launch';

type CardProps = {
  launch: Launch;
};

export default function Card({ launch }: CardProps) {
  return (
    <div>
      <MantineCard
        className={styles.card}
        shadow="sm"
        padding="md"
        radius="md"
        withBorder
        w={250}
        h={350}
      >
        <Image
          w={100}
          h={100}
          src={launch.links.mission_patch_small}
          alt="Mission Image"
          mt={20}
          mb={20}
        />
        <p>{launch.mission_name}</p>
        <p>{launch.rocket.rocket_name}</p>
        <Button radius="md" w="100%" mt="auto">
          See more
        </Button>
      </MantineCard>
    </div>
  );
}
