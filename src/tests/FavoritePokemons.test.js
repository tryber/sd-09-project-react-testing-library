import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';

describe('test page FavoritePokemons', () => {
  const renderFavPokemons = () => renderWithRouter(<FavoritePokemons />);
  const renderApp = () => renderWithRouter(<App />);
  it('test what is displayed if does not have pokemon', () => {
    const { getByText } = renderFavPokemons();
    const emptyMessage = getByText('No favorite pokemon found');

    expect(emptyMessage).toBeInTheDocument();
  });

  it('test if is displayed all cards', () => {
    const { getAllByRole, getByText, history } = renderApp();

    const pokemonIdOne = 20;
    const pokemonIdTwo = 8;
    const listPokemonsIds = [pokemonIdOne, pokemonIdTwo];

    localStorage.setItem('listPokemonsIds', JSON.stringify(listPokemonsIds));

    history.push('/pokemons/10');

    const favPokemon = getByText('Pokémon favoritado?');
    const linkFavPokemons = getByText('Favorite Pokémons');

    fireEvent.click(favPokemon);
    fireEvent.click(linkFavPokemons);

    const pokemonsImg = getAllByRole('img');
    const expectedImgLength = 2;

    expect(pokemonsImg.length).toBe(expectedImgLength);
  });
});
