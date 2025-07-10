import { Card as MantineCard, Image, Button } from '@mantine/core';
import styles from './Card.module.scss';
import type { Launch } from '../types/Launch';
import Modal from '../shared/Modal';
import { useState } from 'react';

type CardProps = {
  launch: Launch;
};

export default function Card({ launch }: CardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalCloseHandler = () => {
    setIsModalOpen(false);
  };

  const modalOpenHandler = () => {
    setIsModalOpen(true);
  };

  return (
    <>
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
        <Button radius="md" w="100%" mt="auto" onClick={modalOpenHandler}>
          See more
        </Button>
        {isModalOpen && (
          <Modal onClose={modalCloseHandler}>
            <h3>{launch.mission_name}</h3>
            <img
              className={styles.modalImg}
              width={200}
              height={200}
              src={launch.links.mission_patch_small}
              alt="Mission Image"
            />
            <h3>Mission name:</h3>
            <p>{launch.mission_name}</p>
            <h3>Rocket name:</h3>
            <p>{launch.rocket.rocket_name}</p>
            <h3>Details:</h3>
            <p>{launch.details}</p>
          </Modal>
        )}
      </MantineCard>
    </>
  );
}
