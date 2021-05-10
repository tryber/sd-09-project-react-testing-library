import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('FavoritePokekons.js', () => {
  test('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    const { getByText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText(/favorite/i));

    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');

    const notFoundPokemon = getByText(/No favorite pokemon found/i);

    expect(notFoundPokemon).toBeInTheDocument();
  });
});
