import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

// realizado requisito com ajuda da cainan
// https://github.com/tryber/sd-08-project-react-testing-library/blob/Cainan6697-react-testing/src/tests/Pokemon.test.js

describe('PokemonDetails', () => {
  it('Should shows the pokémon details on screen', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const buttonDetails = getByText(/More Details/i);

    fireEvent.click(buttonDetails);
    const pokemonName = getByText('Pikachu Details');
    const summary = getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    const pokemonInfo = getByText(/This intelligent Pokémon roasts hard berries/i);
    expect(pokemonName).toHaveTextContent('Pikachu Details');
    expect(buttonDetails).not.toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(pokemonInfo).toBeInTheDocument();
  });
  it('Should shows  a section with maps', () => {
    const { getByText, getByRole, getAllByRole } = renderWithRouter(<App />);
    const buttonDetails = getByText(/More Details/i);
    fireEvent.click(buttonDetails);
    const pokemonGameLocation = getByRole('heading', {
      level: 2,
      name: /Game locations of Pikachu/i,
    });
    const pokeLocations = getAllByRole('img', {
      name: /Pikachu location/i,
    });
    expect(pokemonGameLocation).toBeInTheDocument();
    expect(pokeLocations.length).toBe(2);
    expect(pokeLocations[0]).toHaveAttribute('src',
      'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  });
  it('Should favorited a pokémon', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const buttonDetails = getByText(/More Details/i);

    fireEvent.click(buttonDetails);
    const checkbox = getByRole('checkbox');
    const label = getByText(/Pokémon favoritado?/i);

    fireEvent.click(checkbox);

    expect(checkbox).toBeTruthy();
    expect(label).toBeInTheDocument();
  });
});
