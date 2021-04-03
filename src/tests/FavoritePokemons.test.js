import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

const dummyArray = Array;
dummyArray.prototype.randomElement = function randomElement() {
  return (this.length) ? this[Math.floor(Math.random() * this.length)] : undefined;
};

describe('Tests Favorite Pokenons', () => {
  test('Tests No Favorite Pokémons', () => {
    render(<FavoritePokemons />);
    expect(screen.getByText('No favorite pokemon found')).toBeInTheDocument();
  });

  test('Tests All Favorite Cards Display', () => {
    const mock = [pokemons.randomElement()];
    const { name, type, averageWeight: { value, measurementUnit } } = mock[0];

    render(<MemoryRouter><FavoritePokemons pokemons={ mock } /></MemoryRouter>);

    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByText(type)).toBeInTheDocument();
    const weight = screen.getByText(new RegExp(`${value} ${measurementUnit}`));
    expect(weight).toBeInTheDocument();
  });

  test('No Favorite Cards Display', () => {
    const { container } = render(
      <MemoryRouter><FavoritePokemons pokemons={ [] } /></MemoryRouter>,
    );

    expect(container.getElementsByClassName('favorite-pokemons').length).toBe(0);
  });
});
