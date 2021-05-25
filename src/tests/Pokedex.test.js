import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemons from '../data';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();

  return {
    ...render(<Router history={ history }>{ component }</Router>), history,
  };
};

const POKEMON_NAME = 'pokemon-name';

describe('Requisito 5', () => {
  it('Testa se a página possui um h2 com o texto Encountered pokémons', () => {
    const { getByText } = renderWithRouter(<App />);
    const h2 = getByText('Encountered pokémons');
    expect(h2).toBeInTheDocument();
  });

  it('Testa todos os pokemons da lista ao clicar no botão Próximo pokémon', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const buttonNext = getByTestId('next-pokemon');
    expect(buttonNext).toHaveTextContent('Próximo pokémon');
    pokemons.forEach((pokemon) => {
      const pokemonName = getByTestId(POKEMON_NAME);
      expect(pokemonName).toHaveTextContent(pokemon.name);
      if (pokemonName === 'Dragonair') {
        userEvent.click(buttonNext);
        const firstPokemon = getByTestId(POKEMON_NAME);
        expect(firstPokemon).toHaveTextContent(pokemon[0].name);
        return;
      }
      userEvent.click(buttonNext);
    });
  });

  it('Testa se é mostrado um pokémon por vez', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const pokemonsName = getAllByTestId(POKEMON_NAME);
    expect(pokemonsName.length).toBe(1);
  });

  it('Testa se existe os botões de filtro', () => {
    const { getByTestId, getByRole } = renderWithRouter(<App />);
    const psychicButton = getByRole('button', { name: 'Psychic' });
    userEvent.click(psychicButton);
    const pokemonType = getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent('Psychic');
  });

  it('Testa se existe um botão para resetar o filtro', () => {
    const { getByRole } = renderWithRouter(<App />);
    const allButton = getByRole('button', { name: 'All' });
    expect(allButton).toBeInTheDocument();
    expect(allButton).toHaveTextContent('All');

    userEvent.click(allButton);
  });

  it('Testa se os botões de filtro são criados dinamicamente', () => {
    const { getByRole } = renderWithRouter(<App />);

    pokemons.forEach((pokemon) => {
      const filterButton = getByRole('button', { name: pokemon.type });
      expect(filterButton).toBeInTheDocument();
      expect(filterButton).not.toBeNull();
    });
  });

  it('Testa se o botão de Próximo Pokémon está desabilitado.', () => {
    const { getByTestId, getAllByTestId } = renderWithRouter(<App />);
    const filterButtons = getAllByTestId('pokemon-type-button');
    userEvent.click(filterButtons[0]);
    const buttonNext = getByTestId('next-pokemon');
    expect(buttonNext).toBeDisabled();
  });
});
