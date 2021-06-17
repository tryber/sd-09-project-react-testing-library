import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testando a página FavoritePokemons', () => {
  it('Teste o que é exibido, se não tiver pokémons favoritos', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const emptyFavoritesMessage = getByText('No favorite pokemon found');

    expect(emptyFavoritesMessage).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const { getAllByRole, getByText, history } = renderWithRouter(<App />);

    const pikachuId = 25;
    const charmanderId = 4;
    const arrayOfPokemonsIds = [pikachuId, charmanderId];

    localStorage.setItem('favoritePokemonIds', JSON.stringify(arrayOfPokemonsIds));

    history.push('/pokemons/10');

    const toFavoritePokemon = getByText('Pokémon favoritado?');
    const linkToFavorites = getByText('Favorite Pokémons');

    fireEvent.click(toFavoritePokemon);
    fireEvent.click(linkToFavorites);

    const pokemonsImages = getAllByRole('img');
    const numberOfImagesExpected = 6; // 3 pokemons and 3 stars, one star for each pokemon.

    expect(pokemonsImages.length).toBe(numberOfImagesExpected);
  });
});
