import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import Header from './Header';

describe('Header component', () => {
  it('Отображает логотип', () => {
    render(<Header />);
    const logo = screen.getByAltText('Logo');
    expect(logo).toBeInTheDocument();
  });
  it('отображает текст ".FrontEnd"', () => {
    render(<Header />);
    expect(screen.getByText('.FrontEnd')).toBeInTheDocument();
  });
  it('отображает страницы "Вакансии FE" и "Обо мне"', () => {
    render(<Header />);
    expect(screen.getByText('Вакансии FE')).toBeInTheDocument();
    expect(screen.getByText('Обо мне')).toBeInTheDocument();
  });
  it('отображает иконку пользователя в блоке "Обо мне"', () => {
    render(<Header />);
    const userIcon = screen.getByAltText('UserLogo');
    expect(userIcon).toBeInTheDocument();
  });
});
