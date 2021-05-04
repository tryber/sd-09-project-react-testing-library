import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

const pokemonNames = pokemons.map((pokemon) => pokemon.name);
const pokemonTypes = Array.from(new Set(pokemons.map((pokemon) => pokemon.type)));

test('Se a página contém um h2 com o texto Encountered pokémons', () => {
  const { getByRole } = renderWithRouter(<App />);
  const h2Encountered = getByRole('heading', { level: 2 });
  expect(h2Encountered.textContent).toBe('Encountered pokémons');
});

test('Se é exibido o próximo Pokémon quando o botão Próximo pokémon é clicado', () => {
  const { getByText } = renderWithRouter(<App />);
  const nextPokeBtn = getByText('Próximo pokémon');
  pokemonNames.forEach((_, index) => {
    userEvent.click(nextPokeBtn);
    const nextPoke = getByText(`${pokemonNames[(index + 1) % pokemonNames.length]}`);
    expect(nextPoke).toBeInTheDocument();
  });
});

test('Se é mostrado apenas um Pokémon por vez', () => {
  const { getAllByText } = renderWithRouter(<App />);
  const pokeDetailsLink = getAllByText('More details');
  expect(pokeDetailsLink.length).toBe(1);
});

test('Se a Pokédex tem os botões de filtro', () => {
  const { getAllByTestId } = renderWithRouter(<App />);
  const pokeTypesBtns = getAllByTestId('pokemon-type-button');
  pokeTypesBtns.forEach((button, index) => {
    expect(button.textContent).toBe(pokemonTypes[index]);
  });
});

test('Se a Pokédex contém um botão para resetar o filtro', () => {
  const { getByText, getAllByTestId } = renderWithRouter(<App />);
  const removeFilterBtn = getByText('All');
  const defaulPokemon = getByText(pokemonNames[0]);
  const pokeTypesBtns = getAllByTestId('pokemon-type-button');
  expect(defaulPokemon).toBeInTheDocument();
  userEvent.click(pokeTypesBtns[4]);
  userEvent.click(removeFilterBtn);
  expect(defaulPokemon).toBeInTheDocument();
});
