import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('tests the component Pokemon', () => {
  it('must render detailed info about selected pokémon', () => {
    const { getByRole, getAllByAltText, queryByText } = renderWithRouter(<App />);

    const moreDetails = getByRole('link', {
      name: /More Details/i,
    });
    userEvent.click(moreDetails);

    const title = getByRole('heading', {
      level: 2,
      name: /Pikachu Details/i,
    });

    const secondTitle = getByRole('heading', {
      level: 2,
      name: /Summary/i,
    });

    const thirdTitle = getByRole('heading', {
      level: 2,
      name: /Game Locations of Pikachu/i,
    });

    const isFavorite = screen.getByLabelText(/Pokémon favoritado/i);
    const pokemonLocations = getAllByAltText('Pikachu location');
    const summaryText = queryByText(pokemons[0].summary);

    expect(title).toBeInTheDocument();
    expect(isFavorite).toBeInTheDocument();
    expect(secondTitle).toBeInTheDocument();
    expect(thirdTitle).toBeInTheDocument();
    expect(summaryText).not.toBeNull();
    expect(pokemonLocations[0]).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  });
});
