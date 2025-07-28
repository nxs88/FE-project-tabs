import { fireEvent, render, screen } from '@testing-library/react';
import CittyFilter from './CittyFilter';
import '@testing-library/jest-dom';
import { describe, it, expect, beforeAll, vi } from 'vitest';
import { Provider } from 'react-redux';
import store from '../../Redux/store';
import { MantineProvider } from '@mantine/core';

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
  it('Отображает иконку внутри инпута', () => {
    render(
      <Provider store={store}>
        <MantineProvider>
          <CittyFilter />;
        </MantineProvider>
      </Provider>
    );
    const icon = screen.getByAltText('Mark');
    expect(icon).toBeInTheDocument();
  });
  it('Отображает плейсхолдер', () => {
    render(
      <Provider store={store}>
        <MantineProvider>
          <CittyFilter />;
        </MantineProvider>
      </Provider>
    );
    const placeholder = screen.getByPlaceholderText('Все города');
    expect(placeholder).toBeInTheDocument();
  });
  it('При выборе города вызывает setCity', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    render(
      <Provider store={store}>
        <MantineProvider>
          <CittyFilter />;
        </MantineProvider>
      </Provider>
    );
    const select = screen.getByRole('textbox');
    fireEvent.click(select);
    fireEvent.click(screen.getByText('Москва'));
    expect(dispatchSpy).toHaveBeenCalledWith({
      type: 'filters/setCity',
      payload: 'Москва',
    });
  });
});
