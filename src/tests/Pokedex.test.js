import React from 'react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

const types = [
  'Electric',
  'Fire',
  'Bug',
  'Poison',
  'Psychic',
  'Normal',
  'Dragon',
];

describe('5. Testa o componente <Pokedex.js />', () => {
  it('Testa ha um heading h2 com o texto "Encountered pokémons"', () => {
    const { getByRole } = renderWithRouter(<App />);

    const heading = getByRole('heading', { level: 2 });
    const pokedexRegex = /Encountered pokémons/i;
    const isHeading = pokedexRegex.test(heading.innerHTML);

    expect(heading).toBeInTheDocument();
    expect(isHeading).toBe(true);
  });

  it('Testa se mostra o próximo Pokémon se "Próximo pokémon" for clicado', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    const btnText = (getByText(/Próximo pokémon/i));
    expect(btnText).toBeInTheDocument();

    for (let index = 0; index < pokemons.length; index += 1) {
      const currentPokemon = getByTestId(/pokemon-name/i);
      expect(currentPokemon.innerHTML).toBe(pokemons[index].name);
      userEvent.click(getByText(/Próximo pokémon/i));
    }
  });

  it('Testa se é mostrado apenas um Pokémon por vez', () => {
    const { getAllByTestId } = renderWithRouter(<App />);

    const pokemonsInScreen = getAllByTestId('pokemon-name');
    expect(pokemonsInScreen.length).toBe(1);
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    const { getAllByTestId } = renderWithRouter(<App />);

    const filterButtons = getAllByTestId('pokemon-type-button');

    types.forEach((pokemon, index) => {
      expect(filterButtons[index].innerHTML).toBe(pokemon);
    });
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);

    const resetBtn = getByRole('button', { name: 'All' });
    expect(resetBtn).toBeInTheDocument();

    userEvent.click(resetBtn);

    const pokemonInScreen = getByTestId('pokemon-name');

    expect(pokemonInScreen.innerHTML).toBe(pokemons[0].name);
  });

  it('Testa se é criado, dinamicamente, um botão de filtro para cada tipo.', () => {
    const { getAllByTestId, getByText } = renderWithRouter(<App />);

    expect(getByText(/All/i)).toBeInTheDocument();

    const typeButtons = getAllByTestId('pokemon-type-button');
    types.forEach((type, index) => {
      expect(type).toBe(typeButtons[index].innerHTML);
    });
  });

  it('Btn Próximo pokémon deve ser disable se a lista tiver um só pokemon', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);

    types.forEach((type) => {
      if (type !== 'Fire' && type !== 'Psychic') {
        userEvent.click(getByRole('button', { name: type }));
        expect(getByText(/Próximo pokémon/i)).toBeDisabled();
      }
    });
  });
});
