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
import { useSearchParams } from 'react-router-dom';

export default function TagsFilter() {
  const [tagText, setTagText] = useState('');
  const skills = useSelector(selectSkills);
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams, setSearchParams] = useSearchParams();

  const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!tagText) return;
    if (e.key === 'Enter') {
      e.preventDefault();
      dispatch(setAddSkill(tagText));
      setTagText('');
      searchParams.set('skills', [...skills, tagText].join(','));
      setSearchParams(searchParams);
    }
  };

  const addSkillHandler = (text: string) => {
    if (!text) return;
    dispatch(setAddSkill(text));
    setTagText('');
    searchParams.set('skills', [...skills, text].join(','));
    setSearchParams(searchParams);
  };

  const removeSkillHandler = (item: string) => {
    dispatch(setRemoveSkill(item));
    const updateSkills = skills.filter((skill) => skill !== item);
    if (updateSkills.length > 0) {
      searchParams.set('skills', updateSkills.join(','));
    } else {
      searchParams.delete('skills');
    }
    setSearchParams(searchParams);
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
            addSkillHandler(tagText);
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
            onRemove={() => removeSkillHandler(item)}
          >
            {item}
          </Pill>
        ))}
      </PillGroup>
    </Box>
  );
}
