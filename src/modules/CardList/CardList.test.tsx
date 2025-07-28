import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import CardList from './CardList';
import type { Vacancie } from '../../types/CardInfo';
import { Provider } from 'react-redux';
import store from '../../Redux/store';
import { MantineProvider } from '@mantine/core';

const mockVacancies: Vacancie[] = [
  {
    id: 1,
    name: 'Frontend Developer',
    salary_range: {
      from: 100000,
      to: 150000,
      currency: 'RUB',
    },
    experience: {
      name: '1-3 года',
    },
    employer: {
      name: 'Kata',
    },
    work_format: [
      { id: '1', name: 'Удаленно' },
      { id: '2', name: 'Гибрид' },
    ],
    area: {
      name: 'Москва',
    },
    snippet: {
      requirement: 'React',
    },
    apply_alternate_url: 'url',
  },
];
const mockPageChange = vi.fn();

describe('CardList component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('Отображает вакансии', () => {
    render(
      <Provider store={store}>
        <MantineProvider>
          <CardList
            vacancies={mockVacancies}
            page={1}
            totalPages={1}
            pageChange={mockPageChange}
          />
        </MantineProvider>
      </Provider>
    );
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
  });
  it('не отображает пагинацию когда totalPage 1', () => {
    render(
      <Provider store={store}>
        <MantineProvider>
          <CardList
            vacancies={mockVacancies}
            page={1}
            totalPages={1}
            pageChange={mockPageChange}
          />
        </MantineProvider>
      </Provider>
    );

    expect(screen.queryByRole('button', { name: '2' })).not.toBeInTheDocument();
  });
  it('отображает пагинацию когда totalPages > 1', () => {
    render(
      <Provider store={store}>
        <MantineProvider>
          <CardList
            vacancies={mockVacancies}
            page={1}
            totalPages={3}
            pageChange={mockPageChange}
          />
        </MantineProvider>
      </Provider>
    );

    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '2' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '3' })).toBeInTheDocument();
  });
  it('Вызывает pageChange при клике на страницу', () => {
    render(
      <Provider store={store}>
        <MantineProvider>
          <CardList
            vacancies={mockVacancies}
            page={1}
            totalPages={3}
            pageChange={mockPageChange}
          />
        </MantineProvider>
      </Provider>
    );
    const btn = screen.getByRole('button', { name: '2' });
    fireEvent.click(btn);
    expect(mockPageChange).toHaveBeenCalledTimes(1);
  });
});
