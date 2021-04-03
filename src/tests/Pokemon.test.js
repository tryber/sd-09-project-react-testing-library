import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { createMemoryHistory } from 'history';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

const dummyArray = Array;
dummyArray.prototype.randomElement = function randomElement() {
  return (this.length) ? this[Math.floor(Math.random() * this.length)] : undefined;
};

describe('Tests Pokemon', () => {
  const pokemon = pokemons.randomElement();
  const isFavorite = true;
  const showDetailsLink = true;
  test('', () => {
    const history = createMemoryHistory();
    render(
      <MemoryRouter history={ history }>
        <Pokemon
          isFavorite={ isFavorite }
          pokemon={ pokemon }
          showDetailsLink={ showDetailsLink }
        />
      </MemoryRouter>,
    );
    expect(screen.getByTestId('pokemon-name')).toHaveTextContent(`${pokemon.name}`);
    expect(screen.getByTestId('pokemonType')).toHaveTextContent(`${pokemon.type}`);
    const { value, measurementUnit } = pokemon.averageWeight;
    expect(screen.getByTestId('pokemon-weight'))
      .toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
    expect(screen.getByText('More details'))
      .toHaveAttribute('href', `/pokemons/${pokemon.id}`);
    expect(screen.getByAltText(`${pokemon.name} sprite`))
      .toHaveAttribute('src', `${pokemon.image}`);
    expect(screen.getByAltText(`${pokemon.name} is marked as favorite`))
      .toHaveAttribute('src', '/star-icon.svg');
  });
});
