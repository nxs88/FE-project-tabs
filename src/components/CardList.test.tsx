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
  it('Ничего не рендерит если  нет данных', () => {
    render(
      <MantineProvider>
        <CardList data={null} />
      </MantineProvider>
    );
    const container = screen.queryByRole('list');
    expect(container).not.toBeInTheDocument();
  });
  it('Отображает карточку для каждого запуска', () => {
    const mockData = [
      {
        flight_number: 1,
        mission_name: 'Starlink 2',
        links: { mission_patch_small: 'img1' },
        rocket: { rocket_name: 'Falcon9' },
      },
      {
        flight_number: 2,
        mission_name: 'Starlink 3',
        links: { mission_patch_small: 'img2' },
        rocket: { rocket_name: 'Falcon9' },
      },
    ];
    render(
      <MantineProvider>
        <CardList data={mockData} />
      </MantineProvider>
    );

    const card1 = screen.getByText(/Starlink 2/i);
    const card2 = screen.getByText(/Starlink 3/i);
    expect(card1).toBeInTheDocument();
    expect(card2).toBeInTheDocument();
  });
});
