import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

test('has a heading with text `Encountered pokémons', () => {
  const { getByRole } = renderWithRouter(<App />);
  const header = getByRole('heading', { level: 2, name: 'Encountered pokémons' });

  expect(header).toBeInTheDocument();
});

test('shows next Pokémon when it is clicked', () => {
  const { getByTestId } = renderWithRouter(<App />);
  const pokemon = getByTestId('pokemon-name');
  const nextButton = getByTestId('next-pokemon');

  userEvent.click(nextButton);
  expect(pokemon.textContent).toBe('Charmander');

  userEvent.click(nextButton);
  expect(pokemon.textContent).toBe('Caterpie');
});

test('shows one Pokémon at a time', () => {
  const { getAllByTestId } = renderWithRouter(<App />);

  expect(getAllByTestId('pokemon-name').length).toBe(1);
});

test('has a reset to filter buttons', () => {
  const { getAllByTestId, getByText } = renderWithRouter(<App />);
  const allTypeButtons = getAllByTestId('pokemon-type-button');

  expect(allTypeButtons[0]).toHaveTextContent('Electric');
  userEvent.click(allTypeButtons[0]);
  expect(getByText('Pikachu')).toBeInTheDocument();
  expect(allTypeButtons[1]).toHaveTextContent('Fire');
  userEvent.click(allTypeButtons[1]);
  expect(getByText('Charmander')).toBeInTheDocument();
  expect(allTypeButtons[2]).toHaveTextContent('Bug');
  expect(allTypeButtons[3]).toHaveTextContent('Poison');
  expect(allTypeButtons[4]).toHaveTextContent('Psychic');
  expect(allTypeButtons[5]).toHaveTextContent('Normal');
  expect(allTypeButtons[6]).toHaveTextContent('Dragon');
});

test('has filter buttom with text All', () => {
  const { getByRole } = renderWithRouter(<App />);
  const buttonAll = getByRole('button', { name: 'All' });
  userEvent.click(buttonAll);
  expect(buttonAll).toBeInTheDocument();
});

test('has buttons for each Pokémon type', () => {
  const { getByRole } = renderWithRouter(<App />);
  const pokemonsTypes = [
    'Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon',
  ];

  pokemonsTypes.forEach((type) => {
    expect(getByRole('button', { name: type })).toBeInTheDocument();
  });
});

test('Tests if when you have only one pokemon, button must be disabled', () => {
  const { getByRole } = renderWithRouter(<App />);
  const button = getByRole('button', {
    name: 'Electric',
  });
  const buttonNext = getByRole('button', {
    name: 'Próximo pokémon',
  });

  userEvent.click(button);

  expect(buttonNext).toBeDisabled();
});
