import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import Pokemons from '../data';

describe('Testando o componente Pokedex', () => {
  const nextPokemonButtonText = 'Próximo pokémon';

  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    const { getByText } = renderWithRouter(<App />);
    const pokedexHeading = getByText('Encountered pokémons');

    expect(pokedexHeading).toBeInTheDocument();
    expect(pokedexHeading.localName).toBe('h2');
  });

  it('Teste o botão Próximo pokémon.', () => {
    const { getByText } = renderWithRouter(<App />);
    const nextPokemonButton = getByText(nextPokemonButtonText);
    const pokemonsNamesList = Pokemons.map((pokemon) => pokemon.name);

    pokemonsNamesList.forEach((pokemon) => {
      const pokemonName = getByText(pokemon);

      fireEvent.click(nextPokemonButton);

      expect(pokemonName).toBeInTheDocument();
    });

    expect(getByText('Pikachu')).toBeInTheDocument();
  });

  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const pokemonImages = getAllByRole('img');

    expect(pokemonImages.length).toBe(1);
  });

  it('Teste os botões de filtro.', () => {
    const { getByText, getByTestId, getAllByTestId } = renderWithRouter(<App />);
    const filterButtons = getAllByTestId('pokemon-type-button');
    const nextPokemonButton = getByText(nextPokemonButtonText);

    filterButtons.forEach((button) => {
      const currentFilteredType = button.innerHTML;
      const pokemonsOfCurrentType = Pokemons
        .filter((pokemon) => pokemon.type === currentFilteredType)
        .map((pokemon) => pokemon.name);

      fireEvent.click(button);

      pokemonsOfCurrentType.forEach(() => {
        const currentPokemonType = getByTestId('pokemonType');

        expect(currentPokemonType.innerHTML).toBe(currentFilteredType);

        fireEvent.click(nextPokemonButton);
      });
    });
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    const allButton = getByText('All');
    const nextPokemonButton = getByText(nextPokemonButtonText);
    const numberOfPokemons = Pokemons.length;
    let isTheTypeChanging = false;

    expect(allButton).toBeInTheDocument();

    fireEvent.click(allButton);

    for (let i = 0; i < numberOfPokemons; i += 1) {
      const currentPokemonType = getByTestId('pokemonType').innerHTML;

      fireEvent.click(nextPokemonButton);

      const nextPokemontType = getByTestId('pokemonType').innerHTML;

      if (currentPokemonType !== nextPokemontType) {
        isTheTypeChanging = true;

        break;
      }
    }

    expect(isTheTypeChanging).toBe(true);
  });

  it('Teste se é criado, um botão de filtro para cada tipo de Pokémon.', () => {
    const { getAllByTestId } = renderWithRouter(<App />);

    const listOfPokemonTypes = Pokemons
      .map((pokemon) => pokemon.type)
      .reduce((acc, currentValue) => {
        if (!acc.includes(currentValue)) {
          acc.push(currentValue);
        }

        return acc;
      }, []);

    const listOfButtonFilters = getAllByTestId('pokemon-type-button')
      .map((button) => button.innerHTML);

    expect(listOfButtonFilters).toStrictEqual(listOfPokemonTypes);
  });
});
