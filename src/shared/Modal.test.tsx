import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Modal from './Modal';
import { MantineProvider } from '@mantine/core';
import userEvent from '@testing-library/user-event';

describe('Modal component', () => {
  let modalRoot: HTMLElement;

  beforeEach(() => {
    modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal');
    document.body.appendChild(modalRoot);
  });

  afterEach(() => {
    document.body.removeChild(modalRoot);
  });

  it('Модалка отображает содержимое', () => {
    render(
      <MantineProvider>
        <Modal onClose={vi.fn()}>Modal content</Modal>
      </MantineProvider>
    );
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });
  it('Закрывает модалку при нажатии на кнопку закрытия', async () => {
    const onClose = vi.fn();
    render(
      <MantineProvider>
        <Modal onClose={onClose}>Modal content</Modal>
      </MantineProvider>
    );
    const closeBtn = screen.getByTestId('modal-close');
    await userEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalled();
  });
  it('Закрывает модалку при клике по overlay', async () => {
    const onClose = vi.fn();
    render(
      <MantineProvider>
        <Modal onClose={onClose}>Modal content</Modal>
      </MantineProvider>
    );
    const overlay = screen.getByTestId('modal-overlay');
    await userEvent.click(overlay);
    expect(onClose).toHaveBeenCalled();
  });
  it('Закрывает модалку при нажатии на Esc', async () => {
    const onClose = vi.fn();
    render(
      <MantineProvider>
        <Modal onClose={onClose}>Modal content</Modal>
      </MantineProvider>
    );
    await userEvent.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalled();
  });
});
