import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Teste o componente PokemonDetails.js', () => {
  const moreDetails = 'More details';
  it('Teste as informações detalhadas do Pokémon selecionado', () => {
    const { getByText, queryByText, getByRole } = renderWithRouter(<App />);
    const details = getByText(moreDetails);
    userEvent.click(details);
    const pokemonDetails = getByRole('heading', {
      name: `${pokemons[0].name} Details`,
      level: 2,
    });
    expect(pokemonDetails).toBeInTheDocument();
    const noDetails = queryByText(moreDetails);
    expect(noDetails).not.toBeInTheDocument();
    const summary = getByText('Summary');
    expect(summary).toBeInTheDocument();
    const info = getByText(pokemons[0].summary);
    expect(info).toBeInTheDocument();
  });

  it('Teste se existe uma seção com os mapas das localizações do pokémon', () => {
    const { getByRole, getByText, getAllByAltText } = renderWithRouter(<App />);
    const details = getByText(moreDetails);
    userEvent.click(details);
    const locationsTitle = getByRole('heading', {
      name: `Game Locations of ${pokemons[0].name}`,
      level: 2,
    });
    expect(locationsTitle).toBeInTheDocument();
    const mapLocationsImg = getAllByAltText(/location/i);
    expect(mapLocationsImg.length).toBe(pokemons[0].foundAt.length);
    mapLocationsImg.forEach((map, index) => {
      expect(map)
        .toHaveAttribute('alt', `${pokemons[0].name} location`);
      expect(map.src).toBe(pokemons[0].foundAt[index].map);
      const mapName = getByText(pokemons[0].foundAt[index].location);
      console.log(mapName.innerHTML);
      expect(mapName).toBeInTheDocument();
    });
  });

  it('Teste se o usuário pode favoritar um pokémon na página de detalhes', () => {
    const { getByText, getByLabelText, queryByAltText } = renderWithRouter(<App />);
    const details = getByText('More details');
    userEvent.click(details);
    const favorite = getByLabelText('Pokémon favoritado?');
    expect(favorite).toBeInTheDocument();
    const favoriteClick1 = queryByAltText(`${pokemons[0].name} is marked as favorite`);
    expect(favoriteClick1).not.toBeInTheDocument();
    userEvent.click(favorite);
    const favoriteClick2 = queryByAltText(`${pokemons[0].name} is marked as favorite`);
    expect(favoriteClick2).toBeInTheDocument();
    userEvent.click(favorite);
    const favoriteClick3 = queryByAltText(`${pokemons[0].name} is marked as favorite`);
    expect(favoriteClick3).not.toBeInTheDocument();
  });
});
