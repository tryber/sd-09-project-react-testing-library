import userEvent from '@testing-library/user-event';
import React from 'react';
import { Pokedex } from '../components';
import renderWithRouter from '../helper/renderWithRouter';

const pokemonMock = [
  {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  },
  {
    id: 4,
    name: 'Charmander',
    type: 'Fire',
    averageWeight: {
      value: '8.5',
      measurementUnit: 'kg',
    },
    image: 'https://cdn.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
  },
];

const pokemonFavoriteMock = { 25: false, 4: false };

describe('Requirement 5: Component Pokedex tests', () => {
  it('Renders h2 title', () => {
    const { getByRole } = renderWithRouter(<Pokedex
      pokemons={ pokemonMock }
      isPokemonFavoriteById={ pokemonFavoriteMock }
    />);
    expect(getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    })).toBeInTheDocument();
  });
  it('Tests the next Pokémon button', () => {
    const { getByRole, getByText } = renderWithRouter(<Pokedex
      pokemons={ pokemonMock }
      isPokemonFavoriteById={ pokemonFavoriteMock }
    />);
    const button = getByRole('button', { name: 'Próximo pokémon' });
    expect(button).toBeInTheDocument();
    expect(getByText(/Pikachu/i)).toBeInTheDocument();
    userEvent.click(button);
    expect(getByText(/Charmander/i)).toBeInTheDocument();
    userEvent.click(button);
    expect(getByText(/Pikachu/i)).toBeInTheDocument();
  });
  it('Tests whether it is shown shows only one pokémon', () => {
    const { queryByText } = renderWithRouter(<Pokedex
      pokemons={ pokemonMock }
      isPokemonFavoriteById={ pokemonFavoriteMock }
    />);
    expect(queryByText(/Charmander/i)).not.toBeInTheDocument();
    expect(queryByText(/Pikachu/i)).toBeInTheDocument();
  });
  it('Tests filter by type buttons', () => {
    const { getByRole, queryByText } = renderWithRouter(<Pokedex
      pokemons={ pokemonMock }
      isPokemonFavoriteById={ pokemonFavoriteMock }
    />);
    const electricTypeButton = getByRole('button', { name: 'Electric' });
    const fireTypeButton = getByRole('button', { name: 'Fire' });
    expect(electricTypeButton).toBeInTheDocument();
    expect(fireTypeButton).toBeInTheDocument();
    userEvent.click(fireTypeButton);
    expect(queryByText(/Charmander/i)).toBeInTheDocument();
    expect(queryByText(/Pikachu/i)).not.toBeInTheDocument();
    userEvent.click(electricTypeButton);
    expect(queryByText(/Pikachu/i)).toBeInTheDocument();
    expect(queryByText(/Charmander/i)).not.toBeInTheDocument();
  });
  it('Tests reset button', () => {
    const { getByRole, getByText } = renderWithRouter(<Pokedex
      pokemons={ pokemonMock }
      isPokemonFavoriteById={ pokemonFavoriteMock }
    />);
    const resetButton = getByRole('button', { name: 'All' });
    expect(resetButton).toBeInTheDocument();
    expect(getByText(/Pikachu/i)).toBeInTheDocument();
    const fireTypeButton = getByRole('button', { name: 'Fire' });
    userEvent.click(fireTypeButton);
    expect(getByText(/Charmander/i)).toBeInTheDocument();
    userEvent.click(resetButton);
    expect(getByText(/Pikachu/i)).toBeInTheDocument();
  });
  it('Tests whether filter buttons are rendered for all types and reset button', () => {
    const { queryAllByRole, getByRole, getAllByTestId } = renderWithRouter(<Pokedex
      pokemons={ pokemonMock }
      isPokemonFavoriteById={ pokemonFavoriteMock }
    />);
    const resetButton = getByRole('button', { name: 'All' });
    const fireTypeButton = queryAllByRole('button', { name: 'Fire' });
    const electricTypeButton = queryAllByRole('button', { name: 'Electric' });
    expect(resetButton).toBeInTheDocument();
    expect(fireTypeButton.length).toBe(1);
    expect(electricTypeButton.length).toBe(1);
    expect(getAllByTestId('pokemon-type-button').length).toBe(2);
  });
  it('Tests whether "next button" is disabled when is only one pokemon', () => {
    const { queryByRole } = renderWithRouter(<Pokedex
      pokemons={ pokemonMock }
      isPokemonFavoriteById={ pokemonFavoriteMock }
    />);
    const nextButton = queryByRole('button', { name: 'Próximo pokémon' });
    expect(nextButton).not.toBeDisabled();
    userEvent.click(queryByRole('button', { name: 'Electric' }));
    expect(nextButton).toBeDisabled();
  });
});
