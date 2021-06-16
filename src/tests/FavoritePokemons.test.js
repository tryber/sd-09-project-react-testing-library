import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Requisito 03', () => {
  test('Se a pessoa não tiver pokémons favoritos. No favorite pokemon found', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const noPokemon = getByText('No favorite pokemon found');
    expect(noPokemon).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const {
      getByText,
      getByLabelText,
      history,
      getByAltText,
    } = renderWithRouter(<App />);
    const linkDetails = getByText('More details');
    fireEvent.click(linkDetails);

    const labelFavorite = getByLabelText('Pokémon favoritado?');
    fireEvent.click(labelFavorite);

    history.push('/favorites');

    const star = getByAltText(/is marked as favorite/);
    expect(star.src).toBe('http://localhost/star-icon.svg');
  });
});
