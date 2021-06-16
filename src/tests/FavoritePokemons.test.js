import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testando componente FavoritePokemons', () => {
  test('Testa se renderiza "No favorite Pokemos"', () => {
    const { getByText } = renderWithRouter(<App />);
    const favoriteLink = getByText(/Favorite Pokémons/i);
    userEvent.click(favoriteLink);
    const textNotFound = getByText(/No favorite pokemon found/i);
    expect(textNotFound).toBeInTheDocument();
  });
  test('Testa se exibe somente pokemons favoritados', () => {
    const { getByText,
      history,
      getByAltText,
      getAllByAltText } = renderWithRouter(<App />);
    const moreDetails = getByText(/More details/i);
    userEvent.click(moreDetails);
    const favoritado = getByText(/pokémon favoritado?/i);
    userEvent.click(favoritado);
    history.push('/favorites');
    const pikachu = getByAltText(/Pikachu is marked as favorite/i);
    expect(pikachu).toBeInTheDocument();
    expect(getAllByAltText(/is marked as favorite/).length).toBe(1);
  });
});
