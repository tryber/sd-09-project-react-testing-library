import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Component <FavoritePokemons.js /> Test', () => {
  test('renders a not found message', () => {
    const { getByText } = render(
      <MemoryRouter>
        <FavoritePokemons />
      </MemoryRouter>,
    );

    const heading = getByText(/No favorite pokemon found/i);
    expect(heading).toBeInTheDocument();
  });

  test('show favorite cards', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    fireEvent.click(getByText('More details'));
    fireEvent.click(getByText('Pokémon favoritado?'));
    fireEvent.click(getByText('Favorite Pokémons'));

    const card = getByText(/Average weight/i);
    expect(card).toBeInTheDocument();
  });

  test('show no cards if no favorites', () => {
    const { queryByText } = render(
      <MemoryRouter>
        <FavoritePokemons />
      </MemoryRouter>,
    );

    const card = queryByText(/Average weight/i);
    expect(card).not.toBeInTheDocument();
  });
});
