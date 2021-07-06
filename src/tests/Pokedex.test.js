/* import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Pokedex from '../components/Pokedex';

const pokemons = [
  {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
  },
  {
    id: 4,
    name: 'Charmander',
    type: 'Fire',
  },
  {
    id: 65,
    name: 'Alakazam',
    type: 'Psychic',
  },
];

describe('testing Pokedex.js', () => {
  it('test if the page contains a heading whith text "Encountered pokémons"', () => {
    const { getByRole } = render(<Pokedex />);

    const heading = getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe('Encountered pokémons');
  });

  it('test if the next pokemon is displayed by clicking "Próximo pokémon"', async () => {
    const mockFetch = global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(pokemons)
    });

    const { getByText, findByText } = render(<Pokedex />);

    const button = getByText('Próximo pokémon');
    fireEvent.click(button);

    const nextPokemon = await findByText('Charmander');
    expect(nextPokemon).toBeInTheDocument();
  });
});
 */
