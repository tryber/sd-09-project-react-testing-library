import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it('Caso nao tenha favoritos, no favorite deve aparecer', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const noFavoriteMsg = getByText('No favorite pokemon found');

    expect(noFavoriteMsg).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const { getAllByRole, getByText, history } = renderWithRouter(<App />);

    const pikachuId = 25;
    const charmanderId = 4;
    const arrayIds = [pikachuId, charmanderId];

    localStorage.setItem('favoritePokemonIds', JSON.stringify(arrayIds));

    history.push('/pokemons/10');

    const favoritePokemon = getByText('Pokémon favoritado?');
    const linkFavorites = getByText('Favorite Pokémons');

    fireEvent.click(favoritePokemon);
    fireEvent.click(linkFavorites);

    const pokemonImg = getAllByRole('img');
    const imagesLenght = 6;

    expect(pokemonImg.length).toBe(imagesLenght);
  });
});
