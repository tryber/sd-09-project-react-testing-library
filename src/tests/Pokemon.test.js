import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pokemon } from '../components';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';

const { id, name, type, averageWeight: { value, measurementUnit }, image } = pokemons[0];
const showDetailsLink = true;
const isFavorite = true;

describe('Render <Pokemon /> component,`', () => {
  test('renders pokemon card', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      showDetailsLink={ showDetailsLink }
      isFavorite={ isFavorite }
    />);
    const nameCard = screen.getByTestId('pokemon-name');
    expect(nameCard.innerHTML).toBe(name);
    const typeCard = screen.getByTestId('pokemonType');
    expect(typeCard.innerHTML).toBe(type);
    const weightCard = screen.getByTestId('pokemon-weight');
    expect(weightCard.innerHTML).toBe(`Average weight: ${value} ${measurementUnit}`);
    const imageCard = screen.getByAltText(`${name} sprite`);
    const URLCard = image;
    expect(imageCard).toHaveAttribute('src', URLCard);
  });

  test('renders link with path `/pokemons/id`', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      showDetailsLink={ showDetailsLink }
      isFavorite={ isFavorite }
    />);
    const detailsLink = screen.getByRole('link', { name: /more details/i });
    expect(detailsLink).toBeInTheDocument();
    expect(detailsLink).toHaveAttribute('href', `/pokemons/${id}`);
  });

  test('link redirects to `/pokemons/id`', () => {
    const { history } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      showDetailsLink={ showDetailsLink }
      isFavorite={ isFavorite }
    />);
    const detailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${id}`);
  });

  test('renders favorite star icon', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      showDetailsLink={ showDetailsLink }
      isFavorite={ isFavorite }
    />);
    const imageStar = screen.getByAltText(`${name} is marked as favorite`);
    const pathStar = '/star-icon.svg';
    expect(imageStar).toHaveAttribute('src', pathStar);
  });
});

// npx stryker run ./stryker/Pokemon.conf.json
