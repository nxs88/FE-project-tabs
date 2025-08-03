import { fireEvent, render, screen } from '@testing-library/react';
import CittyFilter from './CittyFilter';
import '@testing-library/jest-dom';
import { describe, it, expect, beforeAll, vi } from 'vitest';
import { Provider } from 'react-redux';
import store from '../../Redux/store';
import { MantineProvider } from '@mantine/core';
import { MemoryRouter } from 'react-router-dom';

beforeAll(() => {
  vi.stubGlobal(
    'ResizeObserver',
    class ResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
  );
});

describe('CityFilter component', () => {
  it('Отображает табы с текстом "Москва" и "Санкт-Петербург"', () => {
    render(
      <Provider store={store}>
        <MantineProvider>
          <MemoryRouter>
            <CittyFilter />;
          </MemoryRouter>
        </MantineProvider>
      </Provider>
    );
    const Moscow = screen.getByText('Москва');
    const StPetersburg = screen.getByText('Санкт-Петербург');
    expect(Moscow).toBeInTheDocument();
    expect(StPetersburg).toBeInTheDocument();
  });

  it('При выборе города вызывает setCity', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    render(
      <Provider store={store}>
        <MantineProvider>
          <MemoryRouter>
            <CittyFilter />;
          </MemoryRouter>
        </MantineProvider>
      </Provider>
    );

    fireEvent.click(screen.getByText('Москва'));
    expect(dispatchSpy).toHaveBeenCalledWith({
      type: 'filters/setCity',
      payload: 'Москва',
    });
  });
});
