import { fireEvent, render, screen } from '@testing-library/react';
import VacancieFilter from './VacancieFilter';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, afterEach, beforeAll } from 'vitest';
import { Provider } from 'react-redux';
import { MantineProvider } from '@mantine/core';
import { theme } from '../../theme';
import { matchMedia } from 'mock-match-media';
import configureStore from 'redux-mock-store';
import { fetchVacancies } from '../../Redux/slices/vacanciesSlice';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../../Redux/slices/vacanciesSlice', async () => {
  const actual = await vi.importActual<
    typeof import('../../Redux/slices/vacanciesSlice')
  >('../../Redux/slices/vacanciesSlice');
  return {
    ...actual,
    fetchVacancies: vi.fn(() => ({
      type: 'vacancies/fetchVacancies/pending',
      payload: undefined,
    })),
  };
});

const mockStore = configureStore([]);
let store: ReturnType<typeof mockStore>;

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: matchMedia,
  });
  store = mockStore({
    filters: {
      search: '',
      city: 'Все города',
      skills: [],
    },
    vacancies: {
      vacancies: [],
    },
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('VacancieFilter component', () => {
  it('Отображает иконку внутри инпута', () => {
    render(
      <Provider store={store}>
        <MantineProvider theme={theme}>
          <MemoryRouter>
            <VacancieFilter />;
          </MemoryRouter>
        </MantineProvider>
      </Provider>
    );
    const icon = screen.getByAltText('Lupa');
    expect(icon).toBeInTheDocument();
  });
  it('Отображает плейсхолдер', () => {
    render(
      <Provider store={store}>
        <MantineProvider theme={theme}>
          <MemoryRouter>
            <VacancieFilter />;
          </MemoryRouter>
        </MantineProvider>
      </Provider>
    );
    const placeholder = screen.getByPlaceholderText(
      'Должность или название компании'
    );
    expect(placeholder).toBeInTheDocument();
  });
  it("Отображает кнопку 'Найти'", () => {
    render(
      <Provider store={store}>
        <MantineProvider theme={theme}>
          <MemoryRouter>
            <VacancieFilter />;
          </MemoryRouter>
        </MantineProvider>
      </Provider>
    );
    const button = screen.getByText('Найти');
    expect(button).toBeInTheDocument();
  });
  it("Вызывает fetchVacancies при клике на кнопку 'Найти'", () => {
    render(
      <Provider store={store}>
        <MantineProvider theme={theme}>
          <MemoryRouter>
            <VacancieFilter />;
          </MemoryRouter>
        </MantineProvider>
      </Provider>
    );
    const btn = screen.getByText('Найти');
    fireEvent.click(btn);

    expect(fetchVacancies).toHaveBeenCalledWith({
      search: '',
      city: 'Все города',
      skills: [],
      page: 1,
    });

    const actions = store.getActions();
    expect(actions).toContainEqual({
      type: 'vacancies/fetchVacancies/pending',
      payload: undefined,
    });
  });
});
