import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { userEvent } from '@testing-library/user-event';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import Card from './Card';
import { MantineProvider } from '@mantine/core';

const mockLaunch = {
  flight_number: 1,
  mission_name: 'Test Mission',
  rocket: { rocket_name: 'Test Rocket' },
  links: { mission_patch_small: 'test img' },
  details: 'Test details',
};

describe('Card component', () => {
  beforeEach(() => {
    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal');
    document.body.appendChild(modalRoot);
  });

  afterEach(() => {
    const modalRoot = document.getElementById('modal');
    if (modalRoot) {
      document.body.removeChild(modalRoot);
    }
  });

  it('Отображает карточку', () => {
    render(
      <MantineProvider>
        <Card launch={mockLaunch} />
      </MantineProvider>
    );
    expect(screen.getByText(mockLaunch.mission_name)).toBeInTheDocument();
    expect(screen.getByText(mockLaunch.rocket.rocket_name)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'See more' })
    ).toBeInTheDocument();
  });
  it('Открывает модально окно при нажатии на кнопку "See more"', async () => {
    render(
      <MantineProvider>
        <Card launch={mockLaunch} />
      </MantineProvider>
    );
    const modalBtn = screen.getByText(/see more/i);
    await userEvent.click(modalBtn);
    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByText(/Details:/i)).toBeInTheDocument();
    expect(screen.getByText(mockLaunch.details)).toBeInTheDocument();
  });
});
