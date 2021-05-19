import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Requisito 5', () => {
  const POKEMON_NAME = 'pokemon-name';

  test('Se página contém um heading h2 com o texto Encountered pokémons', () => {
    const { getByRole } = renderWithRouter(<App />);

    const titleText = getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });

    expect(titleText).toBeInTheDocument();
  });

  test('Se é exibido o próximo Pokémon da lista quando o botão é clicado', () => {
    const { getByRole, queryByTestId, queryByText } = renderWithRouter(<App />);

    const initialPokemonObject = queryByTestId(POKEMON_NAME);
    const initialPokemonName = initialPokemonObject[
      Object.keys(initialPokemonObject)[1]].children;

    expect(queryByText(initialPokemonName)).toBeInTheDocument();

    const nextPokemonButton = getByRole('button', { name: /Próximo pokémon/i });
    expect(nextPokemonButton).toBeInTheDocument();

    userEvent.click(nextPokemonButton);

    const nextPokemonObject = queryByTestId(POKEMON_NAME);
    const nextPokemonName = nextPokemonObject[
      Object.keys(nextPokemonObject)[1]].children;

    expect(queryByText(initialPokemonName)).not.toBeInTheDocument();
    expect(queryByText(nextPokemonName)).toBeInTheDocument();
  });

  test('Se é mostrado apenas um Pokémon por vez', () => {
    const { getByRole, queryAllByTestId } = renderWithRouter(<App />);

    const nextPokemonBtn = getByRole('button', { name: /Próximo pokémon/i });
    userEvent.click(nextPokemonBtn);
    userEvent.click(nextPokemonBtn);

    const pokemon = queryAllByTestId(POKEMON_NAME);
    expect(pokemon.length).toBe(1);
  });

  test('Se a Pokédex tem os botões de filtro', () => {
    const { queryAllByTestId } = renderWithRouter(<App />);

    const pokemonTypeList = [...new Set(pokemons.map(({ type }) => type))];

    const filterByTypeButtons = queryAllByTestId('pokemon-type-button');

    expect(filterByTypeButtons.length).toBe(pokemonTypeList.length);

    filterByTypeButtons
      .map((button) => button.innerHTML)
      .forEach((type) => expect(pokemonTypeList.includes(type)).toBe(true));
  });

  test('Se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByRole } = renderWithRouter(<App />);

    const resetFilterBtn = getByRole('button', { name: /All/i });

    expect(resetFilterBtn).toBeInTheDocument();

    userEvent.click(resetFilterBtn);
  });

  test('Se é criado, dinamicamente, um botão de filtro para cada tipo de Pokémon', () => {
    const { queryAllByTestId } = renderWithRouter(<App />);

    const pokemonTypeList = [...new Set(pokemons.map(({ type }) => type))];
    const filterByTypeButtons = queryAllByTestId('pokemon-type-button');

    pokemonTypeList.forEach((type, index) => {
      expect(filterByTypeButtons[index]).toHaveTextContent(type);
    });
  });

  test('Deve ser desabilitado quando a lista filtrada de Pkms tiver um só pkm', () => {
    const { getByRole } = renderWithRouter(<App />);

    const electricFilterBtn = getByRole('button', { name: /Electric/i });
    const nextPokemonBtn = getByRole('button', { name: /Próximo pokémon/i });

    userEvent.click(electricFilterBtn);

    expect(nextPokemonBtn.disabled).toBeTruthy();
  });
});
