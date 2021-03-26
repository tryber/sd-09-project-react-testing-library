import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Requirement 06', () => {
  const [pikachu, charmander] = pokemons;
  const favoriteByID = { 25: true, 4: false };
  it('should have the pokemon data', () => {
    const { getByAltText, getByTestId } = renderWithRouter(<Pokemon
      pokemon={ pikachu }
      isFavorite={ favoriteByID[pikachu.id] }
    />);
    const name = getByTestId('pokemon-name');
    const pikachuName = pikachu.name;
    expect(name.innerHTML).toBe(pikachuName);

    const type = getByTestId('pokemonType');
    const pikachuType = pikachu.type;
    expect(type.innerHTML).toBe(pikachuType);

    const averageWeight = getByTestId('pokemon-weight');
    const pikachuWeight = `Average weight: ${
      pikachu.averageWeight.value} ${pikachu.averageWeight.measurementUnit}`;
    expect(averageWeight.innerHTML).toBe(pikachuWeight);

    const img = getByAltText(`${pikachu.name} sprite`);
    expect(img.src).toBe(pikachu.image);
  });

  it('should have a link with the pokemon ID', () => {
    const { getByRole } = renderWithRouter(<Pokemon
      pokemon={ pikachu }
      isFavorite={ favoriteByID[pikachu.id] }
    />);
    const pokeLink = getByRole('link');
    expect(pokeLink.innerHTML).toBe('More details');
    expect(pokeLink.href).toContain(`/pokemons/${pikachu.id}`);
  });

  it('should redirect to details when the details link is clicked', () => {
    const { getByRole, history } = renderWithRouter(<Pokemon
      pokemon={ charmander }
      isFavorite={ favoriteByID[charmander.id] }
    />);
    const pokeLink = getByRole('link');
    userEvent.click(pokeLink);
    const { pathname: charmanderDetails } = history.location;
    const charmanderDetailsPath = `/pokemons/${charmander.id}`;
    expect(charmanderDetails).toBe(charmanderDetailsPath);
  });

  it('should have an star if the pokemon is favorited ', () => {
    const { getByAltText } = renderWithRouter(<Pokemon
      pokemon={ pikachu }
      isFavorite={ favoriteByID[pikachu.id] }
    />);
    const star = getByAltText(`${pikachu.name} is marked as favorite`);
    expect(star).toBeInTheDocument();
    expect(star.alt).toContain('is marked as favorite');
    expect(star.src).toContain('/star-icon.svg');
  });
});
