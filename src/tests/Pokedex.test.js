import React from 'react';
import userEvent from '@testing-library/user-event';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';
import Pokedex from '../components/Pokedex';
import isPokemonFavoriteById from '../App';

const nextPokemonStr = 'Próximo pokémon';
const pokemonNameStr = 'pokemon-name';

test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
  const { queryByRole } = renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ isPokemonFavoriteById }
  />);

  const headingPokedex = queryByRole('heading', {
    level: 2,
    name: 'Encountered pokémons',
  });
  expect(headingPokedex).toBeInTheDocument();
});

test('Testa se é exibido o próximo Pokémon da lista quando o botão é clicado', () => {
  const { queryByRole, getByTestId } = renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ isPokemonFavoriteById }
  />);

  const button = queryByRole('button', { name: nextPokemonStr });
  const currentPokemon = getByTestId(pokemonNameStr);
  expect(currentPokemon).toContainHTML('Pikachu');
  userEvent.click(button);
  expect(currentPokemon).toContainHTML('Charmander');
  userEvent.click(button);
  expect(currentPokemon).toContainHTML('Caterpie');
  userEvent.click(button);
  expect(currentPokemon).toContainHTML('Ekans');
  userEvent.click(button);
  expect(currentPokemon).toContainHTML('Alakazam');
  userEvent.click(button);
  expect(currentPokemon).toContainHTML('Mew');
  userEvent.click(button);
  expect(currentPokemon).toContainHTML('Rapidash');
  userEvent.click(button);
  expect(currentPokemon).toContainHTML('Snorlax');
  userEvent.click(button);
  expect(currentPokemon).toContainHTML('Dragonair');
  userEvent.click(button);
  expect(currentPokemon).toContainHTML('Pikachu');
});

test('Teste se é mostrado apenas um Pokémon por vez.', () => {
  const { queryAllByTestId } = renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ isPokemonFavoriteById }
  />);

  const displayedPokemon = queryAllByTestId(pokemonNameStr);
  expect(displayedPokemon).toHaveLength(1);
});

test('Teste se a Pokédex tem os botões de filtro.', () => {
  const { getByRole, getByTestId, queryByRole } = renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ isPokemonFavoriteById }
  />);

  const electricTypeButton = queryByRole('button', { name: /Electric/i });
  const nextPokemonButton = getByRole('button', { name: nextPokemonStr });
  const currentPokemon = getByTestId(pokemonNameStr);

  userEvent.click(electricTypeButton);
  expect(currentPokemon).toContainHTML('Pikachu');
  expect(nextPokemonButton).toBeDisabled();
});

test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  const { getByRole, getByTestId } = renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ isPokemonFavoriteById }
  />);
  const allTypeButton = getByRole('button', { name: /All/i });
  const nextPokemonButton = getByRole('button', { name: nextPokemonStr });
  const currentPokemon = getByTestId(pokemonNameStr);

  userEvent.click(allTypeButton);
  expect(currentPokemon).toContainHTML('Pikachu');
  userEvent.click(nextPokemonButton);
  expect(currentPokemon).toContainHTML('Charmander');
  userEvent.click(nextPokemonButton);
  expect(currentPokemon).toContainHTML('Caterpie');
  userEvent.click(nextPokemonButton);
  expect(currentPokemon).toContainHTML('Ekans');
  userEvent.click(nextPokemonButton);
  expect(currentPokemon).toContainHTML('Alakazam');
  userEvent.click(nextPokemonButton);
  expect(currentPokemon).toContainHTML('Mew');
  userEvent.click(nextPokemonButton);
  expect(currentPokemon).toContainHTML('Rapidash');
  userEvent.click(nextPokemonButton);
  expect(currentPokemon).toContainHTML('Snorlax');
  userEvent.click(nextPokemonButton);
  expect(currentPokemon).toContainHTML('Dragonair');
  userEvent.click(nextPokemonButton);
  expect(currentPokemon).toContainHTML('Pikachu');
});

test('Teste se é criado, um botão de filtro para cada tipo de Pokémon', () => {
  const { queryAllByTestId, getByRole } = renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ isPokemonFavoriteById }
  />);

  const allTypeButton = getByRole('button', { name: /all/i });
  const nextPokemonButton = getByRole('button', { name: nextPokemonStr });

  const typeButton = queryAllByTestId('pokemon-type-button');
  expect(typeButton[0]).toContainHTML('Electric');
  expect(typeButton[1]).toContainHTML('Fire');
  expect(typeButton[2]).toContainHTML('Bug');
  expect(typeButton[3]).toContainHTML('Poison');
  expect(typeButton[4]).toContainHTML('Psychic');
  expect(typeButton[5]).toContainHTML('Normal');
  expect(typeButton[6]).toContainHTML('Dragon');

  userEvent.click(typeButton[1]);
  expect(allTypeButton).toBeEnabled();

  const displayedPokemon = queryAllByTestId(pokemonNameStr);
  userEvent.click(typeButton[0]);
  expect(displayedPokemon).toHaveLength(1);
  expect(nextPokemonButton).toBeDisabled();
});
