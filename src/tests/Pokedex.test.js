import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../services/renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

describe('Test Component Pokédex', () => {
  const pokemontypebutton = 'pokemon-type-button';
  const nextPokemon = 'next-pokemon';
  const pokemonName = 'pokemon-name';

  it('Página tem h2 com o texto "Encountered pokémons"', () => {
    const { getByRole } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ [] } />,
    );
    expect(getByRole('heading').textContent).toBe('Encountered pokémons');
  });

  it('É exibido o próximo Pokémon da lista quando o botão "Próximo pokémon" é clicado',
    () => {
      const { getByTestId, getAllByTestId } = renderWithRouter(
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ [] } />,
      );
      const btnNext = getByTestId(nextPokemon);
      const testIdName = getByTestId(pokemonName);
      const listTestIdName = getAllByTestId(pokemonName);

      expect(btnNext).toBeInTheDocument();
      expect(btnNext.textContent).toBe('Próximo pokémon');

      expect(listTestIdName.length).toBe(1);
      expect(testIdName.textContent).toBe('Pikachu');

      while (testIdName.textContent !== 'Dragonair') {
        fireEvent.click(btnNext);
        expect(listTestIdName.length).toBe(1);
      }

      fireEvent.click(btnNext);
      expect(testIdName.textContent).toBe('Pikachu');
    });

  it('É mostrado apenas um Pokémon por vez.', () => {
    const { getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ [] } />,
    );
    expect(getAllByTestId(pokemonName).length).toBe(1);
  });

  it('Pokedex tem botóes de filtro', () => {
    const { getByTestId, getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ [] } />,
    );
    const listFilters = getAllByTestId(pokemontypebutton);
    const typePokemons = pokemons.reduce((acc, pokemon) => {
      if (!acc.includes(pokemon.type)) acc.push(pokemon.type);
      return acc;
    }, []);

    expect(listFilters.length).toBe(typePokemons.length);

    listFilters.forEach((filter) => {
      expect(typePokemons.includes(filter.textContent)).toBe(true);
      fireEvent.click(filter);
      expect(getByTestId('pokemonType').textContent).toBe(filter.textContent);
      fireEvent.click(getByTestId(nextPokemon));
      expect(getByTestId('pokemonType').textContent).toBe(filter.textContent);
    });
  });

  it('Pokédex contém um botão para resetar o filtro', () => {
    const { getAllByRole, getByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ [] } />,
    );
    const listButtons = getAllByRole('button');

    pokemons.forEach((pokemon) => {
      expect(getByTestId(pokemonName).textContent).toEqual(pokemon.name);
      fireEvent.click(getByTestId(nextPokemon));
    });

    expect(listButtons.some((button) => button.textContent === 'All')).toEqual(true);

    listButtons.forEach((button) => {
      if (button.textContent === 'All') fireEvent.click(button);
    });

    pokemons.forEach((pokemon) => {
      expect(getByTestId(pokemonName).textContent).toEqual(pokemon.name);
      fireEvent.click(getByTestId(nextPokemon));
    });
  });

  it('Botões de filtro são dinâmicos para cada tipo de Pokémon', () => {
    const { getAllByTestId, getAllByRole } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ [] } />,
    );
    const listButtons = getAllByRole('button');
    const typePokemons = pokemons.reduce((acc, pokemon) => {
      if (!acc.includes(pokemon.type)) acc.push(pokemon.type);
      return acc;
    }, []);

    expect(listButtons.some((button) => button.textContent === 'All'));
    expect(getAllByTestId('pokemon-type-button').length).toEqual(typePokemons.length);
    expect(listButtons.some((button) => button.textContent === 'All'));
  });

  it('O "botão de Próximo" deve ser desabilitado se tiver um só pokémon', () => {
    const { getByTestId, getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ [] } />,
    );
    const listFilters = getAllByTestId(pokemontypebutton);

    listFilters.forEach((filter) => {
      fireEvent.click(filter);
      if (
        pokemons.filter((pokemon) => pokemon.type === filter.textContent).length === 1) {
        expect(getByTestId(nextPokemon).disabled).toEqual(true);
      }
    });
  });
});
