import React from 'react';
// import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokedex from '../components/Pokedex';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('Testes componente Pokedex', () => {
  const isPokemonFavoriteById = [pokemons[0], pokemons[1]];
  const pokeName = 'pokemon-name';
  const nextPoke = 'Próximo pokémon';
  const dataTestIdButton = 'pokemon-type-button';

  it('Testa o cabeçalho da aplicação', () => {
    const { getByRole } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const heading = getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(heading).toBeInTheDocument();
  });

  it('Testa a ação de selecionar os próximos pokemons', () => {
    const { getByText, getByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const nextBtn = getByText(nextPoke);
    expect(nextBtn.textContent).toBe('Próximo pokémon');

    pokemons.forEach((pokemon) => {
      const pokemonName = getByTestId(pokeName);
      expect(pokemonName.textContent).toBe(pokemon.name);
      userEvent.click(nextBtn);
    });

    const pokemonName = getByTestId(pokeName);
    expect(pokemonName.textContent).toBe('Pikachu');
  });

  it('Testa se apenas um pokemon aparece por vez', () => {
    const { getAllByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const allPokemonsDisplayed = getAllByTestId(pokeName);
    expect(allPokemonsDisplayed.length).toBe(1);
  });

  it('Testa os botões de filtro de pokemons', () => {
    const { getAllByTestId, getByText, getByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const types = 7;
    const buttons = getAllByTestId(dataTestIdButton);
    expect(buttons.length).toBe(types);

    const fireFilterBtn = getByText('Fire');
    userEvent.click(fireFilterBtn);

    let type = getByTestId('pokemonType');
    expect(type.textContent).toBe('Fire');

    const nextBtn = getByText(nextPoke);

    userEvent.click(nextBtn);
    type = getByTestId('pokemonType');
    expect(type.textContent).toBe('Fire');

    userEvent.click(nextBtn);
    type = getByTestId('pokemonType');
    expect(type.textContent).toBe('Fire');
  });

  it('Testa o botão All', () => {
    const { getByRole, getByText, getByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const resetFilterBtn = getByRole('button', {
      name: 'All',
    });
    expect(resetFilterBtn).toBeInTheDocument();

    const nextBtn = getByText(nextPoke);
    const fireFilterBtn = getByText('Fire');
    userEvent.click(fireFilterBtn);
    userEvent.click(resetFilterBtn);
    for (let index = 0; index < pokemons.length; index += 1) {
      const pokemonName = getByTestId(pokeName);
      expect(pokemonName.textContent).toBe(pokemons[index].name);
      userEvent.click(nextBtn);
    }
  });

  it('Testar geração dinâmica de pokemons', () => {
    const fireAndBug = pokemons
      .filter((pokemon) => pokemon.type === 'Bug' || pokemon.type === 'Fire');
    const { getAllByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ fireAndBug }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const filterButtons = getAllByTestId(dataTestIdButton);
    filterButtons.forEach((button, index) => {
      expect(button.textContent).toBe(fireAndBug[index].type);
    });
  });
});
