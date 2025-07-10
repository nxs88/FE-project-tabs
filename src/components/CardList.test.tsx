import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import CardList from './CardList';
import { MantineProvider } from '@mantine/core';

describe('CardList component', () => {
  it('Отображает текст SpaceX Launches 2020', () => {
    const mockData = [
      {
        flight_number: 1,
        mission_name: '',
        links: { mission_patch_small: 'img' },
        rocket: { rocket_name: 'Falcon9' },
      },
    ];
    render(
      <MantineProvider>
        <CardList data={mockData} />
      </MantineProvider>
    );

    const text = screen.getByText(/SpaceX Launches 2020/i);
    expect(text).toBeInTheDocument();
  });
});
