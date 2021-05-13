import React from 'react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './help-test/renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Pokemon', () => {
  const pokemon = pokemons[0];
  const weight = pokemon.averageWeight.value;
  const unit = pokemon.averageWeight.measurementUnit;
  it('should render a card with the information of a certain Pokémon.', async () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemon }
      isFavorite={ false }
    />);

    const name = screen.getByText(pokemon.name);
    expect(name).toBeInTheDocument();
    const type = screen.getByText(pokemon.type);
    expect(type).toBeInTheDocument();
    const averageWeight = screen.getByText(`Average weight: ${weight} ${unit}`);
    expect(averageWeight).toBeInTheDocument();
    const image = screen.getByAltText(`${pokemon.name} sprite`);
    expect(image.src).toBe(pokemon.image);
  });

  it('should contain a navigation link to display details of the Pokémon', () => {
    const { history } = renderWithRouter(<Pokemon
      pokemon={ pokemon }
      isFavorite
    />);

    const link = screen.getByText(/more details/i);
    expect(link).toBeInTheDocument();
    userEvent.click(link);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${pokemon.id}`);
  });

  it('should be a star icon on favorite Pokémon.', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemon }
      isFavorite
    />);

    const image = screen.getByAltText('Pikachu is marked as favorite');
    expect(image).toBeInTheDocument();
    expect(image.src).toBe('http://localhost/star-icon.svg');
  });
});
