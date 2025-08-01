import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { setAddSkill, setRemoveSkill } from '../../Redux/slices/filtersSlice';
import { configureStore } from '@reduxjs/toolkit';
import { MantineProvider } from '@mantine/core';
import TagsFilter from './TagsFilter';
import { MemoryRouter } from 'react-router-dom';

const mockDispatch = vi.fn();
const mockSelector = vi.fn();

vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux');
  return {
    ...actual,
    useDispatch: () => mockDispatch,
    useSelector: () => mockSelector(),
  };
});

const mockStore = configureStore({
  reducer: {
    filters: () => ({
      skills: ['React', 'TypeScript', 'Redux'],
    }),
  },
});

describe('TagsFilter component', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
    mockSelector.mockReturnValue(['React', 'TypeScript', 'Redux']);
  });
  it('Отображает тайтл', () => {
    render(
      <Provider store={mockStore}>
        <MantineProvider>
          <MemoryRouter>
            <TagsFilter />
          </MemoryRouter>
        </MantineProvider>
      </Provider>
    );
    const text = screen.getByText('Ключевые навыки');
    expect(text).toBeInTheDocument();
  });
  it('Отображает placeholder', () => {
    render(
      <Provider store={mockStore}>
        <MantineProvider>
          <MemoryRouter>
            <TagsFilter />
          </MemoryRouter>
        </MantineProvider>
      </Provider>
    );
    const placeholder = screen.getByPlaceholderText('Навык');
    expect(placeholder).toBeInTheDocument();
  });
  it('Навыки по умолчанию', () => {
    render(
      <Provider store={mockStore}>
        <MantineProvider>
          <MemoryRouter>
            <TagsFilter />
          </MemoryRouter>
        </MantineProvider>
      </Provider>
    );
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Redux')).toBeInTheDocument();
  });
  it('Добавляет новый навык при клике на кнопку', () => {
    render(
      <Provider store={mockStore}>
        <MantineProvider>
          <MemoryRouter>
            <TagsFilter />
          </MemoryRouter>
        </MantineProvider>
      </Provider>
    );
    const input = screen.getByPlaceholderText('Навык');
    const btn = screen.getByAltText('Plus');
    fireEvent.change(input, { target: { value: 'Next' } });
    fireEvent.click(btn);
    expect(mockDispatch).toHaveBeenCalledWith(setAddSkill('Next'));
    expect(input).toHaveValue('');
  });
  it('Удаляет навык при нажатии на крестик', () => {
    render(
      <Provider store={mockStore}>
        <MantineProvider>
          <MemoryRouter>
            <TagsFilter />
          </MemoryRouter>
        </MantineProvider>
      </Provider>
    );
    const firstSkill = screen.getByText('React').closest('[data-with-remove]');
    const removeBTn = firstSkill?.querySelector('button');
    if (removeBTn) {
      fireEvent.click(removeBTn);
    }
    expect(mockDispatch).toHaveBeenCalledWith(setRemoveSkill('React'));
  });
  it('Кнопка отключена пока в инпуте пусто', () => {
    render(
      <Provider store={mockStore}>
        <MantineProvider>
          <MemoryRouter>
            <TagsFilter />
          </MemoryRouter>
        </MantineProvider>
      </Provider>
    );
    const input = screen.getByPlaceholderText('Навык');
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();

    fireEvent.change(input, { target: { value: 'test' } });
    expect(btn).not.toBeDisabled();
    fireEvent.change(input, { target: { value: '' } });
    expect(btn).toBeDisabled();
  });
});
