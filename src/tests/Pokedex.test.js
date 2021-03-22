import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

test('Teste se a pagina contém um h2 com o texto "Encountered pokémons"', () => {
  const { getByRole } = renderWithRouter(<App />);
  const heading = getByRole('heading', {
    level: 2,
    name: 'Encountered pokémons',
  });
  expect(heading).toBeInTheDocument();
});

test('Teste se ao clicar no botão próximo pokemon, exibe o próximo card da lista',
  () => {
    const { getByText } = renderWithRouter(<App />);
    const buttonNext = getByText('Próximo pokémon');
    expect(buttonNext).toBeInTheDocument();
    userEvent.click(buttonNext);
    expect(getByText(/charmander/i)).toBeInTheDocument();
    userEvent.click(buttonNext);
    expect(getByText(/caterpie/i)).toBeInTheDocument();
    userEvent.click(buttonNext);
    expect(getByText(/ekans/i)).toBeInTheDocument();
    userEvent.click(buttonNext);
    expect(getByText(/alakazam/i)).toBeInTheDocument();
    userEvent.click(buttonNext);
    expect(getByText(/mew/i)).toBeInTheDocument();
    userEvent.click(buttonNext);
    expect(getByText(/rapidash/i)).toBeInTheDocument();
    userEvent.click(buttonNext);
    expect(getByText(/snorlax/i)).toBeInTheDocument();
    userEvent.click(buttonNext);
    expect(getByText(/dragonair/i)).toBeInTheDocument();
    userEvent.click(buttonNext);
    expect(getByText(/pikachu/i)).toBeInTheDocument();
  });

test('Teste se é exibido apenas 1 card por vez', () => {
  const { getAllByTestId } = renderWithRouter(<App />);
  const pokemonName = getAllByTestId('pokemon-name');
  expect(pokemonName).toHaveLength(1);
});

test('Teste se a pokedex tem os botões de filtro', () => {
  const { getAllByTestId, getByText, getAllByText } = renderWithRouter(<App />);
  const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
  const buttonsId = getAllByTestId('pokemon-type-button');
  buttonsId.forEach((button, index) => {
    expect(button).toHaveTextContent(types[index]);
  });
  const electric = getAllByText(/electric/i);
  userEvent.click(electric[1]);
  expect(getByText(/pikachu/i)).toBeInTheDocument();
  expect(getByText(/próximo pokémon/i)).toBeDisabled();
});

test('teste se a pokédex contém um botão de reset do filtro', () => {
  const { getByRole } = renderWithRouter(<App />);
  const all = getByRole('button', { name: /all/i });
  expect(all).toBeInTheDocument();
  userEvent.click(all);
});
