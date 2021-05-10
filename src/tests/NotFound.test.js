import React from 'react';
import { screen } from '@testing-library/dom';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import { NotFound } from '../components';

describe('NotFound.js', () => {
  test('Teste se pág contém 1 heading h2 com o texto Page requested not found 😭', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/not-found');

    const { pathname } = history.location;

    expect(pathname).toBe('/not-found');

    const emoji = screen.getByText('😭');
    expect(emoji).toBeInTheDocument();

    const text = screen.getByText('Page requested not found');
    expect(text).toBeInTheDocument();
  });
  test('Teste se pág mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const { getByRole } = renderWithRouter(<NotFound />);

    const NotFoundImage = getByRole('img', {
      name: 'Pikachu crying because the page requested was not found',
    });
    expect(NotFoundImage).toBeInTheDocument();
    expect(NotFoundImage.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
