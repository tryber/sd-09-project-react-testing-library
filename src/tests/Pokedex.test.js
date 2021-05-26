import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import { Pokedex } from '../components';
import pokemons from '../data';
import { readFavoritePokemonIds } from '../services/pokedexService';

const setIsPokemonFavoriteById = () => {
  const favoritePokemonIds = readFavoritePokemonIds();
  const isPokemonFavorite = pokemons.reduce((acc, pokemon) => {
    acc[pokemon.id] = favoritePokemonIds.includes(pokemon.id);
    return acc;
  }, {});

  return isPokemonFavorite;
};
const isFavorite = setIsPokemonFavoriteById();
describe('Test "Pokedex" functionality', () => {
  renderWithRouter(
    <Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isFavorite }
    />,
  );
  test('Renders a h2 tag with "Encoutered pokémons"', () => {
    const h2Element = screen.getByText(/Encountered/i);
    expect(h2Element).toBeInTheDocument();
  });
  test('Render next pokemon of the array, after "Próximo pokémon is clicked"', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isFavorite }
      />,
    );
    const nextButton = screen.getByTestId('next-pokemon');
    expect(nextButton).toBeInTheDocument();
    const pokemon1 = screen.getByTestId('pokemon-name');

    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    expect(pokemon1.textContent).toBe('Dragonair');

    fireEvent.click(nextButton);
    expect(pokemon1.textContent).toBe('Pikachu');
  });
  test('Renders only one pokemon at time', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isFavorite }
      />,
    );
    const allPokemons = screen.getAllByTestId('pokemon-name');
    expect(allPokemons).toHaveLength(1);
  });
  test('Render filter buttons', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isFavorite }
      />,
    );
    const electricButton = screen.getByRole('button', { name: 'Electric' });
    expect(electricButton).toBeInTheDocument();

    fireEvent.click(electricButton);
    const electricPokemon = screen.getByText('Pikachu');
    const nextButton = screen.getByRole('button', { name: 'Próximo pokémon' });

    expect(electricPokemon).toBeInTheDocument();
    expect(nextButton).toBeDisabled();

    const fireButton = screen.getByRole('button', { name: 'Fire' });
    expect(fireButton).toBeInTheDocument();

    fireEvent.click(fireButton);
    const firstFirePokemon = screen.getByText('Charmander');
    expect(firstFirePokemon).toBeInTheDocument();

    fireEvent.click(nextButton);
    const secondFirePokemon = screen.getByText('Rapidash');
    expect(secondFirePokemon).toBeInTheDocument();
  });
  test('Render clean button(All)', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isFavorite }
      />,
    );
    const allButton = screen.getByRole('button', { name: 'All' });
    expect(allButton).toBeInTheDocument();
    const nextButton = screen.getByRole('button', { name: 'Próximo pokémon' });
    const electricPokemon = screen.getByText('Pikachu');
    expect(electricPokemon).toBeInTheDocument();
    expect(nextButton).not.toBeDisabled();
    fireEvent.click(allButton);

    fireEvent.click(nextButton);
    expect(screen.getByText('Charmander')).toBeInTheDocument();
    fireEvent.click(nextButton);
    expect(screen.getByText('Caterpie')).toBeInTheDocument();
    fireEvent.click(nextButton);
    expect(screen.getByText('Ekans')).toBeInTheDocument();
    fireEvent.click(nextButton);
    expect(screen.getByText('Alakazam')).toBeInTheDocument();
    fireEvent.click(nextButton);
    expect(screen.getByText('Mew')).toBeInTheDocument();
    fireEvent.click(nextButton);
    expect(screen.getByText('Rapidash')).toBeInTheDocument();
    fireEvent.click(nextButton);
    expect(screen.getByText('Snorlax')).toBeInTheDocument();
    fireEvent.click(nextButton);
    expect(screen.getByText('Dragonair')).toBeInTheDocument();
  });
  test('Render buttons automatically', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isFavorite }
      />,
    );
    pokemons.forEach((pokemon) => {
      expect(screen.getAllByTestId('pokemon-type-button', { name: pokemon.type }));
    });
  });
});
