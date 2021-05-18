import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import pokemonsList from '../data';

describe('Requisito 07 - Testes do PokemonDetails.js', () => {
  it('As informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    const { queryByText, getByRole, getByText } = renderWithRouter(<App />);
    const { name } = pokemonsList[0];

    let pokemonDetailsLink = queryByText(/more details/i);
    userEvent.click(pokemonDetailsLink);

    const pokemonDetailsPageTitle = (
      getByRole('heading', { level: 2, name: `${name} Details` }));
    expect(pokemonDetailsPageTitle).toBeInTheDocument();

    pokemonDetailsLink = queryByText(/more details/i);
    expect(pokemonDetailsLink).toBeNull();

    const pokemonDetailsSummaryTitle = (
      getByRole('heading', { level: 2, name: /summary/i }));
    expect(pokemonDetailsSummaryTitle).toBeInTheDocument();

    const pokemonDetailsSummary = getByText(/this intelligent pokémon/i);
    expect(pokemonDetailsSummary).toBeInTheDocument();
  });

  it('Existe uma seção com os mapas contendo as localizações do pokémon', () => {
    const { getByText, getByRole, getAllByAltText } = renderWithRouter(<App />);
    const { name, foundAt } = pokemonsList[0];
    const locations = ['Kanto Viridian Forest', 'Kanto Power Plant'];
    const maps = [
      'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
      'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    ];

    const pokemonDetailsLink = getByText(/more details/i);
    userEvent.click(pokemonDetailsLink);

    const pokemonGameLocations = (
      getByRole('heading', { level: 2, name: `Game Locations of ${name}` }));
    expect(pokemonGameLocations).toBeInTheDocument();

    foundAt.forEach(({ location, map }, index) => {
      expect(location).toBe(locations[index]);
      expect(map).toBe(maps[index]);
    });

    const locationsList = getAllByAltText(/pikachu location/i);
    locationsList.forEach((currentLocation, index) => {
      expect(currentLocation).toHaveAttribute('src', maps[index]);
    });
  });

  it('O usuário pode favoritar um pokémon através da página de detalhes', () => {
    const { getByRole, getByText, getByLabelText } = renderWithRouter(<App />);

    const pokemonDetailsLink = getByText(/more details/i);
    userEvent.click(pokemonDetailsLink);

    const favoritePokemonCheckbox = getByRole('checkbox', { id: 'favorite' });
    expect(favoritePokemonCheckbox).toBeInTheDocument();
    expect(favoritePokemonCheckbox).not.toBeChecked();
    userEvent.click(favoritePokemonCheckbox);
    expect(favoritePokemonCheckbox).toBeChecked();

    const favoritePokemonCheckboxLabel = getByLabelText('Pokémon favoritado?');
    expect(favoritePokemonCheckboxLabel).toBeInTheDocument();
  });
});
