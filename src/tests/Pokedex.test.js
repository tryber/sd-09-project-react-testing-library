import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('renders a h2', () => {
  const { getByRole } = renderWithRouter(<App />);
  const h2 = getByRole('heading', { level: 2, name: /Encountered pokémons/ });
  expect(h2).toBeInTheDocument();
});

test('renders a button that changes the pokémon', () => {
  const { getByRole } = renderWithRouter(<App />);
  const button = getByRole('button', { name: /Próximo pokémon/ });
  expect(button).toBeInTheDocument();
});

test('shows next pokémon', () => {
  const { getByRole, getByText, getByTestId } = renderWithRouter(<App />);
  const button = getByRole('button', { name: /Próximo pokémon/ });
  const list = ['Charmander', 'Caterpie', 'Ekans',
    'Alakazam', 'Mew', 'Rapidash', 'Snorlax', 'Dragonair', 'Pikachu'];
  list.forEach((pokemon) => {
    fireEvent.click(button);
    expect(getByText(pokemon)).toBeInTheDocument();
    expect(getByTestId('pokemon-name')).toBeInTheDocument();
  });
});

test('renders filter buttons', () => {
  const { getAllByTestId } = renderWithRouter(<App />);
  const button = getAllByTestId(/pokemon-type-button/);
  expect(button[1]).toBeInTheDocument();
});

test('verify if filter is selecting the correct pokémon type', () => {
  const { getByRole, getByText } = renderWithRouter(<App />);
  const fire = getByRole('button', { name: 'Fire' });
  expect(fire).toBeInTheDocument();
  fireEvent.click(fire);
  const next = getByRole('button', { name: 'Próximo pokémon' });
  expect(getByText(/Charmander/)).toBeInTheDocument();
  fireEvent.click(next);
  expect(getByText(/Rapidash/)).toBeInTheDocument();
});

test('verify if button all reset the filter applied', () => {
  const { getByRole, getByText, getByTestId } = renderWithRouter(<App />);
  const all = getByRole('button', { name: 'All' });
  const list = ['Pikachu', 'Charmander', 'Caterpie', 'Ekans',
    'Alakazam', 'Mew', 'Rapidash', 'Snorlax', 'Dragonair'];
  const button = getByRole('button', { name: /Próximo pokémon/ });
  fireEvent.click(all);
  list.forEach((pokemon) => {
    expect(getByText(pokemon)).toBeInTheDocument();
    expect(getByTestId('pokemon-name')).toBeInTheDocument();
    fireEvent.click(button);
  });
});

test('verify if button is disabled when there is only one pokemon', () => {
  const { getByRole } = renderWithRouter(<App />);
  const electric = getByRole('button', { name: 'Electric' });
  fireEvent.click(electric);
  const button = getByRole('button', { name: /Próximo pokémon/ });
  expect(button).toHaveAttribute('disabled');
});
