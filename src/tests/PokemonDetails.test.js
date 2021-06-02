import React from 'react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from '../services/RenderWithRouter';
import App from '../App';

describe('Testa o componente <PokemonDetails />', () => {
  const pokeDetailsPath = '/pokemons/25';
  test('Testa se as informações detalhadas são mostradas na tela', () => {
    const { history, getByRole } = RenderWithRouter(<App />);
    history.push(pokeDetailsPath);
    const nameDetails = getByRole('heading', { level: 2, name: /Pikachu Details/i });
    expect(nameDetails).toBeInTheDocument();
  });
  test('Testa se Game Locations são mostradas na tela', () => {
    const { history, getByRole } = RenderWithRouter(<App />);
    history.push(pokeDetailsPath);
    const gameLocation = getByRole('heading', {
      level: 2,
      name: /Game Locations of Pikachu/i,
    });
    expect(gameLocation).toBeInTheDocument();
  });
  test('Testa se existe um sumário na tela', () => {
    const { history, queryByText, getByRole } = RenderWithRouter(<App />);
    history.push(pokeDetailsPath);
    const linkMoreDetails = queryByText(/More details/i);
    expect(linkMoreDetails).toBe(null);
    const summary = getByRole('heading', { level: 2, name: /Summary/i });
    const pokemonSumary = queryByText(/This intelligent Pokémon roasts hard berries/i);
    expect(summary).toBeInTheDocument();
    expect(pokemonSumary).toBeInTheDocument();
  });
  test('Testa se existe na página uma seção com os mapas', () => {
    const {
      history,
      queryByText,
      getByRole,
      getAllByAltText,
    } = RenderWithRouter(<App />);
    history.push(pokeDetailsPath);
    const gameLocations = getByRole('heading', {
      level: 2,
      name: /Game Locations of Pikachu/i,
    });
    expect(gameLocations).toBeInTheDocument();
    const location1 = queryByText(/Kanto Viridian Forest/i);
    const location2 = queryByText(/Kanto Power Plant/i);
    const maps = getAllByAltText(/Pikachu location/i);
    expect(location1).toBeInTheDocument();
    expect(location2).toBeInTheDocument();
    expect(maps[0].src).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(maps[1].src).toBe('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });
  test('Testa se existe na página uma seção com os mapas', () => {
    const { history, getByText, getByAltText } = RenderWithRouter(<App />);
    history.push(pokeDetailsPath);
    const checkFavorite = getByText(/Pokémon favoritado?/i);
    expect(checkFavorite).toBeInTheDocument();
    userEvent.click(checkFavorite);
    const marked = getByAltText(/Pikachu is marked as favorite/i);
    expect(marked).toBeInTheDocument();
    userEvent.click(checkFavorite);
    expect(marked).not.toBeInTheDocument();
  });
});
