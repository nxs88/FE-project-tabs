import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import VacancieCard from './VacancieCard';
import { Provider } from 'react-redux';
import store from '../../Redux/store';
import { MantineProvider } from '@mantine/core';
import { MemoryRouter } from 'react-router-dom';

const mockVacancie = {
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
    responsibility: 'test',
  },
  apply_alternate_url: 'url',
};
const mockVacancieWithoutSalary = {
  ...mockVacancie,
  salary_range: null,
};

const mockVacancieWithoutWorkFormat = {
  ...mockVacancie,
  work_format: [],
};

describe('VacancieCard component', () => {
  it('Отображает информацию ', () => {
    render(
      <Provider store={store}>
        <MantineProvider>
          <MemoryRouter>
            <VacancieCard vacancie={mockVacancie} />
          </MemoryRouter>
        </MantineProvider>
      </Provider>
    );
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
    expect(screen.getByText('Kata')).toBeInTheDocument();
    expect(screen.getByText('Москва')).toBeInTheDocument();
  });
  it('Отображает зарплату ', () => {
    render(
      <Provider store={store}>
        <MantineProvider>
          <MemoryRouter>
            <VacancieCard vacancie={mockVacancie} />
          </MemoryRouter>
        </MantineProvider>
      </Provider>
    );
    expect(screen.getByText('от 100000 до 150000 RUB')).toBeInTheDocument();
  });
  it('Отображает "Зарплата не указана" когда нет salary_range ', () => {
    render(
      <Provider store={store}>
        <MantineProvider>
          <MemoryRouter>
            <VacancieCard vacancie={mockVacancieWithoutSalary} />
          </MemoryRouter>
        </MantineProvider>
      </Provider>
    );
    expect(screen.getByText('Зарплата не указана')).toBeInTheDocument();
  });
  it('Отображает опыт работы ', () => {
    render(
      <Provider store={store}>
        <MantineProvider>
          <MemoryRouter>
            <VacancieCard vacancie={mockVacancie} />
          </MemoryRouter>
        </MantineProvider>
      </Provider>
    );
    expect(screen.getByText('Опыт: 1-3 года')).toBeInTheDocument();
  });
  it('Отображает work_format ', () => {
    render(
      <Provider store={store}>
        <MantineProvider>
          <MemoryRouter>
            <VacancieCard vacancie={mockVacancie} />
          </MemoryRouter>
        </MantineProvider>
      </Provider>
    );
    expect(screen.getByText(/Удаленно \/ Гибрид/i)).toBeInTheDocument();
  });
  it('Не отображает work_format когда его нет ', () => {
    render(
      <Provider store={store}>
        <MantineProvider>
          <MemoryRouter>
            <VacancieCard vacancie={mockVacancieWithoutWorkFormat} />
          </MemoryRouter>
        </MantineProvider>
      </Provider>
    );
    expect(screen.queryByText(/Удаленно \/ Гибрид/i)).not.toBeInTheDocument();
  });
  it('Отображает кнопки', () => {
    render(
      <Provider store={store}>
        <MantineProvider>
          <MemoryRouter>
            <VacancieCard vacancie={mockVacancie} />
          </MemoryRouter>
        </MantineProvider>
      </Provider>
    );
    expect(screen.getByText('Смотреть вакансию')).toBeInTheDocument();
    expect(screen.getByText('Откликнуться')).toBeInTheDocument();
  });
});
