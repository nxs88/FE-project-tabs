import { Box, Pill, PillGroup, Button } from '@mantine/core';
import styles from './TagsFilter.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectSkills,
  setAddSkill,
  setRemoveSkill,
} from '../../Redux/slices/filtersSlice';
import type { AppDispatch } from '../../Redux/store';
import { useState } from 'react';

export default function TagsFilter() {
  const [tagText, setTagText] = useState('');
  const skills = useSelector(selectSkills);
  const dispatch = useDispatch<AppDispatch>();

  const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!tagText) return;
    if (e.key === 'Enter') {
      e.preventDefault();
      dispatch(setAddSkill(tagText));
      setTagText('');
    }
  };

  return (
    <Box className={styles.filterBox}>
      <h3>Ключевые навыки</h3>

      <Box className={styles.inputBox} style={{ display: 'flex', gap: 8 }}>
        <input
          placeholder="Навык"
          value={tagText}
          onChange={(e) => setTagText(e.target.value)}
          onKeyDown={keyDownHandler}
        />

        <Button
          disabled={!tagText}
          size="sm"
          p={0}
          color="#228BE6"
          className={styles.filterBtn}
          onClick={() => {
            dispatch(setAddSkill(tagText));
            setTagText('');
          }}
        >
          <img
            src={`${import.meta.env.BASE_URL}assets/images/Plus.svg`}
            alt="Plus"
          />
        </Button>
      </Box>

      <PillGroup mt="sm">
        {skills.map((item) => (
          <Pill
            key={item}
            withRemoveButton
            onRemove={() => dispatch(setRemoveSkill(item))}
          >
            {item}
          </Pill>
        ))}
      </PillGroup>
    </Box>
  );
}
