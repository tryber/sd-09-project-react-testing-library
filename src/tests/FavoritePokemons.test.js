import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Requisito 03 - FavoritePokemons.js', () => {
  it('Testa se exibe `No favorite pokemon found`, qdo não há pokémons favoritos.', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);

    const noFavorite = getByText(/No favorite pokemon found/i);

    expect(noFavorite).toBeInTheDocument();
  });

  it('Testa se é exibido todos os cards de pokémons favoritados.', () => {
    const { getByText, getByRole, getByAltText, history } = renderWithRouter(<App />);

    const cardPikachu = getByText(/Pikachu/i);
    expect(cardPikachu).toBeInTheDocument();

    const detailsLink = getByText(/More details/i);
    expect(detailsLink).toBeInTheDocument();

    userEvent.click(detailsLink);
    const { pathname: detailsPath } = history.location;
    expect(detailsPath).toBe('/pokemons/25');

    userEvent.click(getByRole('checkbox'));

    const starPikachu = getByAltText(/pikachu is marked as favorite/i);
    expect(starPikachu).toBeInTheDocument();

    const favoriteLink = getByText(/Favorite Pokémons/i);
    expect(favoriteLink).toBeInTheDocument();

    userEvent.click(favoriteLink);
    const { pathname: favoritePath } = history.location;
    expect(favoritePath).toBe('/favorites');

    const cardStarPikachu = getByText(/Pikachu/i);
    expect(cardStarPikachu).toBeInTheDocument();
  });
});
