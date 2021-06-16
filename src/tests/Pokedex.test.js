import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Requisito 05', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    const { container } = renderWithRouter(<App />);
    const tagH2 = container.querySelector('h2');
    expect(tagH2.textContent).toBe('Encountered pokémons');
  });

  test('Teste se é exibido o próximo Pokémon da lista quando o botão', () => {
    const { getByTestId, getByText } = renderWithRouter(<App />);
    const buttonProx = getByText('Próximo pokémon');

    pokemons.forEach((pokemon) => {
      const namePoke = getByTestId('pokemon-name');
      expect(namePoke.textContent).toBe(pokemon.name);
      fireEvent.click(buttonProx);
    });

    const buttonAll = getByText('All');
    fireEvent.click(buttonAll);

    pokemons.forEach((pokemo) => {
      const namePoke = getByTestId('pokemon-name');
      expect(namePoke.textContent).toBe(pokemo.name);
      fireEvent.click(buttonProx);
    });
  });

  test('Teste se a Pokédex tem os botões de filtro.', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const buttonFilter = getAllByTestId('pokemon-type-button');
    expect(buttonFilter[1].textContent).toBe('Fire');
  });

  test('Tem um botão de filtro para cada tipo de Pokémon.', () => {
    const { getAllByTestId, getByText } = renderWithRouter(<App />);

    const pokemonTypes = (
      [...new Set(pokemons.reduce((types, { type }) => [...types, type], []))]
    );
    const namePokeType = getAllByTestId('pokemon-type-button');

    pokemonTypes.forEach((type, index) => {
      expect(namePokeType[index].textContent).toBe(type);
    });

    const buttonProx = getByText('Próximo pokémon');

    fireEvent.click(namePokeType[0]);
    expect(buttonProx).toBeDisabled();

    fireEvent.click(namePokeType[1]);
    expect(buttonProx).not.toBeDisabled();
  });
});
